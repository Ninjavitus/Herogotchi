import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { HomePage } from '../home/home';
import { ViewpilotonePage } from '../viewpilotone/viewpilotone';
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
              this.updateEnergy(gameInfo);
        });
      }, 200);   
  }

  statGame() {
      // Player stats
      var pilotOne = { name: "Nickolas", gender: "M", sprite: ".png", LVL: "1", curEXP: "22", maxEXP: "25", curVIT: "10", maxVIT: "10", ATK: "8", DEF: "6", SPD: "6", color: "red", WEPS: "none", curHUNGER: "8", maxHUNGER: "8", curTHIRST: "6", maxTHIRST: "6", status: "normal", likes: "steaks", dislikes: "shrooms", hobby: "napping" };

     // Give a new player their stats. Will be accessed later for it's values.
      this.storage.set('PilotOneStats', JSON.stringify(pilotOne));

      var gameInitSetup = { Time: this.updateTime(), curEnergy: "8", maxEnergy: "8", Pilot1: "Yes", Pilot2: "No", Pilot3: "No", PilotChange: "", Pet1: "Yes", Pet2: "No", Pet3: "No", PetChange: "" }

      var gameInfo = JSON.stringify(gameInitSetup);

      //Update stats
      this.storage.set('PlayerGameInfo', gameInfo);
  }

  updateTime(){
    // UTC Time. Resets day at 8 PM EST instead of midnight.
    var clientDate = new Date();
    var currentDay = clientDate.getUTCMonth().toString() + " " + clientDate.getUTCDate().toString() + " " + clientDate.getUTCHours().toString(); 

    return currentDay;
   }

   // Global energy for now
   updateEnergy(gameInfo){
      // Create an array with the last saved player date
      var oldDate = gameInfo["Time"].split(" ");
      var serverDate = this.updateTime();

      // Create an array with the current server time
      var currentDate = serverDate.split(" ");

      /*
      0 - Month (0 to 11)
      1 - Date Number (1 to 31)
      2 - Hour (0 to 23)
      */
    
    //1. Check if the current month is greater than the old month. If yes, update automatically.
    //2. Check if current date is more recent. If yes, update automatically.
    //3. if current Hour is greater than last saved Hour, then an hour has passed. Update energy.
    if (currentDate[0] > oldDate[0]){

      // Update energy & time
      gameInfo["curEnergy"] = gameInfo["maxEnergy"];
      gameInfo["Time"] = serverDate;
      this.storage.set('PlayerGameInfo', JSON.stringify(gameInfo));
      console.log("Energy updated. New month.");

    } else if (currentDate[1] > oldDate[1]){ 

      // Update energy & time
      gameInfo["curEnergy"] = gameInfo["maxEnergy"];
      gameInfo["Time"] = serverDate;
      this.storage.set('PlayerGameInfo', JSON.stringify(gameInfo));
      console.log("Energy updated. New day.");

      } else if (currentDate[2] > oldDate[2]){

      // Update energy & time
      gameInfo["curEnergy"] = gameInfo["maxEnergy"];
      gameInfo["Time"] = serverDate;
      this.storage.set('PlayerGameInfo', JSON.stringify(gameInfo));
      console.log("Energy updated. New hour.");

      } 
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

  viewPilot(num){
  // Check if player has a Pilot1, 2 and 3
  this.storage.get('PlayerGameInfo').then((data) => {

      var gameInfo = JSON.parse(data);
      var pilotNum = "Pilot" + num.toString();
      var pilot = gameInfo[pilotNum]; 

      // Check if player has a pilot in that slot. If no, send error message.
      if (num == 1){
        if(pilot == "Yes"){
           this.navCtrl.push(ViewpilotonePage);
          } else {
          document.getElementById("petError").innerText = "You don't have a pilot in that slot.";
          }
      } else if (num == 2){
        if(pilot == "Yes"){
           //this.navCtrl.push(ViewpilottwoPage);
          } else {
          document.getElementById("petError").innerText = "You don't have a pilot in that slot.";
          }
      } else if (num == 3){
        if(pilot == "Yes"){
          // this.navCtrl.push(ViewpilotthreePage);
          } else {
          document.getElementById("petError").innerText = "You don't have a pilot in that slot.";
          }
      }
    });
  }

  addNewPilot(slideNum) {
  var buttonID = "viewName" + slideNum;
      document.getElementById(buttonID).innerText = "VIEW "+ slideNum;
  }

ionViewWillLeave() {
  this.storage.get('PlayerGameInfo').then((data) => {

     var gameInfo = JSON.parse(data);
     this.updateEnergy(gameInfo);
 });
}

}
