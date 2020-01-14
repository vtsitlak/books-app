import { Injectable } from '@angular/core';
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { Note } from '../model/note';


@Injectable()
export class NoteEntityService
    extends EntityCollectionServiceBase<Note> {

    constructor(
        serviceElementsFactory:
            EntityCollectionServiceElementsFactory) {

        super('Note', serviceElementsFactory);

    }

}

