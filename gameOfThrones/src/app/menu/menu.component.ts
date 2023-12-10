import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {
  @Output() closeMenu: EventEmitter<any> = new EventEmitter();

  close() {
    this.closeMenu.emit();
  }
}
