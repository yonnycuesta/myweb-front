import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private url = environment.apiURL;
  constructor(private http: HttpClient) {}

  all() {
    return this.http.get(`${this.url}/categories`);
  }
}
