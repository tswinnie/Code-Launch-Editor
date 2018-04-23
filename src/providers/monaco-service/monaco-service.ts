import { Platform } from 'ionic-angular';
import { Injectable } from '@angular/core';
import { ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { File } from '@ionic-native/file';
import * as editiorOptions from '../../editor-options/editor_options.json';

declare const monaco: any;
declare const require: any;


@Injectable()

export class MonacoServiceProvider {
  private editorWith: number = 0;
   options: any;


  @ViewChild('editor') editorContent: ElementRef;
  @Input() language: string;
  @Input() set value(v: string) {
      if (v !== this._value) {
          this._value = v;
          this.onChange(v);
      }
  }
  @Output() change = new EventEmitter();
  @Output() instance = null;

  private _editor: any;
  private _value = '';
  public _theme = '';


  constructor(public file: File, public platform:Platform ) {
     this.options = (<any>editiorOptions);


    //get settings from settings.json in dataDirectory
    // let optionData = this.editor.readFromFile("settings.json","dataDirectory","Settings");

    // alert(optionData);

  }

  get value(): string {
      return this._value;
  };

  ngOnInit() {

  }

  // loadSettingsFile(){
  //   //check that settings have been loaded and saved in the Settings directory
  //   this.platform.ready().then(() => {
  //   let pathToFile = this.file.dataDirectory+"Settings";
  //   let fileName = "settings.json";
  //     this.file.checkFile(pathToFile, fileName)
  //     .then(_ => {
  //       alert(fileName + ' exists');
  //     }) .catch(err => {
  //       alert("error" + JSON.stringify(err));
  //       alert(fileName + ' does not exist');
  //       alert("the directory name is " + pathToFile);
  //       console.log(pathToFile);
  //       //need to create the directory and file
  //     });
  //   });

  // }


  loadMonaco() {
      var onGotAmdLoader = () => {
          // Load monaco
          ( < any > window).require.config({
              paths: {
                  'vs': 'assets/monaco-editor/dev/vs'
              }
          });
          ( < any > window).require(['vs/editor/editor.main'], () => {});
      };

      // Load AMD loader if necessary
      if (!( < any > window).require) {

          var loaderScript = document.createElement('script');
          loaderScript.type = 'text/javascript';
          loaderScript.src = 'assets/monaco-editor/dev/vs/loader.js';
          loaderScript.addEventListener('load', onGotAmdLoader);
          document.body.appendChild(loaderScript);
      } else {
          onGotAmdLoader();
      }
  }

  getEditorOptions():any{
    return this.options;
  }





  // Will be called once monaco library is available
  initMonaco(editorID: string, fileExtension: string, editorSettings:any) {
      let myDiv: any;
      this.options = editorSettings; //pass editor options
      let divITems = document.getElementById("parent-body").querySelectorAll("div");
      for (var i = 0; i < divITems.length; i++) {

          if (divITems[i].id === editorID) {
              myDiv = divITems[i];

          }
      }
      this._editor = monaco.editor.create(myDiv, {
          value: "",
          language: fileExtension,
          theme: editorSettings.theme,
          wordWrap: editorSettings.wordWrap,
          wordWrapColumn: editorSettings.wordWrapColumn,
          wordWrapMinified: editorSettings.wordWrapMinified,
          wrappingIndent: editorSettings.wrappingIndent,
          lineNumbers: editorSettings.lineNumbers,
          readOnly:  editorSettings.readOnly,
          scrollBeyondLastLine: editorSettings.scrollBeyondLastLine,
          autoIndent:  editorSettings.autoIndent,
          cursorBlinking:  editorSettings.cursorBlinking,
          folding:  editorSettings.folding,
          fontFamily:  editorSettings.fontFamily,
          fontSize :  editorSettings.fontSize,
          fontWeight :  editorSettings.fontWeight,
          formatOnPaste:  editorSettings.formatOnPaste,
          glyphMargin:  editorSettings.glyphMargin,
          matchBrackets: editorSettings.matchBrackets,
          parameterHints:  editorSettings.parameterHints,
          quickSuggestions:  editorSettings.quickSuggestions,
          roundedSelection:  editorSettings.roundedSelection,
          showFoldingControls:  editorSettings.showFoldingControls,
          tabSize:  editorSettings.tabSize,
          insertSpaces:  editorSettings.insertSpaces,
          autoSave:  editorSettings.autoSave,
          detectIndentation:  editorSettings.detectIndentation,
          useTabStops:  editorSettings.useTabStops,
          colorDecorators:  editorSettings.colorDecorators,
          scrollbar: {
            // Subtle shadows to the left & top. Defaults to true.
            useShadows: false,
            // Render vertical arrows. Defaults to false.
            verticalHasArrows: false,
            // Render horizontal arrows. Defaults to false.
            horizontalHasArrows: false,
            // Render vertical scrollbar.
            // Accepted values: 'auto', 'visible', 'hidden'.
            // Defaults to 'auto'
            vertical: 'hidden',
            // Render horizontal scrollbar.
            // Accepted values: 'auto', 'visible', 'hidden'.
            // Defaults to 'auto'
            horizontal: 'hidden',
            verticalScrollbarSize: 17,
            horizontalScrollbarSize: 17,
            arrowSize: 30
          }
      });

      this._editor.getModel().onDidChangeContent((e) => {
        let currentLineNumber: number = 1;
          this.updateValue(this._editor.getModel().getValue());
          currentLineNumber = e.versionId;
          // console.log(this._editor.getPosition().lineNumber);
          currentLineNumber = this._editor.getPosition().lineNumber;

      });


  }

  //this method will be tied to the setting menu and will be called on save when user changes settings
  //this method will pass form data from the settings form to the updateOptions() in editor-options service
  //the updateOptions() wiil then write the new settings to the editor_options.json file and then call the getOptions()
  //and set a var = to the results of getOptions() and then return that value and return that value in updateOptions()
  //in the updateEditorOptions() I will set a var = to the return value of updateOptions()
  //the call this._editor.getModel() instance and set options with new options returned
  //then finally call editorUpdate() which is a method from monaco editor
  updateEditorOptions(updatedOptions:any){

//write the data to the settings.json file
    this.platform.ready().then(() => {
      let result = this.file.createDir(this.file.dataDirectory, "Settings", true)
      result.then(data => {
         let dirPath = data.toURL(); //set dirPath = to data url
          this.file.writeFile(dirPath, "user_selected_settings.json", JSON.stringify(updatedOptions), {replace: true});

      }).catch(error =>{

        alert("error: " + error);
      })

    });
    monaco.editor.setTheme(updatedOptions.theme);
  	this._editor.updateOptions({
      wordWrap: updatedOptions.wordWrap,
      wordWrapColumn: updatedOptions.wordWrapColumn,
      wordWrapMinified: updatedOptions.wordWrapMinified,
      wrappingIndent: updatedOptions.wrappingIndent,
      lineNumbers: updatedOptions.lineNumbers,
      readOnly:  updatedOptions.readOnly,
      scrollBeyondLastLine: updatedOptions.scrollBeyondLastLine,
      autoIndent:  updatedOptions.autoIndent,
      cursorBlinking:  updatedOptions.cursorBlinking,
      folding:  updatedOptions.folding,
      fontSize :  updatedOptions.fontSize,
      fontWeight :  updatedOptions.fontWeight,
      formatOnPaste:  updatedOptions.formatOnPaste,
      glyphMargin:  updatedOptions.glyphMargin,
      matchBrackets: updatedOptions.matchBrackets,
      parameterHints:  updatedOptions.parameterHints,
      quickSuggestions:  updatedOptions.quickSuggestions,
      roundedSelection:  updatedOptions.roundedSelection,
      showFoldingControls:  updatedOptions.showFoldingControls,
      tabSize:  updatedOptions.tabSize,
      insertSpaces:  updatedOptions.insertSpaces,
      autoSave:  updatedOptions.autoSave,
      detectIndentation:  updatedOptions.detectIndentation,
      useTabStops:  updatedOptions.useTabStops,
      colorDecorators:  updatedOptions.colorDecorators,
    });
  }


  tabActivated(targetTab: string) {
      this._editor.getModel().restoreViewState;
  }


  /**
   * UpdateValue
   *
   * @param value
   */
  updateValue(value: string) {
      this.value = value;
      this.onChange(value);
      this.onTouched();
      this.change.emit(value);
  }

  /**
   * WriteValue
   * Implements ControlValueAccessor
   *
   * @param value
   */
  writeValue(value: string) {
      this._value = value || '';
      if (this.instance) {
          this.instance.setValue(this._value);
      }
      // If an instance of Monaco editor is running, update its contents
      if (this._editor) {
          this._editor.getModel().setValue(this._value);
      }
  }






  onChange(_) {}
  onTouched() {}
  registerOnChange(fn) {
      this.onChange = fn;
  }
  registerOnTouched(fn) {
      this.onTouched = fn;
  }


  jsonify(o){
    var seen=[];
    var jso=JSON.stringify(o, function(k,v){
        if (typeof v =='object') {
            if ( !seen.indexOf(v) ) { return '__cycle__'; }
            seen.push(v);
        } return v;
    });
    return jso;
};

}
