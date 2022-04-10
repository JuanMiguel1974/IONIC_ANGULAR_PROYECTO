/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable curly */
/* eslint-disable radix */
/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable } from '@angular/core';
import { Cliente, User } from '../models/interfaces';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { Observable, of, Subject, BehaviorSubject, throwError } from 'rxjs';
import { switchMap, map, mergeMap, catchError } from 'rxjs/operators';
import * as firebase from 'firebase/auth';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public user$: Observable<User>;
  userSubject = new Subject<User>();
  logged = new BehaviorSubject<boolean>(false);
  private token: string;

  constructor(
    public afAuth: AngularFireAuth,
    public afs: AngularFirestore,
    private http: HttpClient
  ) {
    this.user$ = this.afAuth.authState.pipe(
      switchMap((user) => {
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        }
        return of(null);
      })
    );
  }
  async login(email, password): Promise<User> {
    const data: User = {
      email: email.value,
      password: password.value,
    };
    try {
      const { user } = await this.afAuth.signInWithEmailAndPassword(
        email,
        password
      );
      this.updateUserData(user);
      return user;
    } catch (loginError) {
      console.log('Error->', loginError);
    }

  }
  registrarUser(datos: Cliente) {
    return this.afAuth.createUserWithEmailAndPassword(
      datos.correo,
      datos.password
    );
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
    localStorage.removeItem('idToken');
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
  stateUser() {
    return this.afAuth.authState;
  }
  getUser() {
    const path = 'users';
  }
  getToken() {
    return this.token;
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
