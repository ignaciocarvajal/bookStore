import { Component, OnInit } from '@angular/core';
import { OauthService } from 'src/app/services/oauth.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private authService: OauthService, private location: Location) { }
  public app_name: string = 'Books Store';
  public isLogged: boolean = false;

  ngOnInit() {
    this.onCheckUser();
  }

  onLogout(): void {
    // this.authService.logoutUser();
    location.reload();
  }

  onCheckUser(): void {
    // if (this.authService.getCurrentUser() === null) {
    //   this.isLogged = false;
    // } else {
    //   this.isLogged = true;
    // }
  }

}
