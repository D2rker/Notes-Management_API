import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule], 
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App implements OnInit {
  note = {
    title: '',
    content: ''
  };
  
  notes: any[] = [];

  baseUrl = 'http://localhost:3000/api/';

  activeTab = 'write';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadNotes();
  }

  setActiveTab(tab: string) {
    this.activeTab = tab;
    if (tab === 'list') {
      this.loadNotes();
    }
  }

  loadNotes() {
    this.http.get<any[]>(`${this.baseUrl}notes`).subscribe({
      next: (data) => {
        this.notes = data;
      },
      error: (err) => console.error('Error fetching notes:', err)
    });
  }
  
  // Define the form submission handler
  onSubmit() {
    if (this.note.title && this.note.content) {
      this.http.post(`${this.baseUrl}notes`, this.note).subscribe({
        next: (response) => {
          console.log('Backend response:', response);
          alert('Note saved successfully!');
          this.note = { title: '', content: '' };
          this.loadNotes(); // Refresh the notes list
          this.setActiveTab('list'); // Automatically switch to the list tab
        },
        error: (error) => {
          console.error('Error saving note:', error);
          alert('Error saving note. Please try again.');
        }
      });
    } else {
      alert('Please fill in both the title and content fields.');
    }
  }
}