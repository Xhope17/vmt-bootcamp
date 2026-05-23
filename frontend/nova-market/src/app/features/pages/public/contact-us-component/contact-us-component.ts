import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from "@angular/material/icon";

@Component({
  selector: 'app-contact-us-component',
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIcon],
  templateUrl: './contact-us-component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactUsComponent {
  model = { name: '', email: '', message: '' };

  submit() {
    alert('Gracias, ' + (this.model.name || 'usuario') + '! Hemos recibido tu mensaje.');
    this.model = { name: '', email: '', message: '' };
  }
}
