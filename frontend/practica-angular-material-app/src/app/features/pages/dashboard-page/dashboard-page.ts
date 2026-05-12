import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet, RouterLinkWithHref, RouterLink } from '@angular/router';
import { Navbar } from '../../../shared/navbar/navbar';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-dashboard-page',
  imports: [RouterOutlet, Navbar, MatIconModule, RouterLinkWithHref, RouterLink],
  templateUrl: './dashboard-page.html',
  styleUrl: './dashboard-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardPage {}
