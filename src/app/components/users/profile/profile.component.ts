import { Component, OnInit } from '@angular/core';
import { OauthService } from 'src/app/services/oauth.service';
import { UserInterface } from 'src/app/models/user-interface';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private oAuthService: OauthService) { }
  user: UserInterface = {
    name: '',
    email: '',
    photoUrl: '',
    roles: {}
  };

  public providerId: string = 'null';
  ngOnInit() {
    this.oAuthService.isAuth().subscribe(user => {
      if (user) {
        this.user.name = user.displayName;
        this.user.email = user.email;
        this.user.photoUrl = user.photoURL;
        this.providerId = user.providerData[0].providerId;
      }
    });
  }

}
