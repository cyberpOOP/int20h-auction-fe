import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isAuthorized = true;
  currentUser: any;

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('user') as string);
  }

  logOut(){
    localStorage.removeItem('user');
    localStorage.removeItem('accessToken');
    location.reload();
  }
}
