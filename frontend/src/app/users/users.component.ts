import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './users.component.html'
})
export class UsersComponent implements OnInit {
  api = inject(ApiService);
  users: any[] = [];
  loading = true;
  
  // Pagination
  currentPage = 1;
  pageSize = 5;
  totalUsers = 0;

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.loading = true;
    this.api.getUsers().subscribe({
      next: (data) => {
        this.users = data;
        this.totalUsers = data.length;
        this.loading = false;
      },
      error: (err: any) => {
        this.loading = false;
      }
    });
  }

  get paginatedUsers() {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.users.slice(start, start + this.pageSize);
  }

  deleteUser(id: string) {
    if (confirm('Are you sure you want to delete this user? This action is permanent.')) {
      this.api.deleteUser(id).subscribe(() => {
        this.users = this.users.filter(u => u._id !== id);
        this.totalUsers = this.users.length;
      });
    }
  }

  toggleActive(user: any) {
    this.api.updateUser(user._id, { isActive: !user.isActive }).subscribe(updated => {
      user.isActive = updated.isActive;
    });
  }

  changeRole(user: any, role: string) {
    this.api.updateUser(user._id, { role }).subscribe(updated => {
      user.role = updated.role;
    });
  }
}
