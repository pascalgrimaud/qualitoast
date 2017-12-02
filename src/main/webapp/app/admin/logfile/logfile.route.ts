import { Route } from '@angular/router';
import { UserRouteAccessService } from '../../shared';
import { LogFileComponent } from './logfile.component';

export const logFileRoute: Route = {
    path: 'logfile',
    component: LogFileComponent,
    data: {
        authorities: ['ROLE_ADMIN'],
        pageTitle: 'logfile.title'
    },
    canActivate: [UserRouteAccessService]
};
