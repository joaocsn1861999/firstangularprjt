import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  @Output()
  hideMenuEvent: EventEmitter<boolean> = new EventEmitter<boolean>()

  constructor() { }

  ngOnInit(): void {
  }

  openLinkOnNewWindow(link: string) {
    window.open(link, '_blank');
  }

  hideMenu(){
      this.hideMenuEvent.emit()
  }


}
