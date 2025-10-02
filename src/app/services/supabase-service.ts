import { Injectable } from '@angular/core';
import { SupabaseClient } from '@supabase/supabase-js';
import {
  BehaviorSubject,
  catchError,
  combineLatest,
  from,
  map,
  mergeMap,
  of,
  tap,
} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  supabaseUrl = 'https://gfwjmimavnsuhnpjcdci.supabase.co';
  supabaseKey =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdmd2ptaW1hdm5zdWhucGpjZGNpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMzMTYxMDMsImV4cCI6MjA2ODg5MjEwM30.tVuqkkcsS4RRjZWlZ17_bRBx39I19O9C5TT5NoOVW84';
  supabase = new SupabaseClient(this.supabaseUrl, this.supabaseKey);

  signInResponse = new BehaviorSubject<any>(null);
  signInResponse$ = this.signInResponse.asObservable();

  signUpResponse = new BehaviorSubject<any>(null);
  signUpResponse$ = this.signUpResponse.asObservable();

  resetLinkResponse = new BehaviorSubject<any>(null);
  resetLinkResponse$ = this.resetLinkResponse.asObservable();

  signOutResponse = new BehaviorSubject<any>(null);
  signOutResponse$ = this.signOutResponse.asObservable();

  resetPasswordResponse = new BehaviorSubject<any>(null);
  resetPasswordResponse$ = this.resetPasswordResponse.asObservable();

  signUp(password: string, email: string) {
    console.log('I am in signup supabase service');
    return combineLatest([of(password), of(email)]).pipe(
      mergeMap(([password, email]) => {
        console.log('I am calling the supabase auth signup');
        return this.supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: 'http://localhost:4200/login',
          },
        });
      }),
      tap((response) => console.log('response: ', response)),
      catchError((error) => {
        console.log('Error during sign-up:', error);
        throw error;
      })
    );
  }

  signIn(password: string, email: string) {
    return combineLatest([of(password), of(email)]).pipe(
      mergeMap(([password, email]) => {
        return this.supabase.auth.signInWithPassword({ email, password });
      }),
      tap((response) => {
        console.log('signIn response: ', response),
          this.signInResponse.next(response);
      }),
      catchError((error) => {
        console.log('Error during sign-in:', error);
        throw error;
      })
    );
  }

  signOut() {
    return from(this.supabase.auth.signOut()).pipe(
      tap((response) => {
        console.log('signOut response: ', response);
        this.signOutResponse.next(response);
      }),
      catchError((error) => {
        console.log('Error during sign-out:', error);
        throw error;
      })
    );
  }

  getSession() {
    return from(this.supabase.auth.getSession()).pipe(
      catchError((error) => {
        console.log('Error getting session:', error);
        throw error;
      })
    );
  }

  resetLink(email: string) {
    return of(email).pipe(
      map((email) => {
        return this.supabase.auth.resetPasswordForEmail(email, {
          redirectTo: 'http://localhost:4200/reset-password',
        });
      }),
      tap((response) => {
        console.log('reset link response: ', response);
        this.resetLinkResponse.next(response);
      }),
      catchError((error) => {
        console.log('Error during reset link:', error);
        throw error;
      })
    );
  }

  resetPassword(password: string) {
    return of(password).pipe(
      map((password) => {
        return this.supabase.auth.updateUser({ password });
      }),
      tap((response) => {
        console.log('reset password response: ', response);
        this.resetPasswordResponse.next(response);
      }),
      catchError((error) => {
        console.log('Error during reset password:', error);
        throw error;
      })
    );
  }
}
