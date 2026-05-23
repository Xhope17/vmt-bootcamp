import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from "@angular/material/icon";
import { MatCardContent, MatCardTitle, MatCardHeader, MatCard } from "@angular/material/card";

@Component({
  selector: 'app-about-us-component',
  imports: [MatButtonModule, MatIcon, MatCardContent, MatCardTitle, MatCardHeader, MatCard],
  templateUrl: './about-us-component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutUsComponent {
  constructor(private router: Router) {}

  askAndGo() {
    const go = window.confirm('¿Quieres ver los productos?');
    if (go) {
      this.router.navigate(['/products']);
    }
  }
}
