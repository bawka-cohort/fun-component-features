import { Routes } from '@angular/router';
import { AdyComponent } from './components/ady-components/ady-component';
import { AnggaComponent } from './components/angga-components/angga-component';
import { BrianComponent } from './components/brian-components/brian-component';
import { KevinComponent } from './components/kevin-components/kevin-component';
import { WillComponent } from './components/will-components/will-component';
import { SignupComponent } from './components/signup-component/signup-component';
import { LoginComponent } from './components/login-component/login-component';
import { LandingComponent } from './components/landing-component/landing-component';

export const routes: Routes = [
  {
    path: 'ady',
    component: AdyComponent,
  },
  {
    path: 'signup',
    component: SignupComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'landing',
    component: LandingComponent,
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
