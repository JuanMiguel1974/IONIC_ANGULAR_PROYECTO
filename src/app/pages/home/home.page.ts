import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  img: string;

  constructor() {}

  ngOnInit(): void {
    this.img = '../../../assets/img/panaderia.png';
  }
}
