import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-student-form-dialog',
  imports: [],
  templateUrl: './student-form-dialog.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StudentFormDialog implements OnInit {

  ngOnInit() {}
}
