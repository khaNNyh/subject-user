import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = 'https://63761992b5f0e1eb850298da.mockapi.io';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<any> {
    return this.http.get(`${this.baseUrl}/users`);
  }

  getUserComments(userId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/users/${userId}/user-comments`);
  }

  deleteUserComment(userId: string, commentId: string): Observable<any> {
    return this.http.delete(
      `${this.baseUrl}/users/${userId}/user-comments/${commentId}`
    );
  }
}
