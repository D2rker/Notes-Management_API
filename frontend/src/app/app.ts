import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { getNotes } from './notes.api';
import { MakeNotesComponent } from './MakeNotes/makenotes';
import { GetNotesComponent } from './getNotes/getnotes';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, MakeNotesComponent, GetNotesComponent], 
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
  encapsulation: ViewEncapsulation.None
})
export class App implements OnInit {
  notes: any[] = [];

  activeTab = 'write';

  constructor() {}

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
    getNotes()
      .then((data: any) => {
        this.notes = data;
      })
      .catch((err: any) => console.error('Error fetching notes:', err));
  }
  
  onNoteCreated() {
    this.loadNotes();
    this.setActiveTab('list');
  }
}