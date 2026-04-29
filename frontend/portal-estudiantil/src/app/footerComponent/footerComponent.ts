import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-footer-component',
  imports: [],
  templateUrl: './footerComponent.html',
  styleUrl: './footerComponent.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
  anio: number = 0;

  obtenerAnio() {
    return new Date().getFullYear();
  }
}
