import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Task } from '../models/task.model';
import { Day } from '../shared/day.enum';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) { }

  public addTask(day: Day, description: string) {
    return this.http.post(`${environment.apiUrl}/api/task`, { day: day, description: description });
  }

  public getTasks(day: Day): Observable<{ count: number, tasks: Task[] }> {
    return this.http.get<{ message: string, count: number, tasks: Task[] }>(`${environment.apiUrl}/api/task?day=${day}`)
      .pipe(map((response) => { return { count: response.count, tasks: response.tasks } }));
  }

  public setTaskStatus(taskId: string, status: boolean) {
    return this.http.put(`${environment.apiUrl}/api/task/${taskId}`, { completed: status });
  }

  public deleteTask(taskId: string) {
    return this.http.delete(`${environment.apiUrl}/api/task/${taskId}`);
  }
}
