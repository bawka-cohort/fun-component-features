import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  template: ` <!-- <p>Add your name to the url path to get to your component
  <ul>
    <li><a href="http://localhost:4200/brian">Brian</a></li>
    <li><a href="http://localhost:4200/angga">Angga</a></li>
    <li><a href="http://localhost:4200/ady">Ady</a></li>
    <li><a href="http://localhost:4200/will">Will</a></li>
    <li><a href="http://localhost:4200/kevin">Kevin</a></li>
  </ul> -->
    <router-outlet></router-outlet>`,
  styles: ``,
})
export class AppComponent {
  title = 'fun-component-features';
}
