import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { MenuPage } from '../pages/menu/menu';
import { AboutPage } from '../pages/about/about';
import { FeedbackPage } from '../pages/feedback/feedback';
import { Service } from "../services/service";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    MenuPage,
    AboutPage,
    FeedbackPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [ IonicApp ],
  entryComponents: [
    MyApp,
    HomePage,
    MenuPage,
    AboutPage,
    FeedbackPage
  ],
  providers: [ Service ]
})
export class AppModule {
}
