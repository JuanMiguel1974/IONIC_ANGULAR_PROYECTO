import { Component, OnInit } from '@angular/core';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  img: string;
  constructor(private firestore: FirestoreService) {}

  ngOnInit(): void {
    this.img = '../../../assets/img/home3.jpg';
  }
}

