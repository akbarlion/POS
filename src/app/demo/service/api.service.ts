import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  httpOptions =
    {
      headers: new HttpHeaders
        ({
          'X-API-POS': 'P0s$#!341'
        }),
    };

  constructor(
    private http: HttpClient
  ) { }


  get_invoices() {
    return new Promise<string>((resolve, reject) => {
      return this.http.get<string>(environment.url_dev + 'invoices', this.httpOptions).subscribe({
        next: (res) => resolve(res),
        error: (err) => reject(err)
      })
    })
  }

  get_invoices_user() {
    return new Promise<string>((resolve, reject) => {
      return this.http.get<string>(environment.url_dev + 'invoices-user', this.httpOptions).subscribe({
        next: (res) => resolve(res),
        error: (err) => reject(err)
      })
    })
  }

  get_category() {
    return new Promise<string>((resolve, reject) => {
      return this.http.get<string>(environment.url_dev + 'category', this.httpOptions).subscribe({
        next: (res) => resolve(res),
        error: (err) => reject(err)
      })
    })
  }

  get_outlet() {
    return new Promise<string>((resolve, reject) => {
      return this.http.get<string>(environment.url_dev + 'outlet', this.httpOptions).subscribe({
        next: (res) => resolve(res),
        error: (err) => reject(err)
      })
    })
  }


  upload_post(param) {
    return new Promise<string>((resolve, reject) => {
      return this.http.post<string>(environment.url_dev + 'upload', param, this.httpOptions).subscribe({
        next: (res) => resolve(res),
        error: (err) => reject(err)
      })
    })
  }

  invoices_post(param) {
    return new Promise<string>((resolve, reject) => {
      return this.http.post<string>(environment.url_dev + 'select-invoices', param, this.httpOptions).subscribe({
        next: (res) => resolve(res),
        error: (err) => reject(err)
      })
    })
  }

  invoicesUser_post(param) {
    return new Promise<string>((resolve, reject) => {
      return this.http.post<string>(environment.url_dev + 'select-invoices-user', param, this.httpOptions).subscribe({
        next: (res) => resolve(res),
        error: (err) => reject(err)
      })
    })
  }

  uploadUser_post(param) {
    return new Promise<string>((resolve, reject) => {
      return this.http.post<string>(environment.url_dev + 'upload-user', param, this.httpOptions).subscribe({
        next: (res) => resolve(res),
        error: (err) => reject(err)
      })
    })
  }

  countToday_post() {
    return new Promise<string>((resolve, reject) => {
      return this.http.get<string>(environment.url_dev + 'count-today', this.httpOptions).subscribe({
        next: (res) => resolve(res),
        error: (err) => reject(err)
      })
    })
  }

  users_get() {
    return new Promise<string>((resolve, reject) => {
      return this.http.get<string>(environment.url_dev + 'users', this.httpOptions).subscribe({
        next: (res) => resolve(res),
        error: (err) => reject(err)
      })
    })
  }

  role_get() {
    return new Promise<string>((resolve, reject) => {
      return this.http.get<string>(environment.url_dev + 'role-list', this.httpOptions).subscribe({
        next: (res) => resolve(res),
        error: (err) => reject(err)
      })
    })
  }

  insertUser_post(param) {
    return new Promise<string>((resolve, reject) => {
      return this.http.post<string>(environment.url_dev + 'insert-user', param, this.httpOptions).subscribe({
        next: (res) => resolve(res),
        error: (err) => reject(err)
      })
    })
  }

  updateUser_post(param) {
    return new Promise<string>((resolve, reject) => {
      return this.http.post<string>(environment.url_dev + 'update-user', param, this.httpOptions).subscribe({
        next: (res) => resolve(res),
        error: (err) => reject(err)
      })
    })
  }

  deleteUser_post(param) {
    return new Promise<string>((resolve, reject) => {
      return this.http.post<string>(environment.url_dev + 'delete-user', param, this.httpOptions).subscribe({
        next: (res) => resolve(res),
        error: (err) => reject(err)
      })
    })
  }

  deleteInvoiceAdmin_post(param) {
    return new Promise<string>((resolve, reject) => {
      return this.http.post<string>(environment.url_dev + 'delete-invoice-admin', param, this.httpOptions).subscribe({
        next: (res) => resolve(res),
        error: (err) => reject(err)
      })
    })
  }




}
