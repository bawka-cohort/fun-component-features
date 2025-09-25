import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { SupabaseService } from '../../../services/supabase-service';
import { lastValueFrom, map, tap } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'login-component',
  imports: [
    FormsModule,
    RouterOutlet,
    RouterLink,
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
        <p class="mb-8 text-base text-gray-800 sm:text-sm">Welcome to Munch</p>

        <!-- Form -->
        <form [formGroup]="loginForm" (ngSubmit)="onLogin()" class="space-y-4">
          <input
            type="text"
            name="username"
            [(ngModel)]="user.username"
            placeholder="Username"
            required
            class="w-full rounded-full border border-gray-300 bg-white px-5 py-3 text-base focus:border-[#f8746c] focus:outline-none"
            formControlName="username"
          />

          <input
            type="password"
            name="password"
            [(ngModel)]="user.password"
            placeholder="Password"
            required
            class="w-full rounded-full border border-gray-300 bg-white px-5 py-3 text-base focus:border-[#f8746c] focus:outline-none"
            formControlName="password"
          />

          <!-- <button
            type="submit"
            [disabled]="loginForm.invalid"
            class="w-full rounded-full border border-[#f8746c] bg-[#f8746c]/20 px-5 py-3 text-base font-semibold text-[#f8746c] transition active:scale-95 disabled:opacity-50"
            routerLink="/landing"
            (click)="onLogin()"
          >
            Log In
          </button> -->

          @if(vm.signInResponse?.error?.code === "invalid_credentials") {
          <p class="text-red-600">
            Invalid username or password. Please try again.
          </p>
          }

          <!-- <button
            type="submit"
            [disabled]="loginForm.invalid"
            class="w-full rounded-full border border-[#f8746c] bg-[#f8746c]/20 px-5 py-3 text-base font-semibold text-[#f8746c] transition active:scale-95 disabled:opacity-50"
            (click)="onLogin()"
          >
            Log In
          </button> -->

          <button
            type="submit"
            [disabled]="loginForm.invalid"
            class="w-full rounded-full border border-[#f8746c] bg-[#f8746c]/20 px-5 py-3 text-base font-semibold text-[#f8746c] transition active:scale-95 disabled:opacity-50"
          >
            Log In
          </button>
        </form>

        <!-- Social Login -->
        <p class="mt-8 text-sm text-gray-700">
          <a routerLink="/signup">Create an account</a>
        </p>

         <p class="mt-8 text-sm text-gray-700">
          <a routerLink="/reset-link">Forgot your password?</a>
        </p>

        <p class="mt-8 text-sm text-gray-700">Log in using</p>
        <div class="mt-4 flex justify-center space-x-8 text-3xl">
          <!-- Replace with SVGs for real icons -->
          <span class="text-[#DB4437]">G</span>
          <span class="text-[#1877F2]">f</span>
          <span class="text-black"></span>
        </div>
      </div>
    </div>
    }

    <router-outlet></router-outlet>
  `,
  styles: ``,
})
export class LoginComponent {
  supabaseService = inject(SupabaseService);
  router = inject(Router)

  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  //AsyncValidator

  user = { username: '', password: '' };

  viewModel$ = this.supabaseService.signInResponse$.pipe(
    map((signInResponse) => ({
      signInResponse: signInResponse,
    })),
    tap((response) => console.log('login response: ', response))
  );

  async onLogin() {
    const response = await lastValueFrom(
      this.supabaseService.signIn(this.user.password, this.user.username)
    );

    if (response.error) {
      console.log('Login error: ', response.error);
    } else {
      this.router.navigate(['/landing']);
    }
  }
}
