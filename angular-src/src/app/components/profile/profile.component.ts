import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: {name: null, username: null, email: null};

  constructor(
    private authService: AuthService,
    private router: Router,
    private flashMessage: FlashMessagesService
  ) { }

  ngOnInit(): void {
    //Get profile information
    this.authService.getProfile().subscribe(profile => {
      this.user = profile.user;
    },
    err => {
      this.flashMessage.show('Fetching user state failed', {cssClass: 'alert-danger', timeout: 10000});
      return false;
    });
  }

  onRemoveSubmit(): void {
    // Delete user
    const observable = this.authService.deleteUser()
    if (!observable) {
      this.flashMessage.show('Unknown username', {cssClass: 'alert-danger', timeout: 10000});
    }
    observable.subscribe(res => {
      if (res.success) {
        this.flashMessage.show('Your user has been removed, you can now log out', {cssClass: 'alert-success', timeout: 10000});
      } else {
        this.flashMessage.show('Deleting user failed: ' + res.msg, {cssClass: 'alert-danger', timeout: 10000});
      }
    },
    err => {
      this.flashMessage.show('Fetching user state failed', {cssClass: 'alert-danger', timeout: 10000});
      return false;
    });
  }
}
