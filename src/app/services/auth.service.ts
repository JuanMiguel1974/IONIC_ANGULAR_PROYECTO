import { Injectable } from '@angular/core';
import { User } from '../models/interfaces';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import * as firebase from 'firebase/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public user$: Observable<User>;

  constructor(public afAuth: AngularFireAuth, private afs: AngularFirestore) {

    this.user$ = this.afAuth.authState.pipe(
      switchMap((user) => {
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        }
        return of(null);
      })
    );
  }

  async login(correo: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(correo,password);
  }

  async resetPassword(email: string): Promise<void> {
    try {
      return this.afAuth.sendPasswordResetEmail(email);
    } catch (resetPasswordError) {
      console.log('Error->', resetPasswordError);
    }
  }
  async loginGoogle(): Promise<User> {
    try {
      const { user } = await this.afAuth.signInWithPopup(
        new firebase.GoogleAuthProvider()
      );
      this.updateUserData(user);
      return user;
    } catch (logingGoogleError) {
      console.log('Error->', logingGoogleError);
    }
  }

  async logout() {
   this.afAuth.signOut();
  }

  async register(email: string, password: string): Promise<User> {
    try {
      // eslint-disable-next-line prefer-const
      let { user } = await this.afAuth.createUserWithEmailAndPassword(
        email,
        password
      );
      await this.sendVerificationEmail();
      return user;
    } catch (registerError) {
      console.log('Error->', registerError);
    }
  }
  async sendVerificationEmail(): Promise<void> {
    try {
      return (await this.afAuth.currentUser).sendEmailVerification();
    } catch (sendEmailError) {
      console.log('Error->', sendEmailError);
    }
  }

  isMailVerified(user: User): boolean {
    return user.emailVerified === true ? true : false;
  }
  private updateUserData(user: User) {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(
      `users/${user.uid}`
    );

    const data: User = {
      uid: user.uid,
      email: user.email,
      emailVerified: user.emailVerified,
      displayName: user.displayName,

    };
    return userRef.set(data, { merge: true });
  }
}
