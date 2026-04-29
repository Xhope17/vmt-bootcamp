import { ChangeDetectionStrategy, Component, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Materia } from '../interfaces/materia.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-body-component',
  imports: [FormsModule, CommonModule],
  templateUrl: './bodyComponent.html',
  styleUrl: './bodyComponent.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BodyComponent {
  busqueda: string = '';
  creditos: number = 45;

  materias: Materia[] = [
    { nombre: 'Cálculo', creditos: 4, aprobada: true },
    { nombre: 'Física', creditos: 4, aprobada: false },
    { nombre: 'Programación', creditos: 3, aprobada: true },
    { nombre: 'Base de Datos', creditos: 3, aprobada: false },
    { nombre: 'Inglés', creditos: 2, aprobada: true },
  ];

  get buscarMateria() {
    if (!this.busqueda) return this.materias;
    return this.materias.filter((m) =>
      m.nombre.toLowerCase().includes(this.busqueda.toLowerCase()),
    );
  }


  sumarCreditos() {
    if (this.creditos + 10 <= 120) {
      this.creditos += 10;
    } else {
      this.creditos = 120;
    }
  }

  restarCreditos() {
    if (this.creditos - 10 >= 0) {
      this.creditos -= 10;
    } else {
      this.creditos = 0;
    }
  }

  get porcentajeProgreso() {
    return (this.creditos / 120) * 100;
  }
}
