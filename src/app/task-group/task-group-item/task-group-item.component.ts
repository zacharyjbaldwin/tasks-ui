import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
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

  public loading: boolean = false;

  constructor(
    private taskService: TaskService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
  }

  public deleteTask(taskId: string): void {
    this.loading = true;
    this.taskService.deleteTask(taskId).subscribe({
      next: () => { this.getTasks.emit(); },
      error: () => {
        this.toastr.error('Failed to delete task. Please try again later.');
        this.loading = false;
      }
    });
  }

  public setTaskStatus(taskId: string, status: boolean): void {
    this.loading = true;
    this.taskService.setTaskStatus(taskId, status).subscribe({
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

}
