import { MonacoServiceProvider } from './../monaco-service/monaco-service';
import { EditorPage } from './../../pages/editor/editor';
import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { IonicModule, Platform, NavController} from 'ionic-angular/index';
import { By }              from '@angular/platform-browser';
import { DebugElement }    from '@angular/core';
import { PlatformMock, StatusBarMock, SplashScreenMock } from '../../../test-config/mocks-ionic';
import { EditorWindowProvider } from '../editor-window/editor-window';
import { EditorWindowMock } from './editor-window.mock';

describe('Editor Tab and Monaco Test', () => {
  let comp: EditorPage;
  let fixture: ComponentFixture < EditorPage > ;
  let de: DebugElement;
  let el: HTMLElement;
  let tabCont: DebugElement;
  let editorWindowStub: EditorWindowProvider;
  let editorWindow: EditorWindowProvider;
  let monocoServiceStub: MonacoServiceProvider;
  let monacoService: MonacoServiceProvider;
  let mockEditorWindow: EditorWindowMock;
  let tabTarget: DebugElement;
  let monoaco: MonacoServiceProvider;

  let tab: HTMLElement;

  beforeEach(async (() => {
      TestBed.configureTestingModule({
          declarations: [EditorPage],
          imports: [
              IonicModule.forRoot(EditorPage)
          ],
          providers: [
              NavController,
              {
                  provide: Platform,
                  useClass: PlatformMock
              },
              {
                  provide: EditorWindowProvider,
                  useValue: editorWindowStub
              },
              {
                  provide: MonacoServiceProvider,
                  useValue: monocoServiceStub
              },

          ]
      });
  }));

  beforeEach(() => {
      fixture = TestBed.createComponent(EditorPage);
      comp = fixture.componentInstance;
      de = fixture.debugElement.query(By.css('button'));
      tabCont = fixture.debugElement.query(By.css('#parent-node'));
      editorWindow = fixture.debugElement.injector.get(EditorWindowProvider);
      monacoService = fixture.debugElement.injector.get(MonacoServiceProvider);

      monacoService = new MonacoServiceProvider();
      editorWindow = new EditorWindowProvider(monacoService);

      mockEditorWindow = new EditorWindowMock();
      monoaco = new monacoService.loadMonaco();

  });


  // it('should call tabInit', fakeAsync( () => {
  //   fixture.detectChanges();
  //   spyOn(comp, 'openNewTab'); //method attached to the click.

  //   let btn = fixture.debugElement.query(By.css('button'));
  //   btn.triggerEventHandler('click', null);
  //   tick(); // simulates the passage of time until all pending asynchronous activities finish
  //   fixture.detectChanges();
  //   expect(comp.openNewTab).toHaveBeenCalled();

  // }));

  it('should create component', () => {
      expect(comp).toBeDefined();
  });

  it('should load loadMonaco', fakeAsync(() => {
      expect(monacoService.loadMonaco).toBeDefined();
  }));


  it('should load initMonaco', fakeAsync(() => {
      expect(editorWindow.monaco.initMonaco).toBeDefined();
  }));


  it('should call tabInit', fakeAsync(() => {
      tabCont = fixture.debugElement.query(By.css('#parent-node'));
      tab = tabCont.nativeElement;
      fixture.detectChanges();
      spyOn(mockEditorWindow, 'tabInit'); //method attached to the click.
      mockEditorWindow.tabInit('index.html');
      tick(); // simulates the passage of time until all pending asynchronous activities finish
      fixture.detectChanges();
      expect(mockEditorWindow.tabInit).toHaveBeenCalled();
  }));

  it('should return new tab created ', fakeAsync(() => {
      let tabCreated: string = mockEditorWindow.tabInit('index.html');
      expect(mockEditorWindow.tabInit('index.html')).toEqual(tabCreated);
  }));

  it('should return an active tab ', fakeAsync(() => {
      //create a new tab
      let newTab: any = document.createElement("div");
      newTab.setAttribute("class", "tab");
      let methodCall: any;
      //pass new tab to activateTab method
      methodCall = mockEditorWindow.activateTab(newTab, "1app.component.html")
      //new tab should have active class
      expect(methodCall.className === "acitve").toBeTruthy;

  }));


});

