import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { HomePage } from '../home/home';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the NewpetPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-newpet',
  templateUrl: 'newpet.html',
})
export class NewpetPage {

    constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage) {
    }

    ionViewWillEnter() {

        this.storage.get('PlayerGameInfo').then((data) => {

            //var gameInfo = JSON.parse(data);
           // var oldPetOne = gameInfo["Pet1"]; // Check if he already has a pet in slow 1. Used later

        });
    }

    updateOldPetOne() {
        this.storage.get('PlayerGameInfo').then((data) => {

            var gameInfo = JSON.parse(data);
            gameInfo["Pet1"] = "Yes";
            gameInfo["NewGame"] = "No";

            var gameInfoNew = JSON.stringify(gameInfo);

            this.storage.set('PlayerGameInfo', gameInfoNew);

        });
    }

    // Assign a random Pet upon opening the pokeball. Add reveal animation in the future.
    randomPetOne(petName) {
        var petChance = Math.round(Math.random() * 100) + 1;

        if (petName.length >= 4) {

            if (petChance <= 29) {    //30% chance to get Bulbasaur
                var petOne = { name: "BULBASAUR", gender: "M", sprite: "1", LVL: "1", curEXP: "0", maxEXP: "50", curVIT: "10", maxVIT: "10", ATK: "8", DEF: "6", SPD: "6", color: "red", PROF: "none", curHUNGER: "8", maxHUNGER: "8", curTHIRST: "6", maxTHIRST: "6", status: "normal", likes: "steaks", dislikes: "shrooms", hobby: "napping" };
            }
            else if (petChance >= 30 && petChance <= 59) {    //30% chance to get Charmander
                var petOne = { name: "CHARMANDER", gender: "M", sprite: "2", LVL: "1", curEXP: "0", maxEXP: "50", curVIT: "10", maxVIT: "10", ATK: "8", DEF: "6", SPD: "6", color: "red", PROF: "none", curHUNGER: "8", maxHUNGER: "8", curTHIRST: "6", maxTHIRST: "6", status: "normal", likes: "steaks", dislikes: "shrooms", hobby: "napping" };
            }
            else if (petChance >= 60 && petChance <= 89) {    //30% chance to get Mudkips
                var petOne = { name: "MUDKIPZ", gender: "M", sprite: "3", LVL: "1", curEXP: "0", maxEXP: "50", curVIT: "10", maxVIT: "10", ATK: "8", DEF: "6", SPD: "6", color: "red", PROF: "none", curHUNGER: "8", maxHUNGER: "8", curTHIRST: "6", maxTHIRST: "6", status: "normal", likes: "steaks", dislikes: "shrooms", hobby: "napping" };
            }
            else if (petChance >= 90 && petChance <= 99) {    //9% chance to get Poliwhirl
                var petOne = { name: "POLIWHIRL", gender: "M", sprite: "4", LVL: "1", curEXP: "0", maxEXP: "50", curVIT: "10", maxVIT: "10", ATK: "8", DEF: "6", SPD: "6", color: "red", PROF: "none", curHUNGER: "8", maxHUNGER: "8", curTHIRST: "6", maxTHIRST: "6", status: "normal", likes: "steaks", dislikes: "shrooms", hobby: "napping" };
            }
            else {    //1% chance to get Plusle
                var petOne = { name: "PLUSLE", gender: "M", sprite: "5", LVL: "1", curEXP: "0", maxEXP: "50", curVIT: "10", maxVIT: "10", ATK: "8", DEF: "6", SPD: "6", color: "red", PROF: "none", curHUNGER: "8", maxHUNGER: "8", curTHIRST: "6", maxTHIRST: "6", status: "normal", likes: "steaks", dislikes: "shrooms", hobby: "napping" };
            }

            document.getElementById("petpictures").innerHTML = '<img id="pilotSprite" src= "../assets/img/pets/' + petOne["sprite"] + '.png" style="width: 200px; height: 200px; padding-top: 15px" /><br>';
            document.getElementById("petError").innerText = "You've received "+ petOne["name"] + "!";

            this.storage.set('PetOneStats', JSON.stringify(petOne));
        } else {
            document.getElementById("petError").innerText = "Your pet's name must be 4 letters or longer.";
        }
    }

    petNewStats() {
        setTimeout(() => {
            // Get stats
            this.storage.get('PetOneStats').then((stats) => {

                //var player1 = JSON.parse(stats);
                this.updateOldPetOne();
                document.getElementById("petError").innerText = "Success!";
            });
            this.navCtrl.push(HomePage);
        }, 500);
    }

    setPetName(petOne, petName) {
        petOne["name"] = petName;

        this.storage.set('PetOneStats', JSON.stringify(petOne));
    }

    petNextOne(petName) {

        if (petName.length >= 4) {

            var petUpper = petName.charAt(0).toUpperCase();
            var petRest = petName.slice(1);
            var pet = petUpper + petRest;

            // Get player stats
            this.storage.get('PetOneStats').then((stats) => {

                var pet1 = JSON.parse(stats);

                this.setPetName(pet1, pet);
                this.petNewStats();
            });
        } else {
            document.getElementById("petError").innerText = "Your pet's name must be 4 letters or longer.";
        }
    }
}
