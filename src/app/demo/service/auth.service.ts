import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

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

  login(params) {
    return new Promise<string>((resolve, reject) => {
      return this.http.post<string>(environment.url_dev + 'login', params, this.httpOptions).subscribe({
        next: (res) => resolve(res),
        error: (err) => reject(err)
      })
    })
  }

  logout() {
    localStorage.removeItem("_userInfo")
    localStorage.removeItem("_rolePerm")
    localStorage.removeItem("_loginStatus")
    // localStorage.setItem("_loginStatus", "false")
  }
}
