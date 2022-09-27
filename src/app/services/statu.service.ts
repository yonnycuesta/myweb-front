import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IStatu } from '../interfaces/statu';

@Injectable({
  providedIn: 'root',
})
export class StatuService {
  private url = environment.apiURL;
  constructor(private http: HttpClient) {}

  all() {
    return this.http.get(`${this.url}/status`);
  }

  store(data: IStatu) {
    return this.http.post<IStatu>(`${this.url}/status`, data);
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/status/${id}`);
  }

  update(id: number, data: IStatu) {
    return this.http.put<IStatu>(`${this.url}/status/${id}`, data);
  }
}
