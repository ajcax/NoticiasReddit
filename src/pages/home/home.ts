import { Component, NgZone } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { RedditService } from '../../app/services/reddit.service';
import firebase from 'firebase';
import { LoadingController } from 'ionic-angular';


@Component({
  selector: 'home',
  templateUrl: 'home.html'
})
export class HomePage {
  public userProfile;
  items: any;
  zone: NgZone;
  limitFinal: number;
  limit: number;

  constructor(public navCtrl: NavController, public navParams: NavParams, private redditService: RedditService,  public loadingCtrl: LoadingController) {

    this.zone = new NgZone({});
    firebase.auth().onAuthStateChanged( user => {
      this.zone.run( () => {
        if (user){
          this.userProfile = user;
        } else { 
          this.userProfile = null; 
        }
      });
    });

  }

  ngOnInit() {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.limitFinal = 50;
    this.limit = 10;
    this.getTops(this.limit);
    
  }

  presentLoading() {
    let loader = this.loadingCtrl.create({
      content: "Loading next 10...",
      duration: 3000
    });
    loader.present();
  }

  getTops(limit) {
    this.redditService.getTops(limit).subscribe(resp => {
      this.items = resp.data.children;
    })
  }

  doInfinite(infiniteScroll) {
    
    ;
      if (this.limit < this.limitFinal) {
        this.presentLoading()
        this.getTops(this.limit +=10);    
      }
      
      infiniteScroll.complete();

  }
}
