import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

import { AuthService, UsersResponse, OtherUser } from '../../services/auth.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users = [];

  constructor(
    private authService: AuthService,
    private router: Router,
    private flashMessage: FlashMessagesService
  ) { }

  ngOnInit(): void {
    this.authService.listOtherUsers().subscribe((res: UsersResponse) => {
      if (!res && !res.success) {
        this.flashMessage.show('Listing users failed: ' + res.msg, {cssClass: 'alert-danger', timeout: 10000});
      }
      this.users = res.users;
    },
    err => {
      this.flashMessage.show('Couldn\'nt list users', {cssClass: 'alert-danger', timeout: 10000});
      return false
    });
  }

  onRemoveClick(user): void {
    // Delete user
    const observable = this.authService.deleteOtherUser(user);
    if (!observable) {
      this.flashMessage.show('Unknown user', {cssClass: 'alert-danger', timeout: 10000});
    }
    observable.subscribe(res => {
      if (res.success) {
        this.flashMessage.show('User has been removed', {cssClass: 'alert-success', timeout: 10000});
      } else {
        this.flashMessage.show('Deleting user failed: ' + res.msg, {cssClass: 'alert-danger', timeout: 10000});
      }
    },
    err => {
      this.flashMessage.show('Couldn\'t delete: Fetching user state failed', {cssClass: 'alert-danger', timeout: 10000});
      return false;
    });
  }

  onChangePasswordClick(user): void {
    this.flashMessage.show('Not implemented', {cssClass: 'alert-danger', timeout: 10000});
  }
}
