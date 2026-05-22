import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Subject } from 'rxjs';

import { GenericDialog } from '../../../../shared/components/generic-dialog/generic-dialog';
import { Product } from '../../../../shared/interfaces/product.interface';
import { ProductsService } from '../../../../shared/services/products.service';
import { ProductModal } from '../product-modal/product-modal';
import { MatSelectModule } from '@angular/material/select';
@Component({
  selector: 'app-product-management',
  standalone: true,
  imports: [
    MatCardModule,
    RouterLink,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatButtonModule,
    MatTooltipModule,
    MatIconModule,
    MatSelectModule,
  ],
  templateUrl: './product-management-component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductManagementComponent implements OnInit, AfterViewInit, OnDestroy {
  private _productService = inject(ProductsService);
  private _dialog = inject(MatDialog);

  loading = signal(false);
  error = signal('');
  products = signal<Product[]>([]);
  productsView = signal<Product[]>([]);
  isScrolledToBottom = signal(false);
  categories = signal<string[]>([]);
  searchTerm = signal('');
  selectedCategory = signal<string>('');

  private _resizeHandler: any;
  private _scrollHandler: any;

  ngOnInit() {
    this.cargarProductos();
  }

  ngAfterViewInit() {
    this.positionScrollButton();

    this._resizeHandler = () => this.positionScrollButton();
    this._scrollHandler = () => {
      this.positionScrollButton();
      this.checkScrollPosition();
    };

    window.addEventListener('resize', this._resizeHandler);
    window.addEventListener('scroll', this._scrollHandler, true);

    const container = document.getElementById('productsListContainer');
    if (container) {
      container.addEventListener('scroll', () => this.checkScrollPosition());
    }
  }

  cargarProductos() {
    this.loading.set(true);
    this.error.set('');

    this._productService.getProducts().subscribe({
      next: (data) => {
        this.products.set(data);
        this.productsView.set(data);
        this.categories.set(
          data.map((p) => p.category).filter((c, i, arr) => arr.indexOf(c) === i),
        );
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set('Error al cargar el inventario de productos');
        this.loading.set(false);
        console.error(err);
      },
    });
  }

  filtrarCategoria() {
    let resultados = this.products();
    const texto = this.searchTerm().toLowerCase().trim();
    const cat = this.selectedCategory();
    if (texto) {
      resultados = resultados.filter(
        (p) =>
          p.title.toLowerCase().includes(texto) ||
          (p.description && p.description.toLowerCase().includes(texto)),
      );
    }

    if (cat) {
      resultados = resultados.filter(p => p.category === cat);
    }

    this.productsView.set(resultados);
  }

  abrirModal(id: number | null = null) {
    const title = id ? 'Editar Producto' : 'Registrar Producto';
    const action = id ? 'edit' : 'save';
    const saveSubject = new Subject<void>();

    const dialogRef = this._dialog.open(GenericDialog, {
      width: '600px',
      disableClose: true,
      data: {
        title: title,
        component: ProductModal,
        id: id,
        onSave: saveSubject,
        action: action,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      saveSubject.complete();
      if (result) {
        this.cargarProductos();
      }
    });
  }

  eliminarProducto(id: number, name: string) {
    const saveSubject = new Subject<void>();

    const dialogRef = this._dialog.open(GenericDialog, {
      width: '400px',
      data: {
        title: 'Eliminar Producto',
        message: '¿Estás seguro de que deseas eliminar "' + name + '"?',
        subMessage: 'Esta acción no se puede deshacer.',
        btnText: 'Eliminar',
        component: ProductModal,
        id: id,
        onSave: saveSubject,
        action: 'delete',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      saveSubject.complete();
      if (result) {
        this.cargarProductos();
      }
    });
  }

  //utilidades para el scroll - fechas de subir y bajar
  scrollToBottom() {
    const el = document.getElementById('productsListContainer');
    if (!el) return;

    try {
      if (this.isScrolledToBottom()) {
        el.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' });
      }
    } catch (e) {
      el.scrollTop = this.isScrolledToBottom() ? 0 : el.scrollHeight;
    }
  }

  checkScrollPosition() {
    const el = document.getElementById('productsListContainer');
    if (!el) return;
    const isAtBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 50;
    this.isScrolledToBottom.set(isAtBottom);
  }

  positionScrollButton() {
    const container = document.getElementById('productsListContainer');
    const btn = document.getElementById('productsScrollBtn');
    if (!container || !btn) return;

    const rect = container.getBoundingClientRect();
    const btnSize = 56;
    const left = Math.min(rect.right - btnSize - 12, window.innerWidth - btnSize - 12);
    const top = Math.min(rect.bottom - btnSize - 12, window.innerHeight - btnSize - 12);

    btn.style.position = 'fixed';
    btn.style.left = `${left}px`;
    btn.style.top = `${top}px`;
    btn.style.zIndex = '9999';
  }

  ngOnDestroy() {
    if (this._resizeHandler) window.removeEventListener('resize', this._resizeHandler);
    if (this._scrollHandler) window.removeEventListener('scroll', this._scrollHandler, true);
  }
}
