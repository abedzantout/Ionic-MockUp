import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { HelloIonicPage } from '../pages/hello-ionic/hello-ionic';
import { ItemDetailsPage } from '../pages/item-details/item-details';
import {MenuPage} from '../pages/menu/menu';
import {AboutUsPage} from '../pages/about-us/about-us';
import {FeedbackPage} from '../pages/feedback/feedback';

@NgModule({
  declarations: [
    MyApp,
    HelloIonicPage,
    ItemDetailsPage,
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
    ItemDetailsPage,
    MenuPage,
    AboutUsPage,
    FeedbackPage
  ],
  providers: []
})
export class AppModule {}
