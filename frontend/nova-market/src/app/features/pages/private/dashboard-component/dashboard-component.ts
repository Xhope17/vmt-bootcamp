import { CurrencyPipe, DecimalPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { catchError, of } from 'rxjs';
import { ProductsService } from '../../../../shared/services/products.service';
import { Product } from '../../../../shared/interfaces/product.interface';

@Component({
  selector: 'app-dashboard-component',
  imports: [MatCardModule, MatIconModule, RouterLink, CurrencyPipe, DecimalPipe],
  templateUrl: './dashboard-component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent {
  private readonly productsService = inject(ProductsService);

  readonly products = toSignal(
    this.productsService.getProducts().pipe(catchError(() => of([] as Product[]))),
    { initialValue: [] as Product[] },
  );

  readonly totalProducts = computed(() => this.products().length);

  readonly totalStock = computed(() =>
    this.products().reduce((total: number, product: Product) => total + product.stock, 0),
  );

  readonly categoriesCount = computed(
    () => new Set(this.products().map((product: Product) => product.category)).size,
  );

  readonly inventoryValue = computed(() =>
    this.products().reduce(
      (total: number, product: Product) => total + product.price * product.stock,
      0,
    ),
  );

  readonly averageInventoryValue = computed(() =>
    this.totalProducts() ? this.inventoryValue() / this.totalProducts() : 0,
  );

  readonly averageStock = computed(() =>
    this.totalProducts() ? this.totalStock() / this.totalProducts() : 0,
  );

  readonly discountedProductsCount = computed(() =>
    this.products().filter((product: Product) => product.discountPercentage > 0).length,
  );
}
