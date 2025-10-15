import { Component, OnInit } from '@angular/core';
import { SupabaseService } from '../../services/supabase-service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './landing-component.html',
})
export class LandingComponent implements OnInit {
  user: any = null;
  isMenuOpen: boolean = false;

  constructor(private supabase: SupabaseService, private router: Router) {}

  async ngOnInit() {
    const session = await this.supabase.getSessionAsync();
    this.user = session?.user ?? null;

    // Listen for auth state changes
    this.supabase.onAuthChange((_event, session) => {
      this.user = session?.user ?? null;
    });
  }

  async signOut() {
    await this.supabase.signOut();
    this.user = null;
    this.router.navigate(['/login']);
  }

  getProfileImage(user: any): string {
    let url = user.user_metadata.avatar_url;
    if (url.includes('googleusercontent.com') && !url.includes('=s')) {
      url += '?sz=100';
    }
    return url;
  }
}
