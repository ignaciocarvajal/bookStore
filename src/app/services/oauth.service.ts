import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators';
import { auth } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class OauthService {

  constructor(private afsAuth: AngularFireAuth) { }

  registerUser() {}
  loginEmailUser() {}
  loginFacebookUser() {}
  loginGoogleUser() {}
  logoutUser() {}
  isAuth() {
    // tslint:disable-next-line:no-shadowed-variable
    return this.afsAuth.authState.pipe(map(auth => auth));
  }
}
