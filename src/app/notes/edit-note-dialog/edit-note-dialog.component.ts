import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Note } from '../model/note';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { NoteEntityService } from '../services/note-entity.service';

@Component({
    selector: 'note-dialog',
    templateUrl: './edit-note-dialog.component.html',
    styleUrls: ['./edit-note-dialog.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditNoteDialogComponent {

    form: FormGroup;

    dialogTitle: string;

    note: Note;

    mode: 'create' | 'update';

    loading$: Observable<boolean>;

    constructor(
        private fb: FormBuilder,
        private dialogRef: MatDialogRef<EditNoteDialogComponent>,
        @Inject(MAT_DIALOG_DATA) data,
        private notesService: NoteEntityService) {

        this.dialogTitle = data.dialogTitle;
        this.note = data.note;
        this.mode = data.mode;

        const formControls = {
            title: ['', Validators.required],
            body: ['', Validators.required],
            important: [false, Validators.required],
        };

        if (this.mode === 'update') {
            this.form = this.fb.group(formControls);
            this.form.patchValue({ ...data.note });
        } else if (this.mode === 'create') {
            this.form = this.fb.group({
                ...formControls,
            });
        }
    }

    onClose() {
        this.dialogRef.close();
    }

    onSave() {

        const note: Note = {
            ...this.note,
            ...this.form.value
        };

        if (this.mode === 'update') {

            this.notesService.update(note);

            this.dialogRef.close();
        } else if (this.mode === 'create') {

            note.created = Date();

            this.notesService.add(note)
                .subscribe(
                    newNote => {

                        console.log('New Note', newNote);

                        this.dialogRef.close();

                    }
                );

        }


    }


}
