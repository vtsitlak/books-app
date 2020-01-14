import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Note } from '../model/note';
import { Observable } from 'rxjs';
import { defaultDialogConfig } from '../shared/default-dialog-config';
import { EditNoteDialogComponent } from '../edit-note-dialog/edit-note-dialog.component';
import { MatDialog } from '@angular/material';
import { map } from 'rxjs/operators';
import { NoteEntityService } from '../services/note-entity.service';


@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {

  notes$: Observable<Note[]>;

  importantNotes$: Observable<Note[]>;

  constructor(
    private dialog: MatDialog,
    private notesService: NoteEntityService) {

  }

  ngOnInit() {
    this.reload();
  }

  reload() {

    this.notes$ = this.notesService.entities$;

    this.importantNotes$ = this.notesService.entities$
      .pipe(
        map(notes => notes.filter(note => note.important === true))
      );

  }

  onAddCourse() {

    const dialogConfig = defaultDialogConfig();

    dialogConfig.data = {
      dialogTitle: 'Create Note',
      mode: 'create'
    };

    this.dialog.open(EditNoteDialogComponent, dialogConfig);

  }


}
