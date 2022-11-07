import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Task } from '../models/task.model';
import { TaskService } from '../services/task.service';
import { Day } from '../shared/day.enum';

@Component({
  selector: 'task-group',
  templateUrl: './task-group.component.html',
  styleUrls: ['./task-group.component.scss']
})
export class TaskGroupComponent implements OnInit {

  @Input() day: Day = 0;
  public days: String[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  public error: boolean = false;
  public hideContent: boolean = false;
  public loading: boolean = true;
  public taskCount: number = 0;
  public tasks: Task[] = [];

  constructor(
    private taskService: TaskService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getTasks();
  }

  public toggleContentHidden(): void {
    this.hideContent = !this.hideContent;
  }

  public getTasks(): void {
    this.taskService.getTasks(this.day).subscribe({
      next: (response) => {
        this.taskCount = response.count;
        this.tasks = response.tasks;
        this.loading = false;
      },
      error: (error) => {
        this.error = true;
        this.loading = false;
      }
    });
  }

  public deleteTask(taskId: string): void {
    this.taskService.deleteTask(taskId).subscribe({
      next: (response) => {
        this.getTasks();
      },
      error: (error) => {
        this.toastr.error('Failed to delete task. Please try again later.');
      }
    });
  }

  public setTaskStatus(taskId: string, status: boolean): void {
    this.taskService.setTaskStatus(taskId, status).subscribe({
      next: (response) => {
        this.getTasks();
      },
      error: (error) => {
        this.toastr.error('Failed to update task status. Please try again later.');
      }
    });
  }

  addTask(): void {
    const description = window.prompt('Enter task description:');
    if (description != undefined) {
      this.taskService.addTask(this.day, description).subscribe({
        next: (response) => {
          this.getTasks();
        },
        error: (error) => {
          this.toastr.error('Failed to add task. Please try again later.');
        }
      });
    }
  }

}
