import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import * as firebase from 'firebase';

const config = {
  apiKey: "AIzaSyDBSR_jZ41mYxm1fO3uom43pPc1XvPCcWw",
  authDomain: "example-12c6e.firebaseapp.com",
  databaseURL: "https://example-12c6e.firebaseio.com",
  projectId: "example-12c6e",
  storageBucket: "",
  messagingSenderId: "880600828926",
  timestampsInSnapshots: true
};

firebase.initializeApp(config);

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
