import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  private authTokenSubject = new BehaviorSubject<string | null>(null);
  private readonly AUTH_TOKEN_KEY = 'authToken';
  private apiUrl = "https://backendapp.kitandasmart.com"; // Base URL from environment config

  constructor(private http: HttpClient) { }

  /**
   * Send a magic token to the provided email address
   * @param email The email address to send the magic token to
   * @returns An Observable containing the response message
   */
  sendMagicToken(email: string): Observable<string> {
    // Create HttpParams to send as URL parameters
    const params = new HttpParams().set('email', email);

    // Make POST request to the endpoint
    return this.http.post(`${this.apiUrl}/send-token`, null, {
      params,
      responseType: 'text'
    });
  }

  login(token: string): Observable<any> {
    // Replace with your backend API URL
    return this.http.post(`${this.apiUrl}/login?token=${token}`, {});

  }
  public storeToken(token: string): void {
    localStorage.setItem(this.AUTH_TOKEN_KEY, token);
  }

  // Get token for interceptor
  getToken(): string | null {
    return localStorage.getItem(this.AUTH_TOKEN_KEY);
  }

  // Observable for components to subscribe to token changes
  get authToken$(): Observable<string | null> {
    return this.authTokenSubject.asObservable();
  }

  // Remove token during logout
  logout(): void {
    localStorage.removeItem(this.AUTH_TOKEN_KEY);
    this.authTokenSubject.next(null);
    window.location.reload();
  }

  // Method to check if the user is logged in
  isLoggedIn(): boolean {
    const token = this.getToken();

    if (!token) {
      return false;  // No token means the user is not logged in
    }

    // Optionally, add logic here to check if the token is expired
    // For example, decode the JWT token and check its expiration date (if using JWT)
    const decodedToken = this.decodeToken(token);
    if (decodedToken && decodedToken.exp && decodedToken.exp < Date.now() / 1000) {
      return false;  // Token is expired
    }
    console.log("TENHO O TOKEN");
    return true;  // Token exists and is valid
  }

  // Optional: Decoding the token (if it's a JWT)
  private decodeToken(token: string): any {
    try {
      const payload = token.split('.')[1];
      return JSON.parse(atob(payload));  // Decode the token payload
    } catch (error) {
      console.error('Invalid token', error);
      return null;
    }
  }
}
