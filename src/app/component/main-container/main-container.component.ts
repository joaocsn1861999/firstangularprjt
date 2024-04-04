import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-container',
  templateUrl: './main-container.component.html',
  styleUrls: ['./main-container.component.css']
})
export class MainContainerComponent implements OnInit {
  menu: string = ""
  router: string = "hidden"

  constructor() { }

  ngOnInit() {
  }

  hideMenu(){
    this.menu = "hidden";
    this.router = ""
  }

  showMenu(){
    this.menu = "";
    this.router = "hidden"
  }

}
