import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Task } from 'src/app/models/task.model';

@Component({
  selector: 'app-add-edit-task-modal',
  templateUrl: './add-edit-task-modal.component.html',
  styleUrls: ['./add-edit-task-modal.component.scss']
})
export class AddEditTaskModalComponent implements OnInit {

  @Output() affirm = new EventEmitter<string>();
  
  public modalHeader!: string;
  public mode: 'add' | 'edit' = 'add';
  public task!: Task;
  
  constructor(private modalRef: BsModalRef) {
    // this.modalHeader = (this.mode == 'add' ? 'Add task' : 'Edit task');
  }

  ngOnInit(): void {
    
  }

  public yes(): void {
    this.affirm.emit(this.task._id);
    this.closeModal();
  }

  closeModal() {
    this.modalRef.hide();
  }

}
