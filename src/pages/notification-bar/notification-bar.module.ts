import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NotificationBarPage } from './notification-bar';

@NgModule({
  declarations: [
    NotificationBarPage,
  ],
  imports: [
    IonicPageModule.forChild(NotificationBarPage),
  ],
})
export class NotificationBarPageModule {}
