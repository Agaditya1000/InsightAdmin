import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {
  api = inject(ApiService);
  user: any = null;
  message = '';
  isError = false;

  ngOnInit() {
    this.api.getProfile().subscribe(u => this.user = u);
  }

  save() {
    this.api.updateProfile({ name: this.user.name, email: this.user.email }).subscribe({
      next: (u) => {
        this.user = u;
        this.message = 'Profile updated successfully!';
        this.isError = false;
        setTimeout(() => this.message = '', 3000);
      },
      error: (err: any) => {
        this.message = err.error?.msg || 'Failed to update profile';
        this.isError = true;
      }
    });
  }
}
