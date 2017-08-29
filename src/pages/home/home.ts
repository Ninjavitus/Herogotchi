import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { NewgamePage } from '../newgame/newgame';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public storage: Storage) {

  }

  // Reset player NewToGame to null
  resetGame() {
      this.storage.set('NewToGame', 'null');
  }

   // Checks if the player has opened the app and/or made an account before.
  ionViewWillEnter() {
      this.storage.get('NewToGame').then((data) => {

          var nullornot = data.toString();

          console.log(nullornot);

          if (nullornot == "null") {
              this.navCtrl.push(NewgamePage);
          }
          
      });
  }

  // Checks if the player is about to leave the page.
  ionViewDidLeave() {
  }

  // Checks if the player has opened the app and/or made an account before.
  checkIfNewToGame() {
      this.storage.get('NewToGame').then((data) => {
          document.getElementById("demotest").innerHTML = "You're new!"; 
      });
  }

}
