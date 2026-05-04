import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { EmployeesService } from '../services/employees.service';
import { Employee } from '../interfaces/employees.interface';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EmployeePage } from "../pages/employee-page/employee-page";
import { DepartmentsPage } from "../pages/departments-page/departments-page";

@Component({
  selector: 'app-body-component',
  standalone: true,
  imports: [FormsModule, CommonModule, EmployeePage, DepartmentsPage],
  templateUrl: './bodyComponent.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BodyComponent {}
