import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({providedIn: 'root'})
export class ApiService {
    constructor(private http: HttpClient) {}

    get(path: string, options?: any) {
        return this.http.get(environment.api_url + path, options);
    }

    post(path: string, options?: any) {
        return this.http.post(environment.api_url + path, options);
    }

    patch(path: string, body?: any, options?: any) {
        return this.http.patch(environment.api_url + path, body, options);
    }
}