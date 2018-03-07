import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ModalServiceProvider } from './../../providers/modal-service/modal-service';


@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalService: ModalServiceProvider) {
  }

  openNewModal(){
    this.modalService.openNewFileModal();
  }

  openSettingsModal(){
    this.modalService.openSettingsModal();
  }



}
