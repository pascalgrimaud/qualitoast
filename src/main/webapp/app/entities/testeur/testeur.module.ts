import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { QualiToastSharedModule } from '../../shared';
import {
    TesteurService,
    TesteurPopupService,
    TesteurComponent,
    TesteurDetailComponent,
    TesteurDialogComponent,
    TesteurPopupComponent,
    TesteurDeletePopupComponent,
    TesteurDeleteDialogComponent,
    testeurRoute,
    testeurPopupRoute,
    TesteurResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...testeurRoute,
    ...testeurPopupRoute,
];

@NgModule({
    imports: [
        QualiToastSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        TesteurComponent,
        TesteurDetailComponent,
        TesteurDialogComponent,
        TesteurDeleteDialogComponent,
        TesteurPopupComponent,
        TesteurDeletePopupComponent,
    ],
    entryComponents: [
        TesteurComponent,
        TesteurDialogComponent,
        TesteurPopupComponent,
        TesteurDeleteDialogComponent,
        TesteurDeletePopupComponent,
    ],
    providers: [
        TesteurService,
        TesteurPopupService,
        TesteurResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class QualiToastTesteurModule {}
