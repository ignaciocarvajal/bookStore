import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { BookInterface } from 'src/app/models/book-interface';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class DataApiService {

  constructor(private afs: AngularFirestore) {
    this.booksCollection = this.afs.collection<BookInterface>('books');
    this.books = this.booksCollection.valueChanges();
  }
  private booksCollection: AngularFirestoreCollection<BookInterface>;
  private books: Observable<BookInterface[]>;


  getAllBooks() {
    return this.books = this.booksCollection.snapshotChanges().pipe(map( changes => {
      return changes.map( action => {
        const data = action.payload.doc.data() as BookInterface;
        data.id = action.payload.doc.id;
        return data;
      });
    }));
  }
  getBook() {}
  addBook() {}
  updateBook() {}
  deleteBook() {}

}
