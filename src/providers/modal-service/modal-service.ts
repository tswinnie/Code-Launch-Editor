import { ModalOptions } from 'ionic-angular/es2015';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ModalController, NavParams } from 'ionic-angular';
import { NewFilePage } from '../../pages/new-file/new-file';
import { SettingsPage } from '../../pages/settings/settings';
/*
  Generated class for the ModalServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ModalServiceProvider {

  constructor(public modalCtrl: ModalController) {

  }


  openNewFileModal(){
    //set modal options
    const modalOptions: ModalOptions = {
      enableBackdropDismiss: false,
      showBackdrop: false
    };

    //create modal
   const modal =  this.modalCtrl.create('NewFilePage', null, modalOptions);
   modal.present();
  }


  //open modal for settings
  openSettingsModal(){
    //set modal options
    const modalOptions: ModalOptions = {
      enableBackdropDismiss: false,
      showBackdrop: false
    };

    //create modal
   const modal =  this.modalCtrl.create('SettingsPage', null, modalOptions);
   modal.present();
  }

}
