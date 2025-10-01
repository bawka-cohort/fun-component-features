import { Component, OnInit } from '@angular/core';
import { SupabaseService } from '../../../shared/supabase.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="user; else loading">
      <h2>
        <img
          [src]="getProfileImage(user)"
          alt="Profile picture"
          width="40"
          height="40"
          style="border-radius: 50%; vertical-align: middle; margin-right: 8px"
        />
        Welcome, {{ user.user_metadata.full_name || user.email }}
      </h2>
      <button (click)="signOut()">Sign Out</button>
    </div>
    <ng-template #loading>
      <p>Loading user...</p>
    </ng-template>
  `,
})
export class WelcomeComponent implements OnInit {
  user: any = null;

  constructor(
    private supabase: SupabaseService,
    private router: Router // ✅ inject Angular Router
  ) {}

  async ngOnInit() {
    const session = await this.supabase.getSession();
    this.user = session?.user ?? null;

    // Listen for auth state changes
    this.supabase.onAuthChange((_event, session) => {
      this.user = session?.user ?? null;
    });
  }

  async signOut() {
    await this.supabase.signOut();
    this.user = null;

    // ✅ Redirect to /login
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
