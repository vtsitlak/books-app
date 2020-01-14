import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {NoteEntityService} from './note-entity.service';
import {filter, first, tap} from 'rxjs/operators';


@Injectable()
export class NotesResolver implements Resolve<boolean> {

    constructor(private notesService: NoteEntityService) {

    }

    resolve(route: ActivatedRouteSnapshot,
            state: RouterStateSnapshot): Observable<boolean> {

        return this.notesService.loaded$
            .pipe(
                tap(loaded => {
                    if (!loaded) {
                       this.notesService.getAll();
                    }
                }),
                filter(loaded => !!loaded),
                first()
            );

    }

}
