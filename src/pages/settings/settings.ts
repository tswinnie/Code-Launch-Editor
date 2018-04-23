import { SharedServiceProvider } from './../../providers/shared-service/shared-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ModalController, ViewController } from 'ionic-angular';
import * as editiorOptions from '../../editor-options/editor_options.json';
import { MonacoServiceProvider } from '../../providers/monaco-service/monaco-service';
import { EditorWindowProvider } from './../../providers/editor-window/editor-window';
import { DirectoryEntry, File, FileEntry } from '@ionic-native/file';

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
  public optionData : FormGroup;
  //  options: any[] = [];
   themes: any[] = [];
   wordWrapOptions: any[] = [];
   wordWrapColumnOptions: any[] = [];
  defaultOptions: any = {};
  userSetOptions: any = {};
  show: boolean = true;
   editorOptions: any;
  result = [];
 item = {};
 stringTheme: any;


  constructor(public navParams: NavParams, private formBuilder: FormBuilder, public viewCtrl: ViewController, public monaco: MonacoServiceProvider, public editor: EditorWindowProvider, public sharedService: SharedServiceProvider, public platform: Platform, public file: File ) {

          //get available user settings

            //create formgroup
            this.optionData = this.formBuilder.group({
            theme: [this.userSetOptions.theme, { onlySelf: true }], //set the default value to vs-light and not required *this is how I would set the saved user_setting option
            wordWrap: [this.userSetOptions.wordWrap],
            wordWrapMinified:[this.userSetOptions.wordWrapMinified],
            wrappingIndent: [this.userSetOptions.wrappingIndent],
            lineNumbers: [this.userSetOptions.lineNumbers],
            readOnly: [this.userSetOptions.readOnly],
            scrollBeyondLastLine: [this.userSetOptions.scrollBeyondLastLine],
            autoIndent:[this.userSetOptions.autoIndent],
            cursorBlinking: [this.userSetOptions.cursorBlinking],
            folding:[this.userSetOptions.folding],
            fontSize: [this.userSetOptions.fontSize],
            fontWeight: [this.userSetOptions.fontWeight],
            formatOnPaste: [this.userSetOptions.formatOnPaste],
            glyphMargin: [this.userSetOptions.glyphMargin],
            matchBrackets: [this.userSetOptions.matchBrackets],
            parameterHints: [this.userSetOptions.parameterHints],
            quickSuggestions: [this.userSetOptions.quickSuggestions],
            roundedSelection: [this.userSetOptions.roundedSelection],
            showFoldingControls:[this.userSetOptions.showFoldingControls],
            tabSize: [this.userSetOptions.tabSize],
            insertSpaces: [this.userSetOptions.insertSpaces],
            autoSave: [this.userSetOptions.autoSave],
            detectIndentation: [this.userSetOptions.detectIndentation],
            useTabStops: [this.userSetOptions.useTabStops],
            colorDecorators: [this.userSetOptions.colorDecorators]
          });

          //TODO create user_settings.json file to save whatever changes the user selects then write them to the
          //to the user_settings.json file, then set the default to whatever is set in user_settings.json file


          //get available settings data from settings.json file
          this.platform.ready().then(() => {
            this.file.readAsText(this.file.dataDirectory+"Settings", "settings.json")
              .then((data) =>{
                this.defaultOptions = JSON.parse(data);

              }).catch(error =>{
                console.log(error);
              });

          });
          this.platform.ready().then(() => {
              this.file.readAsText(this.file.dataDirectory+"Settings", "user_selected_settings.json")
              .then((data) =>{
                this.userSetOptions = JSON.parse(data);
                this.optionData.patchValue(this.userSetOptions);

              }).catch(error =>{
                console.log(error);
              });
        });


  }




  ionViewDidLoad() {

  }

  closeModal(){
    this.viewCtrl.dismiss();
  }

  updateSettings(){
    this.monaco.updateEditorOptions(this.optionData.value);
    this.viewCtrl.dismiss();
  }





}
