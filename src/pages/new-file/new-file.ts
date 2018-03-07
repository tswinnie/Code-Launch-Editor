import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ModalController, ViewController } from 'ionic-angular';
import { MonacoServiceProvider } from '../../providers/monaco-service/monaco-service';
import { EditorWindowProvider } from '../../providers/editor-window/editor-window';

/**
 * Generated class for the NewFilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-new-file',
  templateUrl: 'new-file.html',
})
export class NewFilePage {
  private fileData : FormGroup;

  constructor(public navParams: NavParams, private formBuilder: FormBuilder, public viewCtrl: ViewController, public editorWindow: EditorWindowProvider) {
    this.fileData = this.formBuilder.group({
      fileName: ['', Validators.required]
    });
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad NewFilePage');
  }

  createFile(){
    //get new file
    let fileName: string = this.fileData.value.fileName;
    //close modal
    this.viewCtrl.dismiss();
   let fileExtension: string = this.getFileType(fileName);
    //pass fileNme to tabInit
    this.editorWindow.tabInit(fileName, fileExtension);

  }

  //detect file type when user does not provide one
     getFileType(fileName){
      if ( fileName.indexOf(".") > -1 ) {
        var result = fileName.substring(fileName.lastIndexOf(".") + 1);
        if(result == "js"){

          //set result = javascript
          result = "javascript";
        }
        if(result == "ts"){

          //set result = javascript
          result = "typescript";
        }
        return result;
      }else{
        var fileType = 'txt';
        return fileType;
      }
 }

  closeModal(){
    this.viewCtrl.dismiss();
  }


}
