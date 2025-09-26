import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { SupabaseService } from '../../../services/supabase-service';

@Component({
  selector: 'landing-component',
  imports: [RouterOutlet],
  template: `
    <p>You are logged in!</p>
    <p>Welcome to the landing page.</p>
    <button type="submit" (click)="onLogOut()">Logout</button>

    <router-outlet></router-outlet>
  `,
  styles: ``,
})
export class LandingComponent {
  supabaseService = inject(SupabaseService);
  router = inject(Router)
  
  onLogOut() {
    lastValueFrom(this.supabaseService.signOut());
    this.router.navigate(['/ady']);
  }
}
