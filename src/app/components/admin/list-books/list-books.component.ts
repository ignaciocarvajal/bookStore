import { Component, OnInit } from '@angular/core';
import { DataApiService } from 'src/app/services/data-api.service';
import { BookInterface } from 'src/app/models/book-interface';
import { NgForm } from '@angular/forms';
import { OauthService } from 'src/app/services/oauth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { UserInterface } from 'src/app/models/user-interface';

@Component({
  selector: 'app-list-books',
  templateUrl: './list-books.component.html',
  styleUrls: ['./list-books.component.css']
})
export class ListBooksComponent implements OnInit {

  constructor(private dataApi: DataApiService, private oAuthService: OauthService ) { }
  private books: BookInterface[];
  public isAdmin: any = null;
  public userUid: string = null;

  ngOnInit() {
    this.getListBooks();
    this.getCurrentUser();
  }

  getCurrentUser() {
    this.oAuthService.isAuth().subscribe(auth => {
      if (auth) {
        this.userUid = auth.uid;
        this.oAuthService.isUserAdmin(this.userUid).subscribe(userRole => {
          this.isAdmin = Object.assign({}, userRole.roles).hasOwnProperty('admin');
          // this.isAdmin = true;
        });
      }
    });
  }
  getListBooks() {
    this.dataApi.getAllBooks()
      .subscribe(books => {
        this.books = books;
      });
  }

  onDeleteBook(idBook: string): void {
    const confirmacion = confirm('Are you sure?');
    if (confirmacion) {
      this.dataApi.deleteBook(idBook);
    }
  }

  onPreUpdateBook(book: BookInterface) {
    console.log('BOOK', book);
    this.dataApi.selectedBook = Object.assign({}, book);
  }


}
