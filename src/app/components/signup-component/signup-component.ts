import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { SupabaseService } from '../../../services/supabase-service';
import { lastValueFrom } from 'rxjs';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'signup-component',
  imports: [CommonModule, FormsModule, RouterLink],
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
          Create your account
        </p>

        <!-- Form -->
        <form #signupForm="ngForm" class="space-y-4">
          <input
            type="email"
            name="username"
            [(ngModel)]="user.username"
            #username="ngModel"
            email
            placeholder="Username"
            required
            class="w-full rounded-full border border-gray-300 bg-white px-5 py-3 text-base focus:border-[#f8746c] focus:outline-none"
          />

          <div class="text-sm text-red-600 mt-1" *ngIf="username.invalid && (username.dirty || username.touched || signupForm.submitted)">
            <div *ngIf="username.errors?.['required']">Email is required.</div>
            <div *ngIf="username.errors?.['email']">Please enter a valid email address.</div>
          </div>

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
            [disabled]="signupForm.invalid"
            class="w-full rounded-full border border-[#f8746c] bg-[#f8746c]/20 px-5 py-3 text-base font-semibold text-[#f8746c] transition active:scale-95 disabled:opacity-50"
            routerLink="/login"
            (click)="onSignUp()"
          > Sign Up
          </button>
        </form>
      </div>
    </div>
  `,
  styles: ``,
})
export class SignupComponent {
  supabaseService = inject(SupabaseService)

  user = { username: '', password: '' };

  onSignUp() {
    console.log('I am in onSignUp')
   lastValueFrom(this.supabaseService.signUp(this.user.password, this.user.username))
  }

}
