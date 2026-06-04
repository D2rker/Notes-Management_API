import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { createNote } from '../notes.api';

@Component({
  selector: 'app-makenotes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './makenotes.html'
})
export class MakeNotesComponent {
  note = {
    title: '',
    content: ''
  };
  
  @Output() noteCreated = new EventEmitter<void>();

  onSubmit() {
    if (this.note.title && this.note.content) {
      createNote(this.note)
        .then((response: any) => {
          console.log('Backend response:', response);
          alert('Note saved successfully!');
          this.note = { title: '', content: '' };
          this.noteCreated.emit(); // Tell the parent component to refresh the list
        }).catch((error: any) => {
          console.error('Error saving note:', error);
          alert('Error saving note. Please try again.');
        });
    } else {
      alert('Please fill in both the title and content fields.');
    }
  }
}