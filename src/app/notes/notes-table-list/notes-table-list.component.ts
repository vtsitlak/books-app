import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewChild, OnChanges } from '@angular/core';
import { Note } from '../model/note';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { EditNoteDialogComponent } from '../edit-note-dialog/edit-note-dialog.component';
import { defaultDialogConfig } from '../shared/default-dialog-config';
import { NoteEntityService } from '../services/note-entity.service';

@Component({
  selector: 'notes-table-list',
  templateUrl: './notes-table-list.component.html',
  styleUrls: ['./notes-table-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('detailExpand', [
      state('collapsed, void', style({ height: '0px' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
      transition('expanded <=> void', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)'))
    ]),
  ],
})
export class NotesTableListComponent implements OnChanges {

  @Input()
  notes: Note[];

  @Output()
  noteChanged = new EventEmitter();

  columnsToDisplay = ['title', 'created', 'important'];
  expandedNote: Note | null;
  label = {
    title: 'Title',
    created: 'Date Created',
    important: '',
  };

  dataSource: MatTableDataSource<Note>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private dialog: MatDialog,
    private noteService: NoteEntityService) {
  }

  ngOnChanges() {
    this.dataSource = new MatTableDataSource(this.notes);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    // custom filter, search only on Title column
    this.dataSource.filterPredicate =
      (note: Note, filters: string) => {
        const matchFilter = [];
        const filterArray = filters.split(',');
        const columns = [note.title];
        filterArray.forEach(filter => {
          const customFilter = [];
          columns.forEach(column => customFilter.push(column.toLowerCase().includes(filter)));
          matchFilter.push(customFilter.some(Boolean));
        });
        return matchFilter.every(Boolean);
      }
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  editCourse(note: Note) {

    const dialogConfig = defaultDialogConfig();

    dialogConfig.data = {
      dialogTitle: 'Edit Note',
      note,
      mode: 'update'
    };

    this.dialog.open(EditNoteDialogComponent, dialogConfig)
      .afterClosed()
      .subscribe(() => this.noteChanged.emit());

  }

  onDeleteCourse(note: Note) {

    this.noteService.delete(note)
      .subscribe(
        () => console.log('Delete completed'),
        err => console.log('Deleted failed', err)
      );


  }

}









