import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-content',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './content.component.html'
})
export class ContentComponent implements OnInit {
  api = inject(ApiService);
  contents: any[] = [];
  loading = true;
  
  newTitle = '';
  newBody = '';
  isAdding = false;

  ngOnInit() {
    this.loadContent();
  }

  loadContent() {
    this.api.getContent().subscribe({
      next: (data) => {
        this.contents = data;
        this.loading = false;
      },
      error: (err: any) => this.loading = false
    });
  }

  deleteContent(id: string) {
    if (confirm('Are you sure you want to delete this content?')) {
      this.api.deleteContent(id).subscribe({
        next: () => {
          this.contents = this.contents.filter(c => c._id !== id);
        },
        error: (err: any) => console.error(err)
      });
    }
  }

  addContent() {
    if (!this.newTitle || !this.newBody) return;
    
    this.api.createContent({ title: this.newTitle, body: this.newBody }).subscribe({
      next: (newItem: any) => {
        this.contents.push(newItem);
        this.newTitle = '';
        this.newBody = '';
        this.isAdding = false;
      },
      error: (err: any) => console.error(err)
    });
  }
}
