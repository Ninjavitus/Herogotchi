import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the NewgamePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-newgame',
  templateUrl: 'newgame.html'
})
export class NewgamePage {

    constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage) {
  }

  ionViewDidLoad() {
    console.log('this is the starter page');
  }

  // Assign a random Pet upon opening the pokeball. Add reveal animation in the future.
  randomPet() {
      var petChance = Math.round(Math.random() * 100) + 1;
      console.log(petChance);
  }

  // Sets the Pilot's gender and saves it. Then shows the sprite, then shows a clickable pokeball.
  setGender(sexe) {
      document.getElementById("pilotures").innerHTML = '<img id="pilotSprite" src= "../assets/img/pilots/' + sexe + '.png" style= "width: 200px; height: 200px; padding-top: 15px" /><br><h1 id="whitetext"><font face="BebasNeue">Open your pokeball</font></h1><br><img id="pokeBall" src= "../assets/img/pokeball.png" style= "width: 115px; height: 115px" (click)="randomPet()" />';
  }

}
