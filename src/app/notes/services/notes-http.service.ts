import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Note } from '../model/note';
import { map } from 'rxjs/operators';


@Injectable()
export class NotesHttpService {

    constructor(private http: HttpClient) {

    }

    findAllNotes(): Observable<Note[]> {
        return this.http.get('/api/notes')
            .pipe(
                map((notes: Note[]) => notes)
            );
    }

    findNoteByUrl(noteId: string): Observable<Note> {
        return this.http.get<Note>(`/api/notes/${noteId}`);
    }


    saveNote(noteId: string | number, changes: Partial<Note>) {
        return this.http.put('/api/notes/' + noteId, changes);
    }


}
