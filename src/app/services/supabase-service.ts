import { Injectable } from '@angular/core';
import { createClient, Session, SupabaseClient } from '@supabase/supabase-js';
import { catchError, combineLatest, from, map, mergeMap, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  // supabaseUrl = 'https://gfwjmimavnsuhnpjcdci.supabase.co';
  // supabaseKey =
  //   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdmd2ptaW1hdm5zdWhucGpjZGNpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMzMTYxMDMsImV4cCI6MjA2ODg5MjEwM30.tVuqkkcsS4RRjZWlZ17_bRBx39I19O9C5TT5NoOVW84';
  // supabase = new SupabaseClient(this.supabaseUrl, this.supabaseKey);

  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(
      'https://gfwjmimavnsuhnpjcdci.supabase.co',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdmd2ptaW1hdm5zdWhucGpjZGNpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMzMTYxMDMsImV4cCI6MjA2ODg5MjEwM30.tVuqkkcsS4RRjZWlZ17_bRBx39I19O9C5TT5NoOVW84',
      {
        auth: {
          autoRefreshToken: true,
          persistSession: true,
          detectSessionInUrl: true,
          storage: localStorage,
        },
      }
    );
  }

  signUp(password: string, email: string) {
    console.log('I am in singnup supabase service');
    return combineLatest([of(password), of(email)]).pipe(
      mergeMap(([password, email]) => {
        console.log('I am calling the supabase auth signup');
        return this.supabase.auth.signUp({ email, password });
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
      tap((response) => console.log('response: ', response)),
      catchError((error) => {
        console.log('Error during sign-in:', error);
        throw error;
      })
    );
  }

  signOut() {
    return from(this.supabase.auth.signOut()).pipe(
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

  getUser() {
    return from(this.supabase.auth.getUser()).pipe(
      catchError((error) => {
        console.log('Error getting session:', error);
        throw error;
      })
    );
  }

  resetPassword(email: string) {
    return of(email).pipe(
      map((email) => {
        this.supabase.auth.resetPasswordForEmail(email);
      }),
      catchError((error) => {
        console.log('Error during reset password:', error);
        throw error;
      })
    );
  }

  // Google OAuth
  logInWithGoogle() {
    return this.supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: 'http://localhost:4200/landing', // must match Google + Supabase config
      },
    });
  }

  // Listen for auth state changes
  onAuthChange(callback: (event: string, session: Session | null) => void) {
    return this.supabase.auth.onAuthStateChange((event, session) => {
      callback(event, session);
    });
  }

  async getSessionAsync(): Promise<Session | null> {
    const {
      data: { session },
    } = await this.supabase.auth.getSession();
    return session;
  }
}
