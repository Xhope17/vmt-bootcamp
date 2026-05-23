import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';

import { ProductsService } from '../../../../shared/services/products.service';
import { Product } from '../../../../shared/interfaces/product.interface';
import { CartsService } from '../../../services/carts.service';

@Component({
  selector: 'app-cart-modal',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule,
  ],
  templateUrl: './cart-modal.html',
})
export class CartModal implements OnInit {
  private _fb = inject(FormBuilder);
  private _cartsService = inject(CartsService);
  private _productsService = inject(ProductsService);

  public data = inject(MAT_DIALOG_DATA);
  public dialogRef = inject(MatDialogRef<CartModal>);

  cartForm!: FormGroup;
  loading = signal(false);
  availableProducts = signal<Product[]>([]);

  ngOnInit() {
    this.cargarProductosDisponibles();
    this.initForm();

    if (this.data.action === 'view' && this.data.id) {
      this.cartForm.disable();
    }
  }

  cargarProductosDisponibles() {
    this._productsService.getProducts().subscribe({
      next: (prods) => this.availableProducts.set(prods),
      error: (err) => console.error('Error cargando productos', err)
    });
  }

  initForm() {
    this.cartForm = this._fb.group({
      userId: ['', [Validators.required, Validators.min(1)]],
      products: this._fb.array([], Validators.required)
    });

    if (this.data.action === 'save') {
      this.addProduct();
    }
  }

  get productsArray() {
    return this.cartForm.get('products') as FormArray;
  }

  addProduct() {
    const productGroup = this._fb.group({
      id: ['', Validators.required],
      quantity: [1, [Validators.required, Validators.min(1)]]
    });
    this.productsArray.push(productGroup);
  }

  removeProduct(index: number) {
    if (this.productsArray.length > 1) {
      this.productsArray.removeAt(index);
    }
  }

  onSubmit() {
    if (this.cartForm.invalid) {
      this.cartForm.markAllAsTouched();
      return;
    }

    this.loading.set(true);
    const payload = this.cartForm.getRawValue();

    if (this.data.action === 'save') {
      this._cartsService.create(payload).subscribe({
        next: () => {
          this.loading.set(false);
          this.data.onSave.next();
          this.dialogRef.close(true);
        },
        error: (err) => {
          console.error(err);
          this.loading.set(false);
        }
      });
    }
  }
}
