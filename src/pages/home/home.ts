import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { NewgamePage } from '../newgame/newgame';
import { NewpetPage } from '../newpet/newpet';
import { HangarPage } from '../hangar/hangar';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public storage: Storage) {

  }

  // Reset player NewToGame to null
  startGame() {
      var gameInitSetup = { Pilot1: "No", Pilot2: "No", Pilot3: "No", PilotChange: "", Pet1: "No", Pet2: "No", Pet3: "No", PetChange: "" }

      var gameInfo = JSON.stringify(gameInitSetup);

      this.storage.set('PlayerGameInfo', gameInfo); // Sets basic game info for tracking. Not Player stats.
      this.storage.set('PilotOneStats', 'null'); // Resets player stats to null.
      this.storage.set('NewGame', 'First'); // Yes if new to game, No if not, null if first time playing
      this.navCtrl.push(NewgamePage); // Switches the page to start the game.
  }

   // Checks if the player has opened the app and/or made an account before.
  ionViewWillEnter() {

      this.storage.get('NewGame').then((newToGame) => {

          // Check if null (first time ever playing)
          if (newToGame == null){
            // Do nothing. Wait for the player to click start.
          } else if(newToGame == "First") { 
            // If First, then he already started a character but never finished. Send him to pilot creation. 
            // If he already has a character, it will automatically send him to pet creation.
              this.navCtrl.push(NewgamePage);
          } else {
            // If not null, then he already has an account. Send him to hangar. 
              this.navCtrl.push(HangarPage);          
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
