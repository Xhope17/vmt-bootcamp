import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLinkWithHref, RouterLink } from '@angular/router';

@Component({
  selector: 'app-public-header',
  imports: [RouterLinkWithHref, RouterLink, MatIconModule],
  templateUrl: './public-header-component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PublicHeaderComponent {}
