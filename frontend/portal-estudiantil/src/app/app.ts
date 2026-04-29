import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './headerComponent/headerComponent';
import { BodyComponent } from './bodyComponent/bodyComponent';
import { FooterComponent } from './footerComponent/footerComponent';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, BodyComponent, FooterComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('portal-estudiantil');
}
