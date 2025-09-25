import { Injectable } from '@angular/core';
import {
	SupabaseClient
} from '@supabase/supabase-js';
import {
	catchError,
	combineLatest,
	from,
	map,
	mergeMap,
	of,
	tap
} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  supabaseUrl = 'https://gfwjmimavnsuhnpjcdci.supabase.co';
  supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdmd2ptaW1hdm5zdWhucGpjZGNpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMzMTYxMDMsImV4cCI6MjA2ODg5MjEwM30.tVuqkkcsS4RRjZWlZ17_bRBx39I19O9C5TT5NoOVW84';
  supabase = new SupabaseClient(this.supabaseUrl, this.supabaseKey);

  signUp(password: string, email: string) {
		console.log('I am in singnup supabase service')
    return combineLatest([of(password), of(email)]).pipe(
      mergeMap(([password, email]) => {
				console.log('I am calling the supabase auth signup')
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
		)
  }

  resetPassword(email: string) {
    return of(email).pipe(
			map((email) => {
				this.supabase.auth.resetPasswordForEmail(email)
			}),
			catchError((error) => {
				console.log('Error during reset password:', error);
        throw error;
			})
		)
  }
}
