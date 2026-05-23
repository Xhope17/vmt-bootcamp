import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatBadgeModule } from '@angular/material/badge';
import { RouterLinkWithHref, RouterLink } from '@angular/router';

@Component({
  selector: 'app-public-header',
  imports: [
    RouterLinkWithHref,
    RouterLink,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatBadgeModule,
  ],
  templateUrl: './public-header-component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PublicHeaderComponent {}
