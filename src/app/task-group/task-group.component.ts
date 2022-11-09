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
  @Input() hideContent: boolean = false;

  public days: String[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  public error: boolean = false;
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

  addTask(): void {
    const description = window.prompt('Enter task description:');
    if (description != undefined) {
      this.taskService.addTask(this.day, description.trim()).subscribe({
        next: () => { this.getTasks(); },
        error: () => { this.toastr.error('Failed to add task. Please try again later.'); }
      });
    }
  }

}
