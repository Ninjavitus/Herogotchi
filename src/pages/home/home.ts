import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public storage: Storage) {

  }

  // Checks if the player has opened the app and/or made an account before.
  checkIfNewToGame2() {
      this.storage.set('NewToGame', 'Yes');
  }

  // Checks if the player has opened the app and/or made an account before.
  checkIfNewToGame() {
      this.storage.get('NewToGame').then((data) => {
          document.getElementById("demotest").innerHTML = "You're new!"; 
      });
  }

}
