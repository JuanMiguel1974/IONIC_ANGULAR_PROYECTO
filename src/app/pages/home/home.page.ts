import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FirestorageService } from 'src/app/services/firestorage.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  img: string;
  // eslint-disable-next-line @typescript-eslint/no-inferrable-types
  login: boolean = false;

  constructor(public authSvc: AuthService, public firestorageSvc: FirestorageService) {
    this.authSvc.stateUser().subscribe((res) => {
      if (res) {
        this.login = true;
      } else {
        this.login = false;
      }
    });
  }

ngOnInit(): void {
    // eslint-disable-next-line max-len
    this.img = 'https://firebasestorage.googleapis.com/v0/b/ionic-angular-ea1ae.appspot.com/o/home3.jpg?alt=media&token=a59ee2aa-079d-4561-b783-c75654b318ad';
  }
}
