import { Component } from '@angular/core';
import { SupabaseService } from '../../../shared/supabase.service';

@Component({
  selector: 'app-login',
  // template: ` <button (click)="signIn()">Sign in with Google</button> `,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  constructor(private supabase: SupabaseService) {}

  async signIn() {
    try {
      await this.supabase.signInWithGoogle();
    } catch (err) {
      console.error('Login error:', err);
    }
  }
}
