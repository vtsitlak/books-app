import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { AppState } from './reducers';
import { isLoggedIn, isLoggedOut } from './auth/auth.selectors';
import { login, logout } from './auth/auth.actions';
import { EntityDispatcherDefaultOptions } from '@ngrx/data';

/** Store stub */
class TestStore {
    // only interested in calls to store.dispatch()
    dispatch() { }
    select() { }
}

const defaultDispatcherOptions = new EntityDispatcherDefaultOptions();

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

    loading = true;

    isLoggedIn$: Observable<boolean>;

    isLoggedOut$: Observable<boolean>;

    constructor(private router: Router,
        private store: Store<AppState>) {

    }

    ngOnInit() {

        const userProfile = localStorage.getItem('user');

        if (userProfile) {
            this.store.dispatch(login({ user: JSON.parse(userProfile) }));
        }

        this.router.events.subscribe(event => {
            switch (true) {
                case event instanceof NavigationStart: {
                    this.loading = true;
                    break;
                }

                case event instanceof NavigationEnd:
                case event instanceof NavigationCancel:
                case event instanceof NavigationError: {
                    this.loading = false;
                    break;
                }
                default: {
                    break;
                }
            }
        });

        this.isLoggedIn$ = this.store
            .pipe(
                select(isLoggedIn)
            );

        this.isLoggedOut$ = this.store
            .pipe(
                select(isLoggedOut)
            );

    }

    logout() {

        this.store.dispatch(logout());

    }

}
