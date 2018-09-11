import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../services/authentication.service';
import {User} from '../interfaces/user';
import { UserService } from '../services/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  operation = 'login';
  email: string = null;
  password: string = null;
  nick: string = null;
  constructor( private authenticationService: AuthenticationService, private userService: UserService, private router: Router) { }

  ngOnInit() {
  }
  login() {
    this.authenticationService.loginWithEmail(this.email, this.password)
      .then( (data) => {
        this.router.navigate(['home']);
        console.log(data);
      })
      .catch( (error) => {
        console.log(error);
      });
  }
  register() {
    this.authenticationService.registerWithEmail(this.email, this.password)
      .then( (data) => {
        const user = {
          uid: data.user.uid,
          email: this.email,
          nick: this.nick
        };
        this.userService.createUser(user)
        .then( (dataUser) => {
          console.log(dataUser);
          this.router.navigate(['home']);
        })
        .catch( (error2) => {
          console.log(error2);
        });
      })
      .catch( (error) => {
        console.log(error);
      });
  }
  loginFacebook () {
    this.authenticationService.facebookLogin()
      .then( (data) => {
        console.log(data);

        if (data.additionalUserInfo.isNewUser) {
          const user: User = {
            nick: data.additionalUserInfo.profile['first_name'] + ' ' + data.additionalUserInfo.profile['last_name'],
            uid: data.user.uid,
            email: data.additionalUserInfo.profile['email']
          };
          this.userService.createUser(user).then( (dataUser) => {
             this.router.navigate(['home']);
          }).catch( (errorUser) => {
            console.log(errorUser);
          });
        } else {
           this.router.navigate(['home']);
        }
        console.log(data);
      }).catch( (error) => {
        console.log(error);
    });
  }

}
