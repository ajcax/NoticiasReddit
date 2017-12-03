import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import firebase from 'firebase';

import { RedditService } from '../app/services/reddit.service';

import { Login } from '../pages/login/login';



@Component({
  templateUrl: 'app.html',
  providers: [ RedditService ]
})
export class MyApp {
  rootPage:any = Login;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {

    // init config of firebase
    firebase.initializeApp({
      apiKey: "AIzaSyDDkiCjQ3yfiwzrCtM6saxcmOnbENM006Y",
      authDomain: "testreddit-e68c6.firebaseapp.com",
      databaseURL: "https://testreddit-e68c6.firebaseio.com",
      projectId: "testreddit-e68c6",
      storageBucket: "testreddit-e68c6.appspot.com",
      messagingSenderId: "785712574179"
    });

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.

      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}

