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


  get_invoices() {
    return new Promise<string>((resolve, reject) => {
      return this.http.get<string>(environment.url_dev + 'invoices').subscribe({
        next: (res) => resolve(res),
        error: (err) => reject(err)
      })
    })
  }

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


  upload_post(param) {
    return new Promise<string>((resolve, reject) => {
      return this.http.post<string>(environment.url_dev + 'upload', param).subscribe({
        next: (res) => resolve(res),
        error: (err) => reject(err)
      })
    })
  }

  invoices_post(param) {
    return new Promise<string>((resolve, reject) => {
      return this.http.post<string>(environment.url_dev + 'select-invoices', param).subscribe({
        next: (res) => resolve(res),
        error: (err) => reject(err)
      })
    })
  }

  invoicesUser_post(param) {
    return new Promise<string>((resolve, reject) => {
      return this.http.post<string>(environment.url_dev + 'select-invoices-user', param).subscribe({
        next: (res) => resolve(res),
        error: (err) => reject(err)
      })
    })
  }

  uploadUser_post(param) {
    return new Promise<string>((resolve, reject) => {
      return this.http.post<string>(environment.url_dev + 'upload-user', param).subscribe({
        next: (res) => resolve(res),
        error: (err) => reject(err)
      })
    })
  }

  countToday_post() {
    return new Promise<string>((resolve, reject) => {
      return this.http.get<string>(environment.url_dev + 'count-today').subscribe({
        next: (res) => resolve(res),
        error: (err) => reject(err)
      })
    })
  }


}
