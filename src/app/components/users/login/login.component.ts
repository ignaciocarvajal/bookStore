import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Router } from '@angular/router'; 
import { OauthService } from '../../../services/oauth.service'


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public afAuth: AngularFireAuth, private router: Router,private  oAuthService : OauthService) { }

  public email : string = '';
  public password : string = '';

  ngOnInit() {
  }

  onLogin(): void {
    console.log('email', this.email);
    console.log('password', this.password);
    this.oAuthService.loginEmailUser(this.email, this.password)
    .then((res) => {
      console.log('resUser', res);
      this.onLoginRedirect();
    }).catch(err => console.log('err', err.message));
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
