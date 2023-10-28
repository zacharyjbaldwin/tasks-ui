import { Component, EventEmitter, Output } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Day } from 'src/app/shared/day.enum';

@Component({
  selector: 'app-select-migration-day-modal',
  templateUrl: './select-migration-day-modal.component.html',
  styleUrls: ['./select-migration-day-modal.component.scss']
})
export class SelectMigrationDayModalComponent {

  @Output() daySelected = new EventEmitter<number>();

  public days: {num: Day, text: string}[] = [
    { num: Day.Sunday, text: 'Sunday' },
    { num: Day.Monday, text: 'Monday' },
    { num: Day.Tuesday, text: 'Tuesday' },
    { num: Day.Wednesday, text: 'Wednesday' },
    { num: Day.Thursday, text: 'Thursday' },
    { num: Day.Friday, text: 'Friday' },
    { num: Day.Saturday, text: 'Saturday' },
  ];
  
  constructor(private modalRef: BsModalRef) { }

  public selectDay(day: number): void {
    this.daySelected.emit(day);
    this.closeModal();
  }

  public yes(): void {
    this.closeModal();
  }

  closeModal() {
    this.modalRef.hide();
  }
}
