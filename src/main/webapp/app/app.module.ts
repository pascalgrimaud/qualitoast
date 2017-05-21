import './vendor.ts';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Ng2Webstorage } from 'ng2-webstorage';

import { QualiToastSharedModule, UserRouteAccessService } from './shared';
import { QualiToastHomeModule } from './home/home.module';
import { QualiToastAdminModule } from './admin/admin.module';
import { QualiToastAccountModule } from './account/account.module';
import { QualiToastEntityModule } from './entities/entity.module';
import { QualiToastDashboardModule } from './dashboard/dashboard.module';

import { customHttpProvider } from './blocks/interceptor/http.provider';
import { PaginationConfig } from './blocks/config/uib-pagination.config';

import {
    JhiMainComponent,
    LayoutRoutingModule,
    NavbarComponent,
    FooterComponent,
    ProfileService,
    PageRibbonComponent,
    ActiveMenuDirective,
    ErrorComponent
} from './layouts';

@NgModule({
    imports: [
        BrowserModule,
        LayoutRoutingModule,
        Ng2Webstorage.forRoot({ prefix: 'jhi', separator: '-'}),
        QualiToastSharedModule,
        QualiToastHomeModule,
        QualiToastAdminModule,
        QualiToastAccountModule,
        QualiToastEntityModule,
        QualiToastDashboardModule,
        BrowserAnimationsModule
    ],
    declarations: [
        JhiMainComponent,
        NavbarComponent,
        ErrorComponent,
        PageRibbonComponent,
        ActiveMenuDirective,
        FooterComponent
    ],
    providers: [
        ProfileService,
        customHttpProvider(),
        PaginationConfig,
        UserRouteAccessService
    ],
    bootstrap: [ JhiMainComponent ]
})
export class QualiToastAppModule {}
