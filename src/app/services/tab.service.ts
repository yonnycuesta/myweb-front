import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ITab } from '../interfaces/tab';

@Injectable({
  providedIn: 'root',
})
export class TabService {
  private url = environment.apiURL;
  constructor(private http: HttpClient) {}

  all() {
    return this.http.get(`${this.url}/tabs`);
  }

  store(data: ITab) {
    return this.http.post<ITab>(`${this.url}/tabs`, data);
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/tabs/${id}`);
  }

  update(id: number, data: ITab) {
    return this.http.put<ITab>(`${this.url}/tabs/${id}`, data);
  }
}
