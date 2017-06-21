import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { QualiToastBarchartModule } from './barchart/barchart.module';
import { QualiToastDoughnutchartModule } from './doughnutchart/doughnutchart.module';
import { QualiToastLinechartModule } from './linechart/linechart.module';
import { QualiToastPiechartModule } from './piechart/piechart.module';
import { QualiToastPolarareachartModule } from './polarareachart/polarareachart.module';
import { QualiToastRadarchartModule } from './radarchart/radarchart.module';

@NgModule({
    imports: [
        QualiToastBarchartModule,
        QualiToastDoughnutchartModule,
        QualiToastLinechartModule,
        QualiToastPiechartModule,
        QualiToastPolarareachartModule,
        QualiToastRadarchartModule,
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class QualiToastDashboardModule {}
