import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { NewgamePage } from '../newgame/newgame';
import { NewpetPage } from '../newpet/newpet';
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
      var gameInitSetup = { NewGame: "Yes", Player1: "No", Player2: "No", Player3: "No", PlayerChange: "", Pet1: "No", Pet2: "No", Pet3: "No", PetChange: "" }

      var gameInfo = JSON.stringify(gameInitSetup);

      this.storage.set('PlayerGameInfo', gameInfo);
      this.storage.set('PlayerOneStats', 'null');
      this.storage.set('PlayerGender', 'null');
  }

   // Checks if the player has opened the app and/or made an account before.
  ionViewWillEnter() {

      this.storage.get('PlayerGameInfo').then((data) => {

           /* Check if new to game. Yes if new, No if not.*/
          var gameInfo = JSON.parse(data);

          if (gameInfo["NewGame"] == "Yes") {
              this.navCtrl.push(NewgamePage);
          }
          
      });
  }

  // Checks if the player is about to leave the page.
  ionViewDidLeave() {
  }

  // Checks if the player has opened the app and/or made an account before.
  checkIfNewToGame() {
      this.storage.get('PlayerGameInfo').then((data) => {
          document.getElementById("demotest").innerHTML = "You're new!"; 
      });
  }

}
