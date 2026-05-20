import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-dashboard-component',
  imports: [MatCardModule, MatIconModule],
  templateUrl: './dashboard-component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent {

}
