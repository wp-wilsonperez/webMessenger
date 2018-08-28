import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() {
    let a: number = 1;
    let b: number = 2;
    console.log(a + b);
  }

  ngOnInit() {
  }

}
