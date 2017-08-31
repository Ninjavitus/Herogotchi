import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { NewpetPage } from '../newpet/newpet';
import { HangarPage } from '../hangar/hangar';
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

    ionViewWillEnter() {

        this.storage.get('PlayerGameInfo').then((data) => {

            var gameInfo = JSON.parse(data);
            var oldPilotOne = gameInfo["Pilot1"]; // Check if he already has a pilot.

            if (oldPilotOne == "Yes") {
                this.navCtrl.push(NewpetPage);
            }

        });
    }

    updateOldPilotOne() {
        this.storage.get('PlayerGameInfo').then((data) => {

            var gameInfo = JSON.parse(data);
            gameInfo["Pilot1"] = "Yes";

            var gameInfoNew = JSON.stringify(gameInfo);

            this.storage.set('PlayerGameInfo', gameInfoNew);

        });
    }

    // Sets the Pilot's gender and saves it. Then shows the sprite, then shows a clickable pokeball.
    setGenderOne(sexe) {

        // Change displayed sprite. In the future, they'll get to choose what the base sprite is or get a random one.'
        document.getElementById("pilotures").innerHTML = '<img id="pilotSprite" src= "../assets/img/pilots/' + sexe + '.png" style= "width: 200px; height: 200px; padding-top: 15px" /><br>';

        // add button after they select a gender. Button changes based on gender. 1 for Male, 2 for Female
        if (sexe == "M") {
            // Give a new player their gender
            this.storage.set('PlayerGender', "M");
        } else {
            // Give a new player their gender
            this.storage.set('PlayerGender', "F");
        }
    }

    pilotOneNewStats() {
        setTimeout(() => {
                // Get stats
                this.storage.get('PilotOneStats').then((stats) => {

                    this.updateOldPilotOne();
                    document.getElementById("nextError").innerText = "Success!";
                });
                this.navCtrl.push(NewpetPage);
            }, 500);
    }

    petNextOne(pilotName) {

        if (pilotName.length >= 4) {

            var pilotUpper = pilotName.charAt(0).toUpperCase();
            var pilotRest = pilotName.slice(1);
            var pilot = pilotUpper + pilotRest;

            // Get player gender
            this.storage.get('PlayerGender').then((genderPilot) => {

                if (genderPilot == "M" || genderPilot == "F") {

                    // Object containing all the player stats. Turned to string to save the values, then turned back to object
                    var pilotOne = { name: pilot, gender: genderPilot, sprite: ".png", LVL: "1", curEXP: "0", maxEXP: "50", curVIT: "10", maxVIT: "10", ATK: "8", DEF: "6", SPD: "6", color: "red", WEPS: "none", curHUNGER: "8", maxHUNGER: "8", curTHIRST: "6", maxTHIRST: "6", status: "normal", likes: "steaks", dislikes: "shrooms", hobby: "napping" };

                    // Give a new player their stats. Will be accessed later for it's values.
                    this.storage.set('PilotOneStats', JSON.stringify(pilotOne));

                    this.pilotOneNewStats();

                } else {
                    document.getElementById("nextError").innerText = "You must select a gender.";
                }
            });
        }else {
            document.getElementById("nextError").innerText = "Your pilot's name must be 4 letters or longer.";
        }
    }
}
