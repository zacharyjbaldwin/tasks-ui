import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Day } from './shared/day.enum';
import { TaskGroupComponent } from './task-group/task-group.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChildren(TaskGroupComponent) taskGroups?: QueryList<TaskGroupComponent>;

  public today = new Date().getDay() - 1;
  public days: Day[] = [Day.Monday, Day.Tuesday, Day.Wednesday, Day.Thursday, Day.Friday, Day.Saturday, Day.Sunday];
  public displayDays: Day[] = [];

  ngOnInit(): void {
    for (let i = this.today; i < this.today + 7; i++ ) {
      this.displayDays.push(this.days[i % 7]);
    }
  }

  public expandAll(): void {
    this.taskGroups?.forEach(taskGroup => taskGroup.hideContent = false);
  }
  
  public collapseAll(): void {
    this.taskGroups?.forEach(taskGroup => taskGroup.hideContent = true);
  }
}
