import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { TesteurComponent } from './testeur.component';
import { TesteurDetailComponent } from './testeur-detail.component';
import { TesteurPopupComponent } from './testeur-dialog.component';
import { TesteurDeletePopupComponent } from './testeur-delete-dialog.component';

@Injectable()
export class TesteurResolvePagingParams implements Resolve<any> {

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

export const testeurRoute: Routes = [
    {
        path: 'testeur',
        component: TesteurComponent,
        resolve: {
            'pagingParams': TesteurResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'qualiToastApp.testeur.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'testeur/:id',
        component: TesteurDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'qualiToastApp.testeur.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const testeurPopupRoute: Routes = [
    {
        path: 'testeur-new',
        component: TesteurPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'qualiToastApp.testeur.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'testeur/:id/edit',
        component: TesteurPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'qualiToastApp.testeur.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'testeur/:id/delete',
        component: TesteurDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'qualiToastApp.testeur.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
