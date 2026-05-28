import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule], // Replaced RouterOutlet with FormsModule to enable ngModel
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  // Define the note object to hold our form data
  note = {
    title: '',
    content: ''
  };

  // Inject HttpClient to communicate with the Express backend
  constructor(private http: HttpClient) {}

  // Define the form submission handler
  onSubmit() {
    if (this.note.title && this.note.content) {
      this.http.post('http://localhost:3000/api/notes', this.note).subscribe({
        next: (response) => {
          console.log('Backend response:', response);
          alert('Note saved successfully!');
          // Clear the form fields after successful save
          this.note = { title: '', content: '' };
        },
        error: (error) => {
          console.error('Error saving note:', error);
          alert('Failed to save the note.');
        }
      });
    }
  }
}
