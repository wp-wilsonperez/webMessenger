import { Component, OnInit } from '@angular/core';
import {User} from '../interfaces/user';
import {UserService} from '../services/user.service';
import {AuthenticationService} from '../services/authentication.service';
import {AngularFireStorage} from 'angularfire2/storage';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: User;
  imageChangedEvent: any = '';
  croppedImage: any = '';
  picture: any = '';

  constructor(private userService: UserService, private authenticationService: AuthenticationService, private firebaseStorage: AngularFireStorage) {
    this.authenticationService.getStatus().subscribe( (status) => {
      this.userService.getUserById(status.uid).valueChanges().subscribe( (data: User) => {
        this.user = data;
      }, (error) => {
        console.log(error);
      });
    });
  }

  ngOnInit() {
  }
  saveSettings() {
    if (this.croppedImage) {
      const currentPictureId = Date.now();
      const pictures = this.firebaseStorage.ref('pictures/' + currentPictureId + '.jpg')
        .putString(this.croppedImage, 'data_url');
      pictures.then( (result) => {
        this.picture  = this.firebaseStorage.ref('pictures/' + currentPictureId + '.jpg').getDownloadURL();
        this.picture.subscribe( (p) => {
          this.userService.setAvatar(p, this.user.uid)
            .then( () => {
              alert('Imagen subida correctamente');
            })
            .catch( (error1) => {
              alert('error al subir');
              console.log(error1);
            });
        });
      })
        .catch( (error) => {
          console.log(error);
        });
    } else {
      this.userService.editUser(this.user).then( () => {
        alert('cambios Guardados');
      })
        .catch( (error) => {
          alert('existe error');
          console.log(error);
        });
    }

  }
  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }
  imageCropped(image: string) {
    this.croppedImage = image;
  }
  imageLoaded() {
    // show cropper
  }
  loadImageFailed() {
    // show message
  }

}
