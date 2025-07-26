import { Routes } from '@angular/router';
import { AdyComponent } from './components/ady-components/ady-component';
import { AnggaComponent } from './components/angga-components/angga-component';
import { BrianComponent } from './components/brian-components/brian-component';
import { KevinComponent } from './components/kevin-components/kevin-component';
import { WillComponent } from './components/will-components/will-component';

export const routes: Routes = [
  {
    path: 'ady',
    component: AdyComponent,
  },
  {
    path: 'angga',
    component: AnggaComponent,
  },
  {
    path: 'brian',
    component: BrianComponent,
  },
  {
    path: 'kevin',
    component: KevinComponent,
  },
  {
    path: 'will',
    component: WillComponent,
  }
];
