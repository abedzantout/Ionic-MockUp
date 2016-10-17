import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { HelloIonicPage } from '../pages/hello-ionic/hello-ionic';
import {MenuPage} from '../pages/menu/menu';
import {AboutUsPage} from '../pages/about-us/about-us';
import {FeedbackPage} from '../pages/feedback/feedback';
import { Service } from "../services/service";

@NgModule({
  declarations: [
    MyApp,
    HelloIonicPage,
    MenuPage,
    AboutUsPage,
    FeedbackPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HelloIonicPage,
    MenuPage,
    AboutUsPage,
    FeedbackPage
  ],
  providers: [Service]
})
export class AppModule {}
