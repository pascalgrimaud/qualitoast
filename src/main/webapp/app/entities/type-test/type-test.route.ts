import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { TypeTestComponent } from './type-test.component';
import { TypeTestDetailComponent } from './type-test-detail.component';
import { TypeTestPopupComponent } from './type-test-dialog.component';
import { TypeTestDeletePopupComponent } from './type-test-delete-dialog.component';

@Injectable()
export class TypeTestResolvePagingParams implements Resolve<any> {

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

export const typeTestRoute: Routes = [
    {
        path: 'type-test',
        component: TypeTestComponent,
        resolve: {
            'pagingParams': TypeTestResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'qualiToastApp.typeTest.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'type-test/:id',
        component: TypeTestDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'qualiToastApp.typeTest.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const typeTestPopupRoute: Routes = [
    {
        path: 'type-test-new',
        component: TypeTestPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'qualiToastApp.typeTest.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'type-test/:id/edit',
        component: TypeTestPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'qualiToastApp.typeTest.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'type-test/:id/delete',
        component: TypeTestDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'qualiToastApp.typeTest.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
