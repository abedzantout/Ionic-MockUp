import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { HelloIonicPage } from '../pages/hello-ionic/hello-ionic';
import { ItemDetailsPage } from '../pages/item-details/item-details';
import { ListPage } from '../pages/list/list';
import {MenuPage} from '../pages/menu/menu';
import {ProductsPage} from '../pages/products/products';
import {AboutUsPage} from '../pages/about-us/about-us';
import {FeedbackPage} from '../pages/feedback/feedback';

@NgModule({
  declarations: [
    MyApp,
    HelloIonicPage,
    ItemDetailsPage,
    ListPage,
    MenuPage,
    ProductsPage,
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
    ListPage,
    MenuPage,
    ProductsPage,
    AboutUsPage,
    FeedbackPage
  ],
  providers: []
})
export class AppModule {}
