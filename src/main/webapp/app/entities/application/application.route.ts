import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PaginationUtil } from 'ng-jhipster';

import { ApplicationComponent } from './application.component';
import { ApplicationDetailComponent } from './application-detail.component';
import { ApplicationPopupComponent } from './application-dialog.component';
import { ApplicationDeletePopupComponent } from './application-delete-dialog.component';

import { Principal } from '../../shared';

@Injectable()
export class ApplicationResolvePagingParams implements Resolve<any> {

    constructor(private paginationUtil: PaginationUtil) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const page = route.queryParams['page'] ? route.queryParams['page'] : '1';
        const sort = route.queryParams['sort'] ? route.queryParams['sort'] : 'id,asc';
        return {
            page: this.paginationUtil.parsePage(page),
            predicate: this.paginationUtil.parsePredicate(sort),
            ascending: this.paginationUtil.parseAscending(sort)
      };
    }
}

export const applicationRoute: Routes = [
    {
        path: 'application',
        component: ApplicationComponent,
        resolve: {
            'pagingParams': ApplicationResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'qualiToastApp.application.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'application/:id',
        component: ApplicationDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'qualiToastApp.application.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const applicationPopupRoute: Routes = [
    {
        path: 'application-new',
        component: ApplicationPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'qualiToastApp.application.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'application/:id/edit',
        component: ApplicationPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'qualiToastApp.application.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'application/:id/delete',
        component: ApplicationDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'qualiToastApp.application.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];