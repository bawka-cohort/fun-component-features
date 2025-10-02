import { inject } from "@angular/core";
import { ResolveFn } from "@angular/router";
import { Observable } from "rxjs";
import { SupabaseService } from "../services/supabase-service";


type SessionResponseResolver = ResolveFn<Observable<any | undefined>>;
export const sessionResolver: SessionResponseResolver = () => {
  console.log('Resolving session data...');
  return inject(SupabaseService).getSession();
};