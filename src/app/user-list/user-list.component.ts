import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserService } from '../rest.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  users$ = new BehaviorSubject<any[]>([]);
  selectedUser$ = new BehaviorSubject<any | null>(null);
  userComments$ = new BehaviorSubject<any[]>([]);

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe((data) => {
      this.users$.next(data);
    });
  }

  selectUser(user: any): void {
    this.selectedUser$.next(user);
    this.loadUserComments(user.id);
  }

  loadUserComments(userId: string): void {
    this.userService.getUserComments(userId).subscribe((data) => {
      this.userComments$.next(data);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  deleteComment(commentId: string): void {
    const selectedUser = this.selectedUser$.getValue();
    if (selectedUser) {
      this.userService
        .deleteUserComment(selectedUser.id, commentId)
        .subscribe(() => {
          this.loadUserComments(selectedUser.id);
        });
    }
  }

  closePanel(): void {
    this.selectedUser$.next(null);
    this.userComments$.next([]);
  }
}
