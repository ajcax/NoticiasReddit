import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { RedditService } from '../../app/services/reddit.service';


@Component({
  selector: 'home',
  templateUrl: 'home.html'
})
export class HomePage {
  public userProfile;
  items: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private redditService: RedditService) {
    this.userProfile = navParams.get("userProfile");
  }

  ngOnInit() {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getTops(50);
  }

  getTops(limit) {
    this.redditService.getTops(limit).subscribe(resp => {
      this.items = resp.data.children;
    })
  }

  doInfinite(infiniteScroll) {
    console.log('Begin async operation');
    setTimeout(() => {
      
    for (let i = 0; i < 10; i++) {
      this.items.push(this.items.length);      
    }
    
      console.log('Async operation has ended');
      infiniteScroll.complete();
    }, 500);
  }
}
