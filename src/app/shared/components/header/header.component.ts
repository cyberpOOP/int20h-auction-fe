import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
    isAuthorized = true;
    currentUser: any;
    avatarUrl: string;

    ngOnInit() {
        this.avatarUrl = 'assets/images/avatar/avatar.svg';
        this.currentUser = JSON.parse(localStorage.getItem('user') as string);
        if (this.currentUser && this.currentUser.avatarUrl) {
            this.avatarUrl = this.currentUser.avatarUrl;
        }
    }

    logOut() {
        localStorage.removeItem('user');
        localStorage.removeItem('accessToken');
        location.reload();
    }
}
