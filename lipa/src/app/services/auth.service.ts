import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { createClient, SupabaseClient, } from '@supabase/supabase-js'
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:5300/lipa';
  private registerUserUrl = 'https://aidnxywieovjglfrcwty.supabase.co/functions/v1/signup';
  private loginUserUrl = 'https://aidnxywieovjglfrcwty.supabase.co/functions/v1/login';
  private supabase: SupabaseClient

  constructor(private http: HttpClient) {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey)
  }

  //signup
  register(userData: { firstName: string, lastName: string, userEmail: string, userName: string, password: string }): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post(this.registerUserUrl, userData, { headers }).pipe(
      catchError((error) => {
        if (error.status === 409) {
          return throwError(() => new Error(error.error?.error || 'User with the same email already exists'));
        }
        return throwError(() => new Error('Network error. Please try again later.'));
      })
    );


  }

  //login
  login(loginData: { userEmail: string, password: string }): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post(this.loginUserUrl, loginData, { headers }).pipe(
      catchError((error) => {
        if (error.status === 401) {
          return throwError(() => new Error('Invalid email or password'));
        }
        return throwError(() => new Error('Network error. Please try again later.'));
      })
    );
  }



  //get users
  async getUsers() {
    const { data, error } = await this.supabase.functions.invoke('hello-world');
    
    if (error) {
      console.error('Error fetching users:', error.message);
      throw error;  
    }
    return data;
  }
}
