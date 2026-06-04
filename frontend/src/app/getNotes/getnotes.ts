import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { updateNote, deleteNote as apiDeleteNote } from '../notes.api';

@Component({
  selector: 'app-getnotes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './getnotes.html'
})
export class GetNotesComponent {
  @Input() notes: any[] = [];
  @Output() notesChanged = new EventEmitter<void>();

  editingNoteId: string | null = null;
  editNoteData = { title: '', content: '' };

  deleteNote(id: string) {
    if (!id) {
      alert('Error: Note ID is missing.');
      return;
    }
    if (confirm('Are you sure you want to delete this note?')) {
      const previousNotes = [...this.notes];
      this.notesChanged.emit();
      apiDeleteNote(id)
        .catch((err: any) => {
          this.notes = previousNotes;
          console.error('Error deleting note:', err);
          alert('Failed to delete note. Check console for details.');
        });
    }
  }

  startEdit(note: any) {
    this.editingNoteId = note.id || note._id;
    this.editNoteData = { title: note.title, content: note.content };
  }

  cancelEdit() {
    this.editingNoteId = null;
  }

  saveEdit() {
    if (this.editingNoteId) {
      updateNote(this.editingNoteId, this.editNoteData)
        .then(() => {
          this.editingNoteId = null;
          this.notesChanged.emit(); // Tell the parent component to refresh the list
        })
        .catch((err: any) => {
          console.error('Error updating note:', err);
          alert('Failed to save edit. Check console for details.');
        });
    }
  }
}