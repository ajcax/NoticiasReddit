import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import firebase from 'firebase';
import { GooglePlus } from '@ionic-native/google-plus';
import { LoadingController } from 'ionic-angular';

import { HomePage } from '../home/home';


@Component({
  selector: 'login',
  templateUrl: 'login.html'
})
export class Login {

  constructor(public navCtrl: NavController, private googlePlus: GooglePlus, public loadingCtrl: LoadingController) {

  }

  presentLoading() {
    let loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 3000
    });
    loader.present();
  }

  loginUser(): void {

    this.googlePlus.login({
      'webClientId': '785712574179-ca1gqhggcu8kpiesp7votg95j3n20ia5.apps.googleusercontent.com',
      'offline': true
    }).then( res => {
      firebase.auth().signInWithCredential(firebase.auth.GoogleAuthProvider.credential(res.idToken))
        .then( success => {
          this.presentLoading();
          this.navCtrl.push(HomePage);
        })
        .catch( error => console.log("Firebase fail: " + JSON.stringify(error)));
      }).catch(err => console.error(err));
      
  }

}
