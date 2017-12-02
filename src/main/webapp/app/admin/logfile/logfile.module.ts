import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { QualiToastSharedModule } from '../../shared';

import {
    LogFileComponent,
    LogFileService,
    logFileRoute
} from './';

const ADMIN_ROUTES = [
    logFileRoute
];

@NgModule({
    imports: [
        QualiToastSharedModule,
        RouterModule.forRoot(ADMIN_ROUTES, { useHash: true })
    ],
    declarations: [
        LogFileComponent
    ],
    providers: [
        LogFileService
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class QualiToastLogFileModule {}
