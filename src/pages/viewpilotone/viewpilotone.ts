import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { HangarPage } from '../hangar/hangar';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ViewpilotonePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-viewpilotone',
  templateUrl: 'viewpilotone.html',
})
export class ViewpilotonePage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage) {
  }

  ionViewDidLoad() {
  setTimeout(() => {
  // Open pilot1 stats to get name and stuff
  this.storage.get('PilotOneStats').then((data) => {

  /* All stats and placeholder values listed out here. All values are strings.
  name: pilot, 
  gender: F/M, 
  sprite: ".png", 
  LVL: "1", 
  curEXP: "0", maxEXP: "50", 
  curVIT: "10", maxVIT: "10", 
  ATK: "8", 
  DEF: "6", 
  SPD: "6", 
  color: "red", 
  WEPS: "none", 
  
  curHUNGER: "8", maxHUNGER: "8", 
  curTHIRST: "6", maxTHIRST: "6", 
  status: "normal", 
  likes: "steaks", dislikes: "shrooms", 
  hobby: "napping" */

  // Turn pilot info into array for stats
  var pilot = JSON.parse(data);

  var pilotName = pilot["name"].toUpperCase(); //name

  // Calculate HP percentage based on current and max HP
  var pilotHP = (parseInt(pilot["curVIT"])) / (parseInt(pilot["maxVIT"]));
  var pilotPercentMath = (pilotHP * 100);
  var pilotPercent = pilotPercentMath.toString() + "%";

  // Calculate EXP percentage based on current and max EXP
  var pilotEXP = (parseInt(pilot["curEXP"])) / (parseInt(pilot["maxEXP"]));
  var pilotEXPercentMath = (pilotEXP * 100);
  var pilotEXPercent = pilotEXPercentMath.toString() + "%";
  var pilotEXPValue = pilot["curEXP"] + " / " + pilot["maxEXP"];

  // Used to create multiple <p>'s for ATK, DEF, etc.
  var pilotVIT = '<p id="pilotPageStats"><font color="#FF0000"><b>VIT</b></font> ' + pilot["curVIT"] + '/' + pilot["maxVIT"] + '</p><br>';
  var pilotATK = '<p id="pilotPageStats"><font color="#FFCC00"><b>ATK</b>&nbsp;&nbsp;&nbsp;</font>' + pilot["ATK"] + '</p><br>';
  var pilotDEF = '<p id="pilotPageStats"><font color="#00cd00"><b>DEF</b>&nbsp;&nbsp;&nbsp;</font>' + pilot["DEF"] + '</p><br>';
  var pilotSPD = '<p id="pilotPageStats"><font color="#007FFF"><b>SPD</b>&nbsp;&nbsp;&nbsp;</font>' + pilot["SPD"] + '</p><br>';

  // Set pilot likes/dislikes & hobbies
  var pilotLikes = '<p id="pilotPageRight">' + pilot["likes"] + '</p><br>';
  var pilotDislikes = '<p id="pilotPageRight">' + pilot["dislikes"] + '</p><br>'; 

  var pilotHobby = '<br><p id="pilotPageRight">' + pilot["hobby"] + '</p><br>'; 

  document.getElementById("whitetext").innerText = pilotName;

  // Set player stats on page
  document.getElementById("pilotStatsDiv").innerHTML = pilotVIT + pilotATK + pilotDEF + pilotSPD;
  document.getElementById("pilotRightStatsDiv").innerHTML = pilotLikes + pilotDislikes + pilotHobby;

  // Adjust div width based on EXP %
  document.getElementById("expDiv").innerHTML = '<div id="experienceBar" style="text-align:center; width:30%;"></div><p id="exptxt" style="font-size:10px; color:#FFFFFF; text-align:center;">' + pilotEXPValue + '&nbsp;&nbsp;( 10% )</p>';

  // Set pilot's image
  //var pilotImage = document.getElementById("pilotSprite") as HTMLImageElement;
  //pilotImage.src = '../assets/img/hangar/'+ pilot["gender"] + '.png';

    });
  }, 200);   
 }
}
