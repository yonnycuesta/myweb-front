import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ICategory } from '../interfaces/category';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private url = environment.apiURL;
  constructor(private http: HttpClient) {}

  all() {
    return this.http.get(`${this.url}/categories`);
  }

  store(data: ICategory) {
    return this.http.post<ICategory>(`${this.url}/categories`, data);
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/categories/${id}`);
  }

  update(id: number, data: ICategory) {
    return this.http.put<ICategory>(`${this.url}/categories/${id}`, data);
  }
}
