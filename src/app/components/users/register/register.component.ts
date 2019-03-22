import { Component, OnInit } from '@angular/core';
import { OauthService } from 'src/app/services/oauth.service';
import { UserInterface } from 'src/app/models/user-interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private oAuthService: OauthService, private router: Router) { }
  public email: string = '';
  public password: string = '';
  user: UserInterface;

  ngOnInit() {
    // this.user = this.authService.getCurrentUser();
    // console.log(this.user);
  }

  onAddUser(){
    this.oAuthService.registerUser(this.email, this.password)
    .then( (res) => {
      this.router.navigate(['admin/list-books']);
    }).catch(err => console.log( 'err', err.message ));
  }

  onLoginGoogle() : void {
    this.oAuthService.loginGoogleUser()
    .then((res) => {
      console.log('resUser', res);
      this.onLoginRedirect();
    }).catch(err => console.log('err', err.message));
   
  }

  onLoginFacebook() : void {
    this.oAuthService.loginFacebookUser()
    .then( (res) => {
      console.log('resUser', res);
      this.onLoginRedirect();
    }).catch(err => console.log('err', err.message));
   
  }

  onLogout() {
    this.oAuthService.logoutUser();
  }

  onLoginRedirect() : void {
    this.router.navigate(['admin/list-books']);
  }

}
