import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PublicNavbarComponent } from '../components/public-navbar-component/public-navbar-component';
import { RouterOutlet } from "@angular/router";
import { PublicFooterComponent } from "../components/public-footer-component/public-footer-component";
import { PublicHeaderComponent } from "../components/public-header-component/public-header-component";

@Component({
  selector: 'app-public-layout',
  imports: [PublicNavbarComponent, RouterOutlet, PublicFooterComponent, PublicHeaderComponent],
  templateUrl: './public-layout.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PublicLayout {}
