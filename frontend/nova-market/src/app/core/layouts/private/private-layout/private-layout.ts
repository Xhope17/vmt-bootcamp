import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { AuthService } from '../../../../features/services/auth.service';
interface NavItem {
  icon: string;
  label: string;
  route: string;
}

@Component({
  selector: 'app-private-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatTooltipModule,
    // RouterLink and RouterOutlet are standalone directives; include RouterModule
    // for completeness when using router APIs in templates
    // Note: importing Router here ensures router-related directives are available
  ],
  templateUrl: './private-layout.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrivateLayout {
  private auth = inject(AuthService);
  private router = inject(Router);

  collapsed = signal(false);

  navItems: NavItem[] = [
    { icon: 'dashboard', label: 'Dashboard', route: '/admin/dashboard' },
    { icon: 'shopping_bag', label: 'Productos', route: '/admin/products' },
    { icon: 'shopping_cart', label: 'Pedidos', route: '/admin/orders' },
  ];

  toggle() {
    this.collapsed.set(!this.collapsed());
  }

  logout() {
    this.auth.logout(this.router);
  }
}
