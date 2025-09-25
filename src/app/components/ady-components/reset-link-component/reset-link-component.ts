import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
    FormControl,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';
import { lastValueFrom, map, tap } from 'rxjs';
import { SupabaseService } from '../../../services/supabase-service';

@Component({
  selector: 'reset-link-component',
  imports: [
    FormsModule,
    RouterOutlet,
    AsyncPipe,
    ReactiveFormsModule,
  ],
  template: `
    @if (viewModel$ | async; as vm) {
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
        <p class="mb-8 text-base text-gray-800 sm:text-sm">Reset your password</p>

        <!-- Form -->
        <form [formGroup]="resetForm" (ngSubmit)="onResetLink()" class="space-y-4">
          <input
            type="text"
            name="username"
            [(ngModel)]="user.username"
            placeholder="Username"
            required
            class="w-full rounded-full border border-gray-300 bg-white px-5 py-3 text-base focus:border-[#f8746c] focus:outline-none"
            formControlName="username"
          />

          <button
            type="submit"
            [disabled]="resetForm.invalid"
            class="w-full rounded-full border border-[#f8746c] bg-[#f8746c]/20 px-5 py-3 text-base font-semibold text-[#f8746c] transition active:scale-95 disabled:opacity-50"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
    }

    <router-outlet></router-outlet>
  `,
  styles: ``,
})
export class ResetLinkComponent {
  supabaseService = inject(SupabaseService);
  router = inject(Router)

  resetForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.email]),
  });

  user = { username: ''};

  viewModel$ = this.supabaseService.resetLinkResponse$.pipe(
    map((response) => ({
      response: response,
    })),
    tap((response) => console.log('reset password response: ', response))
  );

  async onResetLink() {
    const response = await lastValueFrom(
      this.supabaseService.resetLink(this.user.username)
    );

    if (response.error) {
      console.log('Login error: ', response.error);
    } else {
      this.router.navigate(['/login']);
    }
  }
}
