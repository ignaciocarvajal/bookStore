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
  private bookDoc: AngularFirestoreDocument<BookInterface>;
  private book: Observable<BookInterface>;
  public selectedBook: BookInterface = {
    id: null
  };

  getAllBooks() {
    return this.books = this.booksCollection.snapshotChanges().pipe(map( changes => {
      return changes.map( action => {
        const data = action.payload.doc.data() as BookInterface;
        data.id = action.payload.doc.id;
        return data;
      });
    }));
  }
  getAllBooksOffers() {
    this.booksCollection = this.afs.collection('books', ref => ref.where('oferta', '==', '1'));
    return this.books = this.booksCollection.snapshotChanges()
      .pipe(map(changes => {
        return changes.map(action => {
          const data = action.payload.doc.data() as BookInterface;
          data.id = action.payload.doc.id;
          return data;
        });
      }));
  }
  getOneBook(idBook: string) {
    this.bookDoc = this.afs.doc<BookInterface>(`books/${idBook}`);
    return this.book = this.bookDoc.snapshotChanges().pipe(map(action => {
      if (action.payload.exists === false) {
        return null;
      } else {
        const data = action.payload.data() as BookInterface;
        data.id = action.payload.id;
        return data;
      }
    }));
  }
  addBook(book: BookInterface): void {
    this.booksCollection.add(book);
  }
  updateBook(book: BookInterface): void {
    const idBook = book.id;
    this.bookDoc = this.afs.doc<BookInterface>(`books/${idBook}`);
    this.bookDoc.update(book);
  }
  deleteBook(idBook: string): void {
    this.bookDoc = this.afs.doc<BookInterface>(`books/${idBook}`);
    this.bookDoc.delete();
  }

}
