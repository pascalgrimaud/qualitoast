import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { QualiToastSharedModule } from '../../shared';
import {
    ResultatService,
    ResultatPopupService,
    ResultatComponent,
    ResultatDetailComponent,
    ResultatDialogComponent,
    ResultatPopupComponent,
    ResultatDeletePopupComponent,
    ResultatDeleteDialogComponent,
    resultatRoute,
    resultatPopupRoute,
    ResultatResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...resultatRoute,
    ...resultatPopupRoute,
];

@NgModule({
    imports: [
        QualiToastSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        ResultatComponent,
        ResultatDetailComponent,
        ResultatDialogComponent,
        ResultatDeleteDialogComponent,
        ResultatPopupComponent,
        ResultatDeletePopupComponent,
    ],
    entryComponents: [
        ResultatComponent,
        ResultatDialogComponent,
        ResultatPopupComponent,
        ResultatDeleteDialogComponent,
        ResultatDeletePopupComponent,
    ],
    providers: [
        ResultatService,
        ResultatPopupService,
        ResultatResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class QualiToastResultatModule {}
