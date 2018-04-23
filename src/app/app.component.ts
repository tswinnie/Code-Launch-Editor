import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { File } from '@ionic-native/file';
import { EditorWindowProvider } from '../providers/editor-window/editor-window';
import * as editiorOptions from '../editor-options/editor_options.json';
import * as DefaultEditorSettings from '../editor-options/default_settings.json';



import { HomePage } from '../pages/home/home';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;
  options: any;
  defaultOptions: any;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public file: File, public editorWindow: EditorWindowProvider ) {
    //get options
    this.options = (<any>editiorOptions);
    //set default options
    this.defaultOptions = (<any>DefaultEditorSettings);

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      //check if settings directory exist
      this.file.checkDir(this.file.dataDirectory, "Settings")
      .then(() => {
        alert('settings directory exist already');
        return;
      })
      .catch((err) => {
        //directory does not exist and create directory
        this.editorWindow.createFolder(this.file.dataDirectory, "Settings");
        //create settings.json and create user_selected_settings.json file for storing all settings and user selected settings
          //pass settings options data to writefile service
          let optionsData = JSON.stringify(this.options);
          this.editorWindow.writeNewFile(this.file.dataDirectory, "Settings", "settings.json", optionsData);

          //create settings file to hold default and updated user settings
          let defaultData = JSON.stringify(this.defaultOptions);
          this.editorWindow.writeNewFile(this.file.dataDirectory, "Settings", "user_selected_settings.json", defaultData);

      });




    });

  }




}

