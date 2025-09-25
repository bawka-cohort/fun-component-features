import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterOutlet } from '@angular/router';
import { SupabaseService } from '../../services/supabase-service';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'login-component',
  imports: [FormsModule, RouterOutlet, RouterLink],
  template: `
    <div
      class="flex min-h-screen items-center justify-center bg-[#fff7f2] px-6"
    >
      <div class="w-full max-w-xs sm:max-w-sm text-center">
        <!-- Logo Circle with Bite -->
        <div
          class="relative mx-auto mb-8 flex h-28 w-28 items-center justify-center rounded-full bg-[#ff7b7b] shadow-md"
        >
          <span class="text-lg font-semibold text-white">munch</span>
          <!-- Bite cutout -->
          <div
            class="absolute right-[-12px] top-5 h-10 w-10 rounded-full bg-[#fff7f2]"
          ></div>
        </div>

        <!-- Subtitle -->
        <p class="mb-8 text-base text-gray-800 sm:text-sm">
          Welcome to Munch
        </p>

        <!-- Form -->
        <form (ngSubmit)="onLogin()" #loginForm="ngForm" class="space-y-4">
          <input
            type="text"
            name="username"
            [(ngModel)]="user.username"
            placeholder="Username"
            required
            class="w-full rounded-full border border-gray-300 bg-white px-5 py-3 text-base focus:border-[#f8746c] focus:outline-none"
          />

          <input
            type="password"
            name="password"
            [(ngModel)]="user.password"
            placeholder="Password"
            required
            class="w-full rounded-full border border-gray-300 bg-white px-5 py-3 text-base focus:border-[#f8746c] focus:outline-none"
          />

          <button
            type="submit"
            [disabled]="loginForm.invalid"
            class="w-full rounded-full border border-[#f8746c] bg-[#f8746c]/20 px-5 py-3 text-base font-semibold text-[#f8746c] transition active:scale-95 disabled:opacity-50"
            routerLink="/landing"
          >
            Log In
          </button>
        </form>

        <!-- Social Login -->
        <p class="mt-8 text-sm text-gray-700"><a routerLink="/signup">Create an account</a></p>

        <p class="mt-8 text-sm text-gray-700">Log in using</p>
        <div class="mt-4 flex justify-center space-x-8 text-3xl">
          <!-- Replace with SVGs for real icons -->
          <span class="text-[#DB4437]">G</span>
          <span class="text-[#1877F2]">f</span>
          <span class="text-black"></span>
        </div>
      </div>
    </div>
    <router-outlet></router-outlet>
  `,
  styles: ``,
})
export class LoginComponent {
  supabaseService = inject(SupabaseService)

  user = { username: '', password: '' };

  onLogin() {
    lastValueFrom(this.supabaseService.signIn(this.user.password, this.user.username))
  }
}
