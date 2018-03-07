import { ModalServiceProvider } from './../../providers/modal-service/modal-service';
import {Component} from '@angular/core'
import { IonicPage } from 'ionic-angular';
import { EditorWindowProvider } from './../../providers/editor-window/editor-window';
@IonicPage()
@Component({
  selector: 'page-editor',
  templateUrl: 'editor.html'
})

export class EditorPage {

  constructor(public editor: EditorWindowProvider, public modalService: ModalServiceProvider) {
    document.documentElement.style.overflow = 'hidden';  // firefox, chrome
  }

  ngOnInit() {
    document.documentElement.style.overflow = 'hidden';  // firefox, chrome
  }

  //open new tab
  // openNewTab(){
  //   this.editor.tabInit("app.component.html");
  // }

  // openNewModal(){
  //   this.modalService.openNewFileModal();
  // }




}
