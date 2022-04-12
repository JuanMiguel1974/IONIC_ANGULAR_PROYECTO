import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/models/interfaces';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  localId: string = null;
  uid: string = null;
  infoIUser: IUser = null;

  constructor(
    private authSvc: AuthService,
    private firestore: FirestoreService
  ) {}

  async ngOnInit() {
    this.authSvc.stateUser().subscribe((res) => {
      this.getLocalId();
    });
  }

  async getLocalId() {
    const localId = await this.authSvc.getLocalId();
    if (localId) {
      this.localId = localId;
      console.log(this.localId);
      this.getInfoUser();
    } else {
      console.log('No existe localId');
    }
  }
  getInfoUser() {
    const path = 'Usuarios';
    const localId = this.localId;
    this.firestore.getDocument<IUser>(path, localId).subscribe((res) => {
      console.log('datos ->', res);
    });
  }
  /* getUid(){
    const uid = await this.authSvc.getUid();
    if (uid) {
      this.uid = uid;
      console.log(this.uid);
    } else {
      console.log('No existe uid');
    }
  } */
}
