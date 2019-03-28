import { Component, OnInit, ViewChild, Input, ElementRef } from '@angular/core';
import { DataApiService } from 'src/app/services/data-api.service';
import { BookInterface } from 'src/app/models/book-interface';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  constructor(private dataApi: DataApiService) { }
  @ViewChild('btnClose') btnClose: ElementRef;
  // $('#ID').click(); ---> trigger
  @Input() userUid: string;
  ngOnInit() {
  }

  onSaveBook(bookForm: NgForm): void {
    console.log(bookForm.value);
    if (bookForm.value.id == null) {
      // New 
      // bookForm.value.userUid = this.userUid;
      this.dataApi.addBook(bookForm.value);
    } else {
      // Update
      this.dataApi.updateBook(bookForm.value);
    }
    bookForm.resetForm();
    this.btnClose.nativeElement.click();
  }


}
