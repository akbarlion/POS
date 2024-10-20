import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient
  ) { }

  login(params) {
    return new Promise<string>((resolve, reject) => {
      return this.http.post<string>(environment.url_dev + 'login', params).subscribe({
        next: (res) => resolve(res),
        error: (err) => reject(err)
      })
    })
  }

  logout() {
    localStorage.removeItem("_userInfo")
    localStorage.removeItem("_rolePerm")
    localStorage.setItem("_loginStatus", "false")
  }
}
