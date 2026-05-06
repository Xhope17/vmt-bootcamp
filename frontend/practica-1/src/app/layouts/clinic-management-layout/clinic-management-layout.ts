import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from "@angular/router";
import { NavbarComponent } from "../../components/navbar-component/navbar-component";

@Component({
  selector: 'app-clinic-management-layout',
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './clinic-management-layout.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClinicManagementLayout { }
