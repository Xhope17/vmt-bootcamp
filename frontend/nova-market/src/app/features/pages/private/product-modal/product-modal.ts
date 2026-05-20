import { ChangeDetectionStrategy, Component, inject, OnInit, signal, Type } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Product } from '../../../../shared/interfaces/product.interface';
import { ProductsService } from '../../../../shared/services/products.service';
import { Subject } from 'rxjs';

interface GenericDialogData {
  title: string;
  component?: Type<unknown>;
  message?: string;
  subMessage?: string;
  btnText?: string;
  btnColor?: 'primary' | 'accent' | 'warn';
  action?: 'save' | 'delete' | 'edit';
  id?: number | string | null; // Aceptamos number porque los IDs de productos lo son
  onSave?: Subject<void>;
}

@Component({
  selector: 'app-product-modal',
  imports: [
    MatDialogModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
  ],
  templateUrl: './product-modal.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductModal implements OnInit {
  private _fb = inject(FormBuilder);
  private _productService = inject(ProductsService);
  private _snackBar = inject(MatSnackBar);
  private _dialogRef = inject(MatDialogRef<ProductModal>);
  public data = inject<GenericDialogData>(MAT_DIALOG_DATA);

  loading = signal(false);
  private currentProduct: Product | null = null;

  // Formulario mapeado a los datos principales de Product
  productForm: FormGroup = this._fb.group({
    title: ['', [Validators.required, Validators.minLength(3)]],
    description: ['', [Validators.required, Validators.minLength(10)]],
    price: [0, [Validators.required, Validators.min(0)]],
    stock: [0, [Validators.required, Validators.min(0)]],
    category: ['', [Validators.required]],
    brand: ['', [Validators.required]],
    thumbnail: ['', [Validators.required]], // URL de la imagen principal
  });

  ngOnInit() {
    if (this.data?.onSave) {
      this.data.onSave.subscribe(() => {
        if (this.data?.action === 'delete') {
          this.eliminarProducto();
        } else {
          this.guardar();
        }
      });
    }

    if (this.data?.action == 'edit' && this.data.id) {
      console.log('Editando producto...');
      this.cargarDatos(Number(this.data.id));
    } else if (this.data?.action == 'save') {
      console.log('Guardando nuevo producto...');
    } else if (this.data?.action == 'delete') {
      console.log('Eliminando producto...');
    }
  }

  cargarDatos(id: number) {
    this.loading.set(true);
    // Asegúrate de tener el método getById en tu ProductService
    this._productService.getById(id).subscribe({
      next: (product) => {
        this.currentProduct = product;
        this.productForm.patchValue(product);
        this.loading.set(false);
      },
      error: () => {
        this._snackBar.open('Error al obtener los datos del producto', 'Cerrar');
        this.loading.set(false);
      },
    });
  }

  guardar() {
    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched();
      return;
    }

    this.loading.set(true);
    const formValue = this.productForm.getRawValue();
    const id = this.data?.id ? Number(this.data.id) : null;

    // Unimos los datos existentes con los editados en el formulario
    const payload: Partial<Product> = {
      ...this.currentProduct,
      ...formValue,
    };

    // Asegúrate de tener create() y update() en tu ProductService
    const request = id
      ? this._productService.update(id, payload)
      : this._productService.create(payload);

    request.subscribe({
      next: () => {
        this._snackBar.open(`Producto ${id ? 'actualizado' : 'creado'} con éxito`, 'OK', {
          duration: 3000,
        });
        this._dialogRef.close(true);
      },
      error: () => {
        this._snackBar.open('Error al procesar la solicitud', 'Cerrar');
        this.loading.set(false);
      },
    });
  }

  eliminarProducto() {
    const id = this.data?.id ? Number(this.data.id) : null;
    if (!id) {
      this._snackBar.open('ID de producto no válido', 'Cerrar');
      return;
    }

    this.loading.set(true);
    // Asegúrate de tener el método delete() en tu ProductService
    this._productService.delete(id).subscribe({
      next: () => {
        this._snackBar.open('Producto eliminado con éxito', 'OK', { duration: 3000 });
        this._dialogRef.close(true);
        console.log('Se eliminó correctamente el producto');
      },
      error: () => {
        this._snackBar.open('Error al eliminar el producto', 'Cerrar');
        this.loading.set(false);
        console.log('Error al eliminar producto desde el dialog');
      },
    });
  }
}
