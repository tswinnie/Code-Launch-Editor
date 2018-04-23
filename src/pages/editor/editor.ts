import { Platform } from 'ionic-angular';
import { ModalServiceProvider } from './../../providers/modal-service/modal-service';
import {Component} from '@angular/core'
import { IonicPage } from 'ionic-angular';
import { EditorWindowProvider } from './../../providers/editor-window/editor-window';
import { File } from '@ionic-native/file';
import * as editiorOptions from '../../editor-options/editor_options.json';



@IonicPage()
@Component({
  selector: 'page-editor',
  templateUrl: 'editor.html'
})

export class EditorPage {
  options: any;

  constructor(public editor: EditorWindowProvider, public modalService: ModalServiceProvider, public file: File, public platform:Platform) {
    document.documentElement.style.overflow = 'hidden';  // firefox, chrome
    //check that directory exist
    platform.ready().then(() => {
      this.file.checkDir(this.file.documentsDirectory, "Projects").then(_ => alert('Directory exists')).catch(err => alert('Directory doesnt exist'));
    });
    this.options = (<any>editiorOptions);


  }

  ngOnInit() {
    document.documentElement.style.overflow = 'hidden';  // firefox, chrome
  }

  newFolder(){
    this.editor.createFolder(this.file.documentsDirectory, "Projects");
  }

  createNewFile(){

    // //pass settings options data to writefile service
    // let optionData = JSON.stringify(this.options);
    // this.editor.writeNewFile(this.file.dataDirectory, "Settings", "settings.json", optionData);

    //create new file in Projects directory under documents directory
    // this.editor.writeNewFile(this.file.documentsDirectory, "Projects", "index.html", "<div>hello world</div>");
  }

  viewFileData(){
    // this.editor.readFromFile("test.txt","dataDirectory","Test");
    this.editor.readFromFile("settings.json","dataDirectory","Settings");

  }

  //open new tab
  // openNewTab(){
  //   this.editor.tabInit("app.component.html");
  // }

  // openNewModal(){
  //   this.modalService.openNewFileModal();
  // }




}
