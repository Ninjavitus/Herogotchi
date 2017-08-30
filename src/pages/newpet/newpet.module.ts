import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewpetPage } from './newpet';

@NgModule({
  declarations: [
    NewpetPage,
  ],
  imports: [
    IonicPageModule.forChild(NewpetPage),
  ],
})
export class NewpetPageModule {}
