import { NgComponentOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, input, output, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';

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

  public data = inject(MAT_DIALOG_DATA);

  onSaveClick() {
    if (this.data.onSave) {
      this.data.onSave.next();
    }
  }
}
