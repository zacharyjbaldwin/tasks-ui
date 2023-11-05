import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { AddEditTaskModalComponent } from 'src/app/modals/add-edit-task-modal/add-edit-task-modal.component';
import { ConfirmDeleteModalComponent } from 'src/app/modals/confirm-delete-modal/confirm-delete-modal.component';
import { SelectMigrationDayModalComponent } from 'src/app/modals/select-migration-day-modal/select-migration-day-modal.component';
import { Task } from 'src/app/models/task.model';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'task-group-item',
  templateUrl: './task-group-item.component.html',
  styleUrls: ['./task-group-item.component.scss']
})
export class TaskGroupItemComponent implements OnInit {

  @Input() public task!: Task;
  @Output() private getTasks = new EventEmitter();
  @Output() private refreshTasksAll = new EventEmitter();

  public loading: boolean = false;

  private deleteTaskModal?: BsModalRef;
  private editTaskModal?: BsModalRef;
  private migrateTaskModal?: BsModalRef;

  constructor(
    private modalService: BsModalService,
    private taskService: TaskService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
  }

  public deleteTask(task: Task): void {
    this.deleteTaskModal = this.modalService.show(ConfirmDeleteModalComponent, { class: 'modal-md', initialState: { task: task } });
    (this.deleteTaskModal.content as ConfirmDeleteModalComponent).affirm.subscribe({
      next: (taskId: string) => {
        this.loading = true;
        this.taskService.deleteTask(taskId).subscribe({
          next: () => { this.getTasks.emit(); },
          error: () => {
            this.toastr.error('Failed to delete task. Please try again later.');
            this.loading = false;
          }
        });
      }
    });
  }

  openEditModal(task: Task): void {
    this.editTaskModal = this.modalService.show(AddEditTaskModalComponent, { initialState: { mode: 'edit', task: task } });
  }

  public updateTask(taskId: string, status: boolean, description: string, day: number): void {
    this.loading = true;
    this.taskService.updateTask(taskId, status, description, day).subscribe({
      next: () => {
        this.getTasks.emit();
        this.loading = false;
      },
      error: () => {
        this.toastr.error('Failed to update task status. Please try again later.');
        this.loading = false;
      }
    });
  }

  public migrateTask(task: Task): void {
    this.migrateTaskModal = this.modalService.show(SelectMigrationDayModalComponent);
    (this.migrateTaskModal.content as SelectMigrationDayModalComponent).daySelected.subscribe(day => {
      this.taskService.updateTask(task._id!, task.completed!, task.description, day).subscribe({
        next: () => {
          this.refreshTasksAll.emit();
        }
      })
    });
  }
}
