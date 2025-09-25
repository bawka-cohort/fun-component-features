import { Routes } from '@angular/router';
import { AdyComponent } from './components/ady-components/ady-component';
import { AnggaComponent } from './components/angga-components/angga-component';
import { BrianComponent } from './components/brian-components/brian-component';
import { KevinComponent } from './components/kevin-components/kevin-component';
import { WillComponent } from './components/will-components/will-component';
import { SignupComponent } from './components/ady-components/signup-component/signup-component';
import { LoginComponent } from './components/ady-components/login-component/login-component';
import { LandingComponent } from './components/ady-components/landing-component/landing-component';
import { sessionResolver } from './resolvers/resolvers';
import { GetSessionComponent } from './components/ady-components/get-session-component/get-session-component';
import { ResetLinkComponent } from './components/ady-components/reset-link-component/reset-link-component';
import { ResetPasswordComponent } from './components/ady-components/reset-password-component/reset-password-component';

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
    path: 'reset-link',
    component: ResetLinkComponent,
  },
  {
    path: 'reset-password',
    component: ResetPasswordComponent,
  },

  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'get-session',
    component: GetSessionComponent,
    resolve: {
      session: sessionResolver
    }
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
