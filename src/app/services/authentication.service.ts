import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthenticationService {
  user: Observable<firebase.User>;

  constructor(private auth: AngularFireAuth) { 
    this.user = auth.authState;
  }
  signup(email: string, password: string) {
    this.auth
      .auth
      .createUserWithEmailAndPassword(email, password)
      .then(value => {
        console.log('success', value);
        alert('success')
      })
      .catch(err => {
        console.log('wrong:', err.message);
        alert('wrong:'+ err.message)
      });
  }

  login(email: string, password: string) {
    this.auth
      .auth
      .signInWithEmailAndPassword(email, password)
      .then(value => {
        console.log('worked');
        alert('worked')
      })
      .catch(err => {
        console.log('wrong:', err.message);
        alert('wrong:'+ err.message)
      });
  }

  logout() {
    this.auth
      .auth
      .signOut();
  }


}
