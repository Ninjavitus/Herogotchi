import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { HomePage } from '../home/home';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the HangarPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-hangar',
  templateUrl: 'hangar.html',
})
export class HangarPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage) {
  }

  ionViewDidLoad() {
      setTimeout(() => {
      // Check if player has a Pilot1, 2 and 3
        this.storage.get('PlayerGameInfo').then((data) => {

            var gameInfo = JSON.parse(data);
            var pilot1 = gameInfo["Pilot1"]; 
            var pilot2 = gameInfo["Pilot2"]; 
            var pilot3 = gameInfo["Pilot3"]; 

            // Check if player already has a 1st pilot.
            if (pilot1 == "Yes") {
            // Open pilot1 stats to get name and stuff
             this.storage.get('PilotOneStats').then((data1) => {
             var pilotInfo1 = JSON.parse(data1);
             var pilotName1 = pilotInfo1["name"].toUpperCase();
             document.getElementById("viewName1").innerText = "VIEW "+ pilotName1;
             var pilotImage = document.getElementById("pilotNew1") as HTMLImageElement;
             pilotImage.src = '../assets/img/hangar/'+ pilotInfo1["gender"] + '.png';
              });
             }

            // Check if player already has a 2nd pilot.
            if (pilot2 == "Yes") {
            // Open pilot1 stats to get name and stuff
             this.storage.get('PilotTwoStats').then((data2) => {
             var pilotInfo2 = JSON.parse(data2);
             var pilotName2 = pilotInfo2["name"].toUpperCase();
             document.getElementById("viewName2").innerText = "VIEW "+ pilotName2;
              });
             }

            // Check if player already has a 3rd pilot.
            if (pilot3 == "Yes") {
            // Open pilot1 stats to get name and stuff
             this.storage.get('PilotThreeStats').then((data3) => {
             var pilotInfo3 = JSON.parse(data3);
             var pilotName3 = pilotInfo3["name"].toUpperCase();
             document.getElementById("viewName3").innerText = "VIEW "+ pilotName3;
              });
             }
        });
      }, 500);   
  }

    // Reset player stats to null
  resetGame() {
      var gameInitSetup = { Player1: "No", Player2: "No", Player3: "No", PlayerChange: "", Pet1: "No", Pet2: "No", Pet3: "No", PetChange: "" }

      var gameInfo = JSON.stringify(gameInitSetup);

      this.storage.set('PlayerGameInfo', gameInfo); // Sets basic game info for tracking. Not Player stats.
      this.storage.set('PilotOneStats', 'null'); // Resets player stats to null.
      this.storage.set('NewGame', null); // Yes if new to game, No if not, null if first time playing
      this.navCtrl.push(HomePage); // Switches the page to start the game.
  }

  addNewPilot(slideNum) {
  var buttonID = "viewName" + slideNum;
      document.getElementById(buttonID).innerText = "VIEW "+ slideNum;
  }

}
