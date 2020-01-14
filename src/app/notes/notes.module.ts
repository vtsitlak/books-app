import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { NotesTableListComponent } from './notes-table-list/notes-table-list.component';
import { EditNoteDialogComponent } from './edit-note-dialog/edit-note-dialog.component';
import { NotesHttpService } from './services/notes-http.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { ReactiveFormsModule } from '@angular/forms';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule, Routes } from '@angular/router';
import { EntityDataService, EntityDefinitionService, EntityMetadataMap } from '@ngrx/data';
import { compareNotes, Note } from './model/note';

import { NoteEntityService } from './services/note-entity.service';
import { NotesResolver } from './services/notes.resolver';
import { NotesDataService } from './services/notes-data.service';
import { MatTooltipModule } from '@angular/material';

export const notesRoutes: Routes = [
    {
        path: '',
        component: HomeComponent,
        resolve: {
            notes: NotesResolver
        }
    },
    {
        path: 'search',
        component: HomeComponent,
        resolve: {
            notes: NotesResolver
        }
    },
];

const entityMetadata: EntityMetadataMap = {
    Note: {
        sortComparer: compareNotes,
        entityDispatcherOptions: {
            optimisticUpdate: true
        }
    },
};


@NgModule({
    imports: [
        CommonModule,
        MatButtonModule,
        MatIconModule,
        MatCardModule,
        MatTabsModule,
        MatInputModule,
        MatTableModule,
        MatTooltipModule,
        MatPaginatorModule,
        MatSortModule,
        MatProgressSpinnerModule,
        MatSlideToggleModule,
        MatDialogModule,
        MatSelectModule,
        MatDatepickerModule,
        MatMomentDateModule,
        ReactiveFormsModule,
        RouterModule.forChild(notesRoutes)
    ],
    declarations: [
        HomeComponent,
        NotesTableListComponent,
        EditNoteDialogComponent,
    ],
    exports: [
        HomeComponent,
        NotesTableListComponent,
        EditNoteDialogComponent,
    ],
    entryComponents: [EditNoteDialogComponent],
    providers: [
        NotesHttpService,
        NoteEntityService,
        NotesResolver,
        NotesDataService
    ]
})
export class NotesModule {

    constructor(
        private eds: EntityDefinitionService,
        private entityDataService: EntityDataService,
        private notesDataService: NotesDataService) {

        eds.registerMetadataMap(entityMetadata);

        entityDataService.registerService('Note', notesDataService);

    }


}
