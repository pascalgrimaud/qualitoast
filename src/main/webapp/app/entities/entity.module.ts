import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { QualiToastCampagneModule } from './campagne/campagne.module';
import { QualiToastApplicationModule } from './application/application.module';
import { QualiToastTypeTestModule } from './type-test/type-test.module';
import { QualiToastResultatModule } from './resultat/resultat.module';
import { QualiToastTesteurModule } from './testeur/testeur.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        QualiToastCampagneModule,
        QualiToastApplicationModule,
        QualiToastTypeTestModule,
        QualiToastResultatModule,
        QualiToastTesteurModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class QualiToastEntityModule {}
