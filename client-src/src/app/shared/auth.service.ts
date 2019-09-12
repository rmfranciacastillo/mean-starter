import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AuthService {

  configUrl: string;

  constructor(private http: HttpClient) {
    this.configUrl = 'https://jsonplaceholder.typicode.com/todos/1';
  }

  getConfig() {
    return this.http.get(this.configUrl);
  }
}
