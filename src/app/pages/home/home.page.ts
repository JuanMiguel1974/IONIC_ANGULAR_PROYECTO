/* eslint-disable @typescript-eslint/no-unused-expressions */
import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { getStorage, ref, getDownloadURL} from 'firebase/storage';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
img: any = '';
  // eslint-disable-next-line @typescript-eslint/no-inferrable-types
  login: boolean = false;
  profileUrl: Observable<string | null>;
  constructor(
    public authSvc: AuthService,
    public firestorage: AngularFireStorage
  ) {
    this.authSvc.stateUser().subscribe((res) => {
      if (res) {
        this.login = true;
      } else {
        this.login = false;
      }
    });
  }

  ngOnInit(): void {
const storage = getStorage();
getDownloadURL(ref(storage, '/home3.jpg'))
  .then((url) => {
    const img = document.getElementById('myimg');
    img.setAttribute('src', url);
  })
  .catch((error) => {
    // Handle any errors
  });

  }
}
