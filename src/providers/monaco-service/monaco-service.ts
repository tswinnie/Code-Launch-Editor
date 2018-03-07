import { Injectable } from '@angular/core';
import { ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
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


  constructor() {
     this.options = (<any>editiorOptions);
  }

  get value(): string {
      return this._value;
  };

  ngOnInit() {

  }


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



  // Will be called once monaco library is available
  initMonaco(editorID: string, fileExtension: string) {
      let myDiv: any;
      let divITems = document.getElementById("parent-body").querySelectorAll("div");
      for (var i = 0; i < divITems.length; i++) {

          if (divITems[i].id === editorID) {
              myDiv = divITems[i];

          }
      }
      this._editor = monaco.editor.create(myDiv, {

          value: "",
          language: fileExtension,
          theme: this.options.theme,
          wordWrap: this.options.wordWrap,
          wordWrapColumn: this.options.wordWrapColumn,
          wordWrapMinified: this.options.wordWrapMinified,
          wrappingIndent: this.options.wrappingIndent,
          lineNumbers: this.options.lineNumbers,
          readOnly:  this.options.readOnly,
          scrollBeyondLastLine:  this.options.scrollBeyondLastLine,
          autoIndent:  this.options.autoIndent,
          cursorBlinking:  this.options.cursorBlinking,
          folding:  this.options.folding,
          fontFamily:  this.options.fontFamily,
          fontSize :  this.options.fontSize,
          fontWeight :  this.options.fontWeight,
          formatOnPaste:  this.options.formatOnPaste,
          glyphMargin:  this.options.glyphMargin,
          matchBrackets:  this.options.matchBrackets,
          parameterHints:  this.options.parameterHints,
          quickSuggestions:  this.options.quickSuggestions,
          roundedSelection:  this.options.roundedSelection,
          showFoldingControls:  this.options.showFoldingControls,
          tabSize:  this.options.tabSize,
          insertSpaces:  this.options.insertSpaces,
          autoSave:  this.options.autoSave,
          detectIndentation:  this.options.detectIndentation,
          useTabStops:  this.options.useTabStops,
          colorDecorators:  this.options.colorDecorators,
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
  updateEditorOptions(option:string){
    monaco.editor.setTheme(option);

  	// this._editor.updateOptions({
    //   thme: "vs-dark",
    //   lineNumbers: false
    // });
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


}
