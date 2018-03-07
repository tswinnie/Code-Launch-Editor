import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { MenuPage } from '../pages/menu/menu';
import { TreeViewPage } from '../pages/tree-view/tree-view';
import { EditorPage } from '../pages/editor/editor';
import { NotificationBarPage } from '../pages/notification-bar/notification-bar';
import { EditorWindowProvider } from '../providers/editor-window/editor-window';
import { MonacoServiceProvider } from '../providers/monaco-service/monaco-service';
import { ModalServiceProvider } from '../providers/modal-service/modal-service';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    MenuPage,
    TreeViewPage,
    EditorPage,
    NotificationBarPage

  ],

  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    MenuPage,
    TreeViewPage,
    EditorPage,
    NotificationBarPage


  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    EditorWindowProvider,
    MonacoServiceProvider,
    ModalServiceProvider,




  ]
})
export class AppModule {}
