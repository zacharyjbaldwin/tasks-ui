import { Component, EventEmitter, Output } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-confirm-clear-modal',
  templateUrl: './confirm-clear-modal.component.html',
  styleUrls: ['./confirm-clear-modal.component.scss']
})
export class ConfirmClearModalComponent {

  @Output() affirm = new EventEmitter();
  
  public header!: String;
  constructor(private modalRef: BsModalRef) { }

  public yes(): void {
    this.affirm.emit();
    this.closeModal();
  }

  closeModal() {
    this.modalRef.hide();
  }

}
