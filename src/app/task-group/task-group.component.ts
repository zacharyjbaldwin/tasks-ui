import { Component, EventEmitter, Input, OnInit, Output, QueryList, ViewChildren } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { ConfirmClearModalComponent } from '../modals/confirm-clear-modal/confirm-clear-modal.component';
import { Task } from '../models/task.model';
import { TaskService } from '../services/task.service';
import { Day } from '../shared/day.enum';
import { TaskGroupItemComponent } from './task-group-item/task-group-item.component'
import { SelectMigrationDayModalComponent } from '../modals/select-migration-day-modal/select-migration-day-modal.component';

@Component({
  selector: 'task-group',
  templateUrl: './task-group.component.html',
  styleUrls: ['./task-group.component.scss']
})
export class TaskGroupComponent implements OnInit {
  @Input() day: Day = 0;
  @Input() hideContent: boolean = false;
  @Output() refreshAll = new EventEmitter();
  @ViewChildren(TaskGroupItemComponent) public taskGroupItems!: QueryList<TaskGroupItemComponent>

  public completedAll: boolean = false;
  public completedCount: number = 0;
  public days: String[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  public header: String = '';
  public error: boolean = false;
  public loading: boolean = true;
  public taskCount: number = 0;
  public tasks: Task[] = [];

  private modal?: BsModalRef;

  constructor(
    private modalService: BsModalService,
    private taskService: TaskService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.header = this.days[this.day];
    this.getTasks();
  }

  public toggleContentHidden(): void {
    this.hideContent = !this.hideContent;
  }

  public refresh(): void {
    this.loading = true;
    this.getTasks();
  }

  public getTasks(): void {
    this.taskService.getTasks(this.day).subscribe({
      next: (response) => {
        this.taskCount = response.count;
        this.completedCount = response.tasks.filter(t => t.completed == true).length;
        this.completedAll = this.taskCount == this.completedCount && this.taskCount > 0;
        this.tasks = response.tasks;
        this.loading = false;
      },
      error: (error) => {
        this.error = true;
        this.loading = false;
      }
    });
  }

  addTask(): void {
    const description = window.prompt('Enter task description:');
    if (description != undefined) {
      this.taskService.addTask(this.day, description.trim()).subscribe({
        next: () => { this.getTasks(); },
        error: () => { this.toastr.error('Failed to add task. Please try again later.'); }
      });
    }
  }

  openConfirmClearTasksModal(): void {
    this.modal = this.modalService.show(ConfirmClearModalComponent, { initialState: { header: this.header } });
    (this.modal.content as ConfirmClearModalComponent).affirm.subscribe(() => {
      this.taskService.clearTasksByDay(this.day).subscribe({
        next: () => {
          this.toastr.success(`Cleared all tasks for ${this.header}.`);
          this.getTasks();
        },
        error: () => { this.toastr.error('Failed to clear tasks. Please try again later.'); }
      });
    });
  }

  public markAllComplete(complete: boolean): void {
    for (let item of this.taskGroupItems) {
      item.updateTask(item.task._id!, complete, item.task.description, item.task.day);
    }
  }

  public openDaySelector(excludeComplete?: boolean): void {
    this.modal = this.modalService.show(SelectMigrationDayModalComponent);
    (this.modal.content as SelectMigrationDayModalComponent).daySelected.subscribe(day => {
      for (let task of excludeComplete ? this.tasks.filter(z => !z.completed) : this.tasks) {
        this.taskService.updateTask(task._id!, task.completed!, task.description, day).subscribe({
          next: () => this.refreshAll.emit(),
          error: () => this.toastr.error('Failed to migrate tasks. Please try again later.')
        });
      }
    });
  }
}
