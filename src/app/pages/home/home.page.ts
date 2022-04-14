import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  img: string;
  // eslint-disable-next-line @typescript-eslint/no-inferrable-types
  login: boolean = false;

  constructor(public authSvc: AuthService) {
    this.authSvc.stateUser().subscribe((res) => {
      if (res) {
        this.login = true;
      } else {
        this.login = false;
      }
    });
  }

  ngOnInit(): void {
    this.img = '../../../assets/img/home3.jpg';
  }
}
