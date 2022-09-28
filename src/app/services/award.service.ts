import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IAward } from '../interfaces/award';

@Injectable({
  providedIn: 'root',
})
export class AwardService {
  private url = environment.apiURL;
  constructor(private http: HttpClient) {}

  all() {
    return this.http.get(`${this.url}/awards`);
  }

  store(data: IAward) {
    return this.http.post<IAward>(`${this.url}/awards`, data);
  }

  delete(id: string) {
    return this.http.delete(`${this.url}/awards/${id}`);
  }

  update(id: string, data: IAward) {
    return this.http.put<IAward>(`${this.url}/awards/${id}`, data);
  }
}
