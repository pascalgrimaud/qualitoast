import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { CampagneComponent } from './campagne.component';
import { CampagneDetailComponent } from './campagne-detail.component';
import { CampagnePopupComponent } from './campagne-dialog.component';
import { CampagneDeletePopupComponent } from './campagne-delete-dialog.component';

import { Principal } from '../../shared';

@Injectable()
export class CampagneResolvePagingParams implements Resolve<any> {

    constructor(private paginationUtil: JhiPaginationUtil) {}

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

export const campagneRoute: Routes = [
    {
        path: 'campagne',
        component: CampagneComponent,
        resolve: {
            'pagingParams': CampagneResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'qualiToastApp.campagne.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'campagne/:id',
        component: CampagneDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'qualiToastApp.campagne.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const campagnePopupRoute: Routes = [
    {
        path: 'campagne-new',
        component: CampagnePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'qualiToastApp.campagne.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'campagne/:id/edit',
        component: CampagnePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'qualiToastApp.campagne.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'campagne/:id/delete',
        component: CampagneDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'qualiToastApp.campagne.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
