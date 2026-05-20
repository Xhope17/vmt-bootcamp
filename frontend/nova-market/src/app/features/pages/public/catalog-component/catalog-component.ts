import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductsService } from '../../../../shared/services/products.service';
import { Product } from '../../../../shared/interfaces/product.interface';

@Component({
  selector: 'app-catalog-component',
  imports: [
    MatCardModule,
    RouterLink,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatButtonModule,
    MatTooltipModule,
    MatIcon,
  ],
  templateUrl: './catalog-component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CatalogComponent implements OnInit {
  private _productsService = inject(ProductsService);
  loading = signal<boolean>(false);

  products = signal<Product[]>([]);
  error = signal<string | null>(null);
  isScrolledToBottom = signal(false);

  ngOnInit() {
    this.cargarProductos();
  }

  cargarProductos() {
    this.loading.set(true);
    this.error.set('');
    this._productsService.getProducts().subscribe({
      next: (data) => {
        this.products.set(data);
        this.loading.set(false);
        console.log(this.products()[0]);
      },
      error: (err) => {
        this.error.set('Error al cargar los productos');
        this.loading.set(false);
      },
    });
  }
}
