import { NgComponentOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, input, output, signal, Type } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { Subject } from 'rxjs';

interface GenericDialogData {
  title: string; // Obligatorio
  component?: Type<unknown>; // Tipado estricto para componentes de Angular
  message?: string; // Opcional
  subMessage?: string; // Opcional
  btnText?: string; // Opcional
  btnColor?: 'primary' | 'accent' | 'warn'; // Solo acepta colores nativos de Material
  action?: 'save' | 'delete' | 'edit'; // Restringido a acciones específicas
  id?: string | null; // Opcional
  onSave?: Subject<void>; // Tipado correcto del canal de RxJS
}

@Component({
  selector: 'app-generic-dialog',
  imports: [MatDialogModule, MatButtonModule, NgComponentOutlet],
  templateUrl: './generic-dialog.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GenericDialog {
  title = input('');
  id = input<string | null>(null);
  isValid = input(false);
  save = output<void>();
  action = input('');

  btnText = input('');
  message = input('');
  subMessage = input('');

  public data = inject<GenericDialogData>(MAT_DIALOG_DATA);

  onSaveClick() {
    if (this.data.onSave) {
      this.data.onSave.next();
    }
  }
}
