import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../../../shared/services/products.service';
import { Product } from '../../../../shared/interfaces/product.interface';
import { MatDialog } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Location } from '@angular/common';

@Component({
  selector: 'app-product-detail-component',
  imports: [MatButtonModule, MatCardModule, MatIconModule, MatTooltipModule],
  templateUrl: './product-detail-component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductDetailComponent implements OnInit {
  private _route = inject(ActivatedRoute);
  private _productsService = inject(ProductsService);
  private _dialog = inject(MatDialog);

  product = signal<Product | null>(null);
  loading = signal(true);
  error = signal('');

  constructor(private location: Location) {}

  backClicked() {
    this.location.back();
  }

  ngOnInit() {
    const idParam = this._route.snapshot.paramMap.get('id');

    if (idParam) {
      this.buscarProducto(parseInt(idParam));
    } else {
      this.error.set('No se proporcionó un ID válido en la URL');
      this.loading.set(false);
    }
  }

  buscarProducto(id: number) {
    this.loading.set(true);
    this.error.set('');
    this._productsService.getById(id).subscribe({
      next: (data) => {
        this.product.set(data);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set('Error al cargar la información del producto');
        this.loading.set(false);
      },
    });
  }
}
