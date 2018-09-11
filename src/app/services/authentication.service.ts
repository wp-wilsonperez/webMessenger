import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor( private angularFireAuth: AngularFireAuth) { }

  loginWithEmail(email: string, password: string) {
    return this.angularFireAuth.auth.signInWithEmailAndPassword(email, password);
  }
  registerWithEmail(email: string, password: string) {
    return this.angularFireAuth.auth.createUserWithEmailAndPassword(email, password);
  }
  getStatus() {
    return this.angularFireAuth.authState;
  }
  logOut() {
    return this.angularFireAuth.auth.signOut();
  }
  facebookLogin () {
    const provider = new firebase.auth.FacebookAuthProvider();
    return this.angularFireAuth.auth.signInWithPopup(provider);
  }
}
