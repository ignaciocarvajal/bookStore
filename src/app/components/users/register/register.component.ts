import { Component, OnInit } from '@angular/core';
import { OauthService } from 'src/app/services/oauth.service';
import { UserInterface } from 'src/app/models/user-interface';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private authService: OauthService) { }
  user: UserInterface;

  ngOnInit() {
    // this.user = this.authService.getCurrentUser();
    // console.log(this.user);
  }

}
