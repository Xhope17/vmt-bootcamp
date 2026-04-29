import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-header-component',
  imports: [],
  templateUrl: './headerComponent.html',
  styleUrl: './headerComponent.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  state: boolean = false;
  name: string = 'Bryan Mora';

  Connection() {
    this.state = !this.state;
  }
}
