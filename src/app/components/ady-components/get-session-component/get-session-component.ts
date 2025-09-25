import { Component, inject } from '@angular/core';
import { SupabaseService } from '../../../services/supabase-service';
import { map, tap } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { LandingComponent } from '../landing-component/landing-component';
import { LoginComponent } from '../login-component/login-component';

@Component({
  selector: 'get-session-component',
  imports: [AsyncPipe, LandingComponent, LoginComponent],
  template: `
    @if (viewModel$ | async; as vm) {
     @if (vm.display['session'].data.session !== null) {
      <landing-component></landing-component>
     } @else {
      <login-component></login-component>   
     }
    }
  `,
  styles: ``,
})
export class GetSessionComponent {
  activatedRoute = inject(ActivatedRoute);
  supabaseService = inject(SupabaseService);

  route$ = this.activatedRoute.data;

  viewModel$ = this.route$.pipe(
    map((routeData) => ({ display: routeData})),
    tap((routeData) => console.log('session response: ', routeData))
  );
}
