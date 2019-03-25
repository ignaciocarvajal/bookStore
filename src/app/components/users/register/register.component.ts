import { Component, OnInit, ElementRef, ViewChild, Input } from '@angular/core';
import { OauthService } from 'src/app/services/oauth.service';
import { UserInterface } from 'src/app/models/user-interface';
import { Router } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private oAuthService: OauthService, private router: Router, private storage: AngularFireStorage) { }
  @ViewChild('imageUser') inputImageUser: ElementRef;
  public email: string = '';
  public password: string = '';
  user: UserInterface;

  uploadPercent: Observable<number>;
  urlImage: Observable<string>;

  ngOnInit() {
    // this.user = this.authService.getCurrentUser();
    // console.log(this.user);
  }

  onUpload(e) {
    const id = Math.random().toString(36).substr(2);
    const file = e.target.files[0];
    const filePath = `uploads/${id}`;
    const ref = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);
    this.uploadPercent = task.percentageChanges();
    task.snapshotChanges().pipe( finalize( () => this.urlImage = ref.getDownloadURL())).subscribe();
  }

  onAddUser() {
    this.oAuthService.registerUser(this.email, this.password)
    .then( (res) => {
      this.oAuthService.isAuth().subscribe ( user => {
        if (user) {
          user.updateProfile({
            photoURL : this.inputImageUser.nativeElement.value
          }).then(  () => console.log('user update'))
          .catch(  (err) => console.log('err', err) );
        }
       });
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
