import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IService } from '../interfaces/service';

@Injectable({
  providedIn: 'root',
})
export class OwnService {
  private url = environment.apiURL;
  constructor(private http: HttpClient) {}

  all() {
    return this.http.get(`${this.url}/services`);
  }

  store(data: IService) {
    return this.http.post<IService>(`${this.url}/services`, data);
  }

  delete(id: string) {
    return this.http.delete(`${this.url}/services/${id}`);
  }

  update(id: string, data: IService) {
    return this.http.put<IService>(`${this.url}/services/${id}`, data);
  }
}
