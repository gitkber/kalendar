import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import { RouterService } from './router.service';

@Injectable()
export class AuthService {

    public loginError: Error;
    // public user: Observable<firebase.User>;
    public authState: any = null;

    constructor(
        private afAuth: AngularFireAuth,
        private db: AngularFireDatabase,
        private routerService: RouterService
    ) {
        this.afAuth.authState.subscribe((auth) => {
            this.authState = auth
        });
    }

    // Returns true if user is logged in
    get authenticated(): boolean {
        return this.authState !== null;
    }

    // Returns current user data
    get currentUser(): any {
        return this.authenticated ? this.authState : null;
    }

    // Returns
    get currentUserObservable(): any {
        return this.afAuth.authState
    }

    // Returns current user UID
    get currentUserId(): string {
        return this.authenticated ? this.authState.uid : '';
    }

    // Returns current user display name or Guest
    get currentUserDisplayName(): string {
        if (!this.authState) { return 'Guest' }
        return this.authState['displayName'] || 'User without a Name';
    }

    //// Email/Password Auth ////

    emailSignUp(email: string, password: string) {
        return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
            .then((user) => {
                this.authState = user
                this.updateUserData()
            })
            .catch(error => console.log(error));
    }

    emailLogin(email: string, password: string) {
        return this.afAuth.auth.signInWithEmailAndPassword(email, password)
            .then((user) => {
                this.loginError = undefined;
                this.authState = user;
                this.routerService.navigateToDay();
                // this.updateUserData()
            })
            .catch(error => {
                console.log(error);
                this.loginError = error;
            });
    }

    // Sends email allowing user to reset password
    resetPassword(email: string) {
        const auth = firebase.auth();

        return auth.sendPasswordResetEmail(email)
            .then(() => console.log('email sent'))
            .catch((error) => console.log(error))
    }

    //// Sign Out ////

    signOut(): void {
        this.afAuth.auth.signOut().then(success => {
            console.log('signOut', success);
            localStorage.clear();
        }).catch(error => {
            console.error('error', error);
        });
        this.routerService.navigateToHome();
    }

    //// Helpers ////

    private updateUserData(): void {
        // Writes user name and email to realtime db
        // useful if your app displays information about users or for admin features

        // https://firebase.google.com/docs/auth/web/manage-users

        const path = `users/${this.currentUserId}`; // Endpoint on firebase
        const data = {
            email: this.authState.email,
            name: this.authState.displayName
        };

        this.db.object(path).update(data)
            .catch(error => console.log(error));

    }

}
