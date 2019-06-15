import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landingpage',
  templateUrl: './landingpage.component.html',
  styleUrls: ['./landingpage.component.scss']
})
export class LandingpageComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  isShownStep1: boolean = true;
  isShownStep2: boolean = false ; // hidden by default
  

  speechBtn() {
    this.isShownStep1 = false;
    this.isShownStep2 = ! this.isShownStep2;
  }

  textBtn() {
    this.isShownStep1 = false;
    this.isShownStep2 = ! this.isShownStep2;
  }

}
