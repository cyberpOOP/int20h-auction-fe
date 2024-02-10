import { Component } from '@angular/core';
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  isListVisible = false;
  isAuthorized = true;
  selectedAction: string | null = null;

  toggleList() {
    this.isListVisible = !this.isListVisible;
  }

  hideList() {
    this.isListVisible = false;
  }

}
