import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {CaroJobsModule} from './shared/carojobs.module';
import {Location, LocationStrategy, HashLocationStrategy} from '@angular/common';
import {HttpModule} from '@angular/http';

import {AppComponent} from './app.component';
import {DropdownModule} from 'ng2-bootstrap/dropdown';
import {TabsModule} from 'ng2-bootstrap/tabs';
import {ModalModule} from 'ng2-bootstrap/modal';
import {NAV_DROPDOWN_DIRECTIVES} from './shared/nav-dropdown.directive';

import {ChartsModule} from 'ng2-charts/ng2-charts';
import {SIDEBAR_TOGGLE_DIRECTIVES} from './shared/sidebar.directive';
import {AsideToggleDirective} from './shared/aside.directive';
import {BreadcrumbsComponent} from './shared/breadcrumb.component';
import {RightTopMenuComponent} from './directives/righttopmenu.component';

// Routing Module
import {AppRoutingModule} from './app.routing';

// Layouts
import {FullLayoutComponent} from './layouts/full-layout.component';
import {SimpleLayoutComponent} from './layouts/simple-layout.component';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    DropdownModule.forRoot(),
    TabsModule.forRoot(),
    ModalModule.forRoot(),
    ChartsModule,
    HttpModule,
    CaroJobsModule.forRoot()
  ],
  declarations: [
    AppComponent,
    FullLayoutComponent,
    SimpleLayoutComponent,
    NAV_DROPDOWN_DIRECTIVES,
    BreadcrumbsComponent,
    SIDEBAR_TOGGLE_DIRECTIVES,
    AsideToggleDirective,
    RightTopMenuComponent
  ],
  providers: [Location, {
    provide: LocationStrategy,
    useClass: HashLocationStrategy
  }],
  bootstrap: [AppComponent]
})
export class AppModule {}
