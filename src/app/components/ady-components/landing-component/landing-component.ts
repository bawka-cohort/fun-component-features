import { Component, inject } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { SupabaseService } from '../../../services/supabase-service';
import { Router } from '@angular/router';

@Component({
  selector: 'landing-component',
  imports: [],
  template: `
    <p>You are logged in!</p>
    <p>Welcome to the landing page.</p>
    <button (click)="onLogOut()">Logout</button>
  `,
  styles: ``,
})
export class LandingComponent {
  supabaseService = inject(SupabaseService);
  router = inject(Router)
  
  onLogOut() {
    lastValueFrom(this.supabaseService.signOut());
    this.router.navigate(['/get-session']);
  }

}
