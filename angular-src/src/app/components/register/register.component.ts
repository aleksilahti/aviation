import { Component, OnInit, ɵConsole } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  name: String;
  username: String;
  email: String;
  password: String;
  verifyPassword: String;
  constructor(
    private validateService: ValidateService,
    private authService: AuthService,
    private flashMessage: FlashMessagesService,
    private router: Router) { }

  ngOnInit(): void {
  }

  onRegisterSubmit() {
    const user = {
      name: this.name,
      username: this.username,
      email: this.email,
      password: this.password
    };
    // Require all fields
    if (!this.validateService.validateRegister(user)) {
      this.flashMessage.show('Fill all fields', {cssClass: 'alert-danger', timeout: 4000});
      return false;
    }

    //Require valid name length
    if (!this.validateService.validateStringMinMaxLength(user.name, 3, 50 )) {
      this.flashMessage.show('Name needs to be between 3-50 characters.', {cssClass: 'alert-danger', timeout: 4000});
      return false;
    }


    //Require valid username
    if (!this.validateService.validateStringMinMaxLength(user.name, 3, 50 )) {
      this.flashMessage.show('Username needs to be between 3-50 characters.', {cssClass: 'alert-danger', timeout: 4000});
      return false;
    }

    // Require valid email
    if (!this.validateService.validateEmail(user.email)) {
      this.flashMessage.show('Invalid email', {cssClass: 'alert-danger', timeout: 4000});
      return false;
    }

    // Require valid email
    if (!this.validateService.validatePassword(user.password)) {
      this.flashMessage.show('Invalid password. The password needs to be atleast 8 characters.', {cssClass: 'alert-danger', timeout: 4000});
      return false;
    }

    // Require verified password
    if (this.password !== this.verifyPassword) {
      this.flashMessage.show('Passwords don\'t match.', {cssClass: 'alert-danger', timeout: 4000});
      return false;
    }

    // Register user
    this.authService.registerUser(user).subscribe(res => {
      if ( res.success) {
        this.flashMessage.show('User is now registered and can login', {cssClass: 'alert-success', timeout: 4000});
        this.router.navigate(['/register']);
      } else if ( !res.success ) {
        this.flashMessage.show(res.msg, {cssClass: 'alert-danger', timeout: 4000});
        this.router.navigate(['/register']);
      } else {
        this.flashMessage.show('Something went wrong', {cssClass: 'alert-danger', timeout: 4000});
        this.router.navigate(['/register']);
      }
      });
  }
}
