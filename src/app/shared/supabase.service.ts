import { Injectable } from '@angular/core';
import { createClient, SupabaseClient, Session } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
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

  // Sign in with Google
  async signInWithGoogle() {
    const { data, error } = await this.supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: 'http://localhost:4200/welcome', // adjust for your app
      },
    });
    if (error) throw error;
    return data;
  }

  // Get current session
  async getSession(): Promise<Session | null> {
    const {
      data: { session },
    } = await this.supabase.auth.getSession();
    return session;
  }

  // Listen for auth state changes
  onAuthChange(callback: (event: string, session: Session | null) => void) {
    return this.supabase.auth.onAuthStateChange((event, session) => {
      callback(event, session);
    });
  }

  // Sign out
  async signOut() {
    await this.supabase.auth.signOut();
  }
}
