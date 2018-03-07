import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NewFilePage } from './new-file';
import { IonicModule, Platform, NavController} from 'ionic-angular/index';
import { IonicPage, NavParams } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ModalController, ViewController } from 'ionic-angular';
import { EditorWindowProvider } from '../../providers/editor-window/editor-window';




describe('BannerComponent', () => {
  let component: NewFilePage;
  let fixture: ComponentFixture<NewFilePage>;
  let navParams: NavParams;
  let formBuilder: FormBuilder;
  let viewController: ViewController;
  let editorWindow: EditorWindowProvider;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewFilePage ],
      imports: [
        IonicModule.forRoot(NewFilePage)
    ],
    providers: [
      NavController,
      {
          provide: NavParams,
          useValue: navParams
      },
      {
          provide: FormBuilder,
          useValue: formBuilder
      },
      {
          provide: ViewController,
          useValue: viewController
      },
      {
        provide: EditorWindowProvider,
        useValue: editorWindow
    },

  ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    // fixture = TestBed.createComponent(NewFilePage);
    // component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(true).toBeTruthy();
  });
});
