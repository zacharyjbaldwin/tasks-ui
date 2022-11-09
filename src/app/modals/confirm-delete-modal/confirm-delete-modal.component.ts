import { Component, EventEmitter, Output } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Task } from 'src/app/models/task.model';

@Component({
  selector: 'app-confirm-delete-modal',
  templateUrl: './confirm-delete-modal.component.html',
  styleUrls: ['./confirm-delete-modal.component.scss']
})
export class ConfirmDeleteModalComponent {
  
  @Output() affirm = new EventEmitter<string>();
  
  public task!: Task;

  constructor(private modalRef: BsModalRef) { }

  public yes(): void {
    this.affirm.emit(this.task._id);
    this.closeModal();
  }

  closeModal() {
    this.modalRef.hide();
  }
}
