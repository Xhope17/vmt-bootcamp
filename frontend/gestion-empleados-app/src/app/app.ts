import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BodyComponent } from './bodyComponent/bodyComponent';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, BodyComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('gestion-empleados-app');
}
