import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Coffee } from '../coffee/coffee';


@Injectable({
  providedIn: 'root'
})
export class CoffeeService {

  private apiUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  getCoffees(): Observable<Coffee[]> {
    return this.http.get<Coffee[]>(`${this.apiUrl}`);
  }
}
