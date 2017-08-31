import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicStorageModule } from '@ionic/storage';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { NewgamePage } from '../pages/newgame/newgame';
import { NewpetPage } from '../pages/newpet/newpet';
import { HangarPage } from '../pages/hangar/hangar';
import { ViewpilotonePage } from '../pages/viewpilotone/viewpilotone';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    NewgamePage,
    NewpetPage,
    HangarPage,
    ViewpilotonePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    NewgamePage,
    NewpetPage,
    HangarPage,
    ViewpilotonePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    Storage
  ]
})
export class AppModule {}
