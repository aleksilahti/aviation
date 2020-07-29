import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: String;
  password: String;


  constructor(
    private authService: AuthService,
    private router: Router,
    private flashMessage: FlashMessagesService
    ) { }

  ngOnInit(): void {
  }

  onLoginSubmit() {
    const user = {
      username: this.username,
      password: this.password
    };

    this.authService.authenticateUser(user).subscribe(res => {
      if ( res.success ) {
        this.authService.storeUserData(res.token, res.user);
        this.flashMessage.show(res.msg, {cssClass: 'alert-success', timeout: 4000});
        this.router.navigate(['/manage']);
      } else if ( !res.success ) {
        this.flashMessage.show(res.msg, {cssClass: 'alert-danger', timeout: 4000});
      } else {
        this.flashMessage.show('Something went wrong', {cssClass: 'alert-danger', timeout: 4000});
        this.router.navigate(['/login']);
      }
    });
  }
}
