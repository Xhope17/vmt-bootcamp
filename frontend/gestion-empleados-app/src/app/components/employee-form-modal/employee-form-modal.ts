import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-employee-form-modal',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './employee-form-modal.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeFormModal { }
