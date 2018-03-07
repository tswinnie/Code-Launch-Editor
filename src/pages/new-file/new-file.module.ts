import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewFilePage } from './new-file';

@NgModule({
  declarations: [
    NewFilePage,
  ],
  imports: [
    IonicPageModule.forChild(NewFilePage),
  ],
})
export class NewFilePageModule {}
