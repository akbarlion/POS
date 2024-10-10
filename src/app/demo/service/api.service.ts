import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(
    private http: HttpClient
  ) { }


  get_category() {
    return new Promise<string>((resolve, reject) => {
      return this.http.get<string>(environment.url_dev + 'category').subscribe({
        next: (res) => resolve(res),
        error: (err) => reject(err)
      })
    })
  }

  get_outlet() {
    return new Promise<string>((resolve, reject) => {
      return this.http.get<string>(environment.url_dev + 'outlet').subscribe({
        next: (res) => resolve(res),
        error: (err) => reject(err)
      })
    })
  }
}
