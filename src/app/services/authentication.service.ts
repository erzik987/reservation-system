import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_ENDPOINT } from '../constants';
import { firstValueFrom } from 'rxjs/internal/firstValueFrom';

interface AuthResponse {
  authenticated: boolean;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor(private http: HttpClient) {}

  public async login(credentials: { username: string; password: string }): Promise<boolean> {
    localStorage.setItem('authToken', credentials.password);
    return await this.isLoggedIn();
  }

  public logout() {
    localStorage.removeItem('authToken');
  }

  public async isLoggedIn(): Promise<boolean> {
    const token = localStorage.getItem('authToken');
    const url = `${API_ENDPOINT}/login`;
    try {
      return (await firstValueFrom(this.http.post<AuthResponse>(url, { token: token }))).authenticated;
    } catch (error) {
      console.error(error);
      alert('Chybné prihlasovacie údaje');
      return false;
    }
  }
}
