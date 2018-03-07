import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ModalController, ViewController } from 'ionic-angular';
import * as editiorOptions from '../../editor-options/editor_options.json';
import { MonacoServiceProvider } from '../../providers/monaco-service/monaco-service';
/**
 * Generated class for the SettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {
  private optionData : FormGroup;
  //  options: any[] = [];
   results: any[] = [];
   themes: any[] = [];
   wordWrapOptions: any[] = [];
   wordWrapColumnOptions: any[] = [];
  defaultOptions: any;
  show: boolean = true;



  constructor(public navParams: NavParams, private formBuilder: FormBuilder, public viewCtrl: ViewController, public monaco: MonacoServiceProvider ) {
    this.optionData = this.formBuilder.group({
      themeName: ['']
    });

  this.defaultOptions = (<any>editiorOptions).theme;

  this.themes[0]  = this.defaultOptions;
  //set show check
  if(this.defaultOptions == "vs-light"){
    this.show = false;
  }

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
  }

  closeModal(){
    this.viewCtrl.dismiss();
  }

  updateSettings(){
    let themeChosen: string = this.optionData.value.themeName;
    this.monaco.updateEditorOptions(themeChosen);
    this.viewCtrl.dismiss();


  }

}
