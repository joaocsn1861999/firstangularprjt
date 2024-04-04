import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-button-back-to-menu',
  templateUrl: './button-back-to-menu.component.html',
  styleUrls: ['./button-back-to-menu.component.css']
})
export class ButtonBackToMenuComponent implements OnInit {
  @Output()
  showMenuEvent: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {
  }

  backToMenu(){
    this.showMenuEvent.emit()
  }

}
