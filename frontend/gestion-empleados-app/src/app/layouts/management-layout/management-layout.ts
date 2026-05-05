import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from "@angular/router";
import { NavbarComponent } from '../../components/navbar.component/navbar.component';

@Component({
  selector: 'app-management-layout',
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './management-layout.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ManagementLayout { }
