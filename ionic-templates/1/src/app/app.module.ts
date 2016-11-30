import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { ConferenceApp } from './app.component';
import { AboutPage } from '../pages/about/about';
import { AccountPage } from '../pages/account/account';
import { LoginPage } from '../pages/login/login';
import { MapPage } from '../pages/map/map';
import { SchedulePage } from '../pages/schedule/schedule';
import { ScheduleFilterPage } from '../pages/schedule-filter/schedule-filter';
import { SessionDetailPage } from '../pages/session-detail/session-detail';
import { SignupPage } from '../pages/signup/signup';
import { DirectorDetailPage } from '../pages/director-detail/director-detail';
import { DirectorListPage } from '../pages/director-list/director-list';
import { TabsPage } from '../pages/tabs/tabs';
import { TutorialPage } from '../pages/tutorial/tutorial';
import { ConferenceData } from '../providers/conference-data';
import { UserData } from '../providers/user-data';
import { iConfigProvider } from "../providers/iconfig.provider";
import { MapToIterable } from "../pipes/toarray.pipe";


@NgModule({
    declarations: [
        ConferenceApp,
        AboutPage,
        AccountPage,
        LoginPage,
        MapPage,
        SchedulePage,
        ScheduleFilterPage,
        SessionDetailPage,
        SignupPage,
        DirectorDetailPage,
        DirectorListPage,
        TabsPage,
        TutorialPage,
        MapToIterable
    ],
    imports: [
        IonicModule.forRoot(ConferenceApp)
    ],
    bootstrap: [ IonicApp ],
    entryComponents: [
        ConferenceApp,
        AboutPage,
        AccountPage,
        LoginPage,
        MapPage,
        SchedulePage,
        ScheduleFilterPage,
        SessionDetailPage,
        SignupPage,
        DirectorDetailPage,
        DirectorListPage,
        TabsPage,
        TutorialPage
    ],
    providers: [ ConferenceData, UserData, Storage, iConfigProvider ]
})
export class AppModule {
}
