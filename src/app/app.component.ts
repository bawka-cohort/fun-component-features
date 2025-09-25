import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink],
  template: `
  <p>Add your name to the url path to get to your component
  <ul>
    <li><a routerLink="/brian">Brian</a></li>
    <li><a routerLink="/angga">Angga</a></li>
    <li><a routerLink="/ady">Ady</a></li>
    <li><a routerLink="/will">Will</a></li>
    <li><a routerLink="/kevin">Kevin</a></li>
  </ul>
  <router-outlet></router-outlet>`,
  styles: ``
})
export class AppComponent {
  title = 'fun-component-features';
}
