import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url = environment.apiURL;
  constructor(private http: HttpClient) {}

  store(data: any) {
    return this.http.post(`${this.url}/register`, data);
  }

  login(data: any) {
    return this.http.post(`${this.url}/login`, data);
  }
}
