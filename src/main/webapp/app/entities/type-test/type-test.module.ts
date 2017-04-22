import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { QualiToastSharedModule } from '../../shared';
import {
    TypeTestService,
    TypeTestPopupService,
    TypeTestComponent,
    TypeTestDetailComponent,
    TypeTestDialogComponent,
    TypeTestPopupComponent,
    TypeTestDeletePopupComponent,
    TypeTestDeleteDialogComponent,
    typeTestRoute,
    typeTestPopupRoute,
    TypeTestResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...typeTestRoute,
    ...typeTestPopupRoute,
];

@NgModule({
    imports: [
        QualiToastSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        TypeTestComponent,
        TypeTestDetailComponent,
        TypeTestDialogComponent,
        TypeTestDeleteDialogComponent,
        TypeTestPopupComponent,
        TypeTestDeletePopupComponent,
    ],
    entryComponents: [
        TypeTestComponent,
        TypeTestDialogComponent,
        TypeTestPopupComponent,
        TypeTestDeleteDialogComponent,
        TypeTestDeletePopupComponent,
    ],
    providers: [
        TypeTestService,
        TypeTestPopupService,
        TypeTestResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class QualiToastTypeTestModule {}
