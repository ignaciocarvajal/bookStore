import { Component, OnInit } from '@angular/core';
import { OauthService } from 'src/app/services/oauth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private authService: OauthService, private afAuth: AngularFireAuth, private location: Location,  private router: Router) { }
  public appName = 'Books Store';
  public isLogged = false;

  ngOnInit() {
    this.getCurrentUser();
  }

  getCurrentUser() {
    this.authService.isAuth().subscribe(auth => {
      if (auth) {
        console.log('user logged');
        this.isLogged = true;
      } else {
        console.log('user not logged');
        this.isLogged = false;
      }
    });
  }

  onLogout() {
    this.afAuth.auth.signOut();
    this.router.navigate(['/']);
  }
}
