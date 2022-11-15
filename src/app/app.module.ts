import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { ModalModule } from 'ngx-bootstrap/modal'
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { AppComponent } from './app.component';
import { TaskGroupComponent } from './task-group/task-group.component';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { TaskGroupItemComponent } from './task-group/task-group-item/task-group-item.component';
import { ConfirmDeleteModalComponent } from './modals/confirm-delete-modal/confirm-delete-modal.component';
import { ConfirmClearModalComponent } from './modals/confirm-clear-modal/confirm-clear-modal.component';
import { EditTaskModalComponent } from './modals/edit-task-modal/edit-task-modal.component';
import { AddEditTaskModalComponent } from './modals/add-edit-task-modal/add-edit-task-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    TaskGroupComponent,
    LoadingSpinnerComponent,
    TaskGroupItemComponent,
    ConfirmDeleteModalComponent,
    ConfirmClearModalComponent,
    EditTaskModalComponent,
    AddEditTaskModalComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CollapseModule.forRoot(),
    HttpClientModule,
    ToastrModule.forRoot(),
    ModalModule.forRoot(),
    BsDropdownModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
