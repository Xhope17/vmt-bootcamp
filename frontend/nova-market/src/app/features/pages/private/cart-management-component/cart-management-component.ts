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
import { MatSelectModule } from '@angular/material/select';
import { Subject } from 'rxjs';

import { GenericDialog } from '../../../../shared/components/generic-dialog/generic-dialog';
import { CartsService } from '../../../services/carts.service';
import { Cart } from '../../../interfaces/private/cart.interface';
import { CartModal } from '../cart-modal/cart-modal';

@Component({
  selector: 'app-cart-management-component',
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
  templateUrl: './cart-management-component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartManagementComponent implements OnInit, AfterViewInit, OnDestroy {
  private _cartsService = inject(CartsService);
  private _dialog = inject(MatDialog);

  loading = signal(false);
  error = signal('');
  carts = signal<Cart[]>([]);
  cartsView = signal<Cart[]>([]);
  isScrolledToBottom = signal(false);
  searchTerm = signal('');

  private _scrollHandler: any;

  ngOnInit() {
    this.cargarCarritos();
  }

  ngAfterViewInit() {
    this._scrollHandler = () => this.checkScrollPosition();
    const mainContainer = document.querySelector('main') || window;
    mainContainer.addEventListener('scroll', this._scrollHandler, true);
  }

  cargarCarritos() {
    this.loading.set(true);
    this.error.set('');

    this._cartsService.getCarts().subscribe({
      next: (data) => {
        this.carts.set(data);
        this.cartsView.set(data);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set('Error al cargar el listado de carritos');
        this.loading.set(false);
        console.error(err);
      },
    });
  }

  filtrarCarrito() {
    let resultados = this.carts();
    const texto = this.searchTerm().toLowerCase().trim();

    if (texto) {
      // Filtrando por ID de usuario como ejemplo básico
      resultados = resultados.filter((c) => c.userId.toString().includes(texto));
    }

    this.cartsView.set(resultados);
  }

  abrirModal(id: number | null = null) {
    const title = id ? 'Detalle de Carrito' : 'Crear Carrito';
    const action = id ? 'view' : 'save';
    const saveSubject = new Subject<void>();

    const dialogRef = this._dialog.open(GenericDialog, {
      width: '700px',
      disableClose: true,
      data: {
        title: title,
        component: CartModal,
        id: id,
        onSave: saveSubject,
        action: action,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      saveSubject.complete();
      if (result && action === 'save') {
        this.cargarCarritos();
      }
    });
  }

  eliminarCarrito(id: number) {
    const saveSubject = new Subject<void>();

    const dialogRef = this._dialog.open(GenericDialog, {
      width: '400px',
      data: {
        title: 'Eliminar Carrito',
        message: '¿Estás seguro de que deseas eliminar el carrito #' + id + '?',
        subMessage: 'Esta acción no se puede deshacer.',
        btnText: 'Eliminar',
        component: CartModal,
        id: id,
        onSave: saveSubject,
        action: 'delete',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      saveSubject.complete();
      if (result) {
        this.cargarCarritos();
      }
    });
  }

  // --- Utilidades de Scroll (Sin restricciones de altura) ---
  scrollToBottom() {
    const scrollingElement = document.querySelector('main') || document.documentElement;
    try {
      if (this.isScrolledToBottom()) {
        scrollingElement.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        scrollingElement.scrollTo({ top: scrollingElement.scrollHeight, behavior: 'smooth' });
      }
    } catch (e) {
      scrollingElement.scrollTop = this.isScrolledToBottom() ? 0 : scrollingElement.scrollHeight;
    }
  }

  checkScrollPosition() {
    const scrollingElement = document.querySelector('main') || document.documentElement;
    const isAtBottom = scrollingElement.scrollHeight - scrollingElement.scrollTop - scrollingElement.clientHeight < 100;
    this.isScrolledToBottom.set(isAtBottom);
  }

  ngOnDestroy() {
    const mainContainer = document.querySelector('main') || window;
    if (this._scrollHandler) {
      mainContainer.removeEventListener('scroll', this._scrollHandler, true);
    }
  }
}
