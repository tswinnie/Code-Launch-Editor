import { Injectable } from '@angular/core';
import { ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';

declare const monaco: any;
declare const require: any;

@Injectable()

export class MonacoServiceProvider {
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

  constructor() {}

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
  initMonaco(editorID: string) {
      let myDiv: any;
      let divITems = document.getElementById("parent-body").querySelectorAll("div");
      for (var i = 0; i < divITems.length; i++) {

          if (divITems[i].id === editorID) {
              myDiv = divITems[i];

          }
      }
      this._editor = monaco.editor.create(myDiv, {
          value: "<html>\n<head>\n<title></title>\n</head>\n<body>\n</body>\n</html>",
          language: "html",
          theme: "vs-light",
          wordWrap: 'wordWrapColumn',
          // wordWrapColumn: 40,
          wordWrapMinified: true,
          wrappingIndent: "indent",
          lineNumbers: true
      });
      this._editor.getModel().onDidChangeContent((e) => {
          this.updateValue(this._editor.getModel().getValue());
      });

      if (myDiv.classList.contains('hide')) {
          //get the editor and resume state

      }

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
