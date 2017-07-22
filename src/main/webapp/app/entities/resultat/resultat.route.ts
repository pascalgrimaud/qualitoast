import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { ResultatComponent } from './resultat.component';
import { ResultatDetailComponent } from './resultat-detail.component';
import { ResultatPopupComponent } from './resultat-dialog.component';
import { ResultatDeletePopupComponent } from './resultat-delete-dialog.component';

@Injectable()
export class ResultatResolvePagingParams implements Resolve<any> {

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

export const resultatRoute: Routes = [
    {
        path: 'resultat',
        component: ResultatComponent,
        resolve: {
            'pagingParams': ResultatResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'qualiToastApp.resultat.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'resultat/:id',
        component: ResultatDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'qualiToastApp.resultat.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const resultatPopupRoute: Routes = [
    {
        path: 'resultat-new',
        component: ResultatPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'qualiToastApp.resultat.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'resultat/:id/edit',
        component: ResultatPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'qualiToastApp.resultat.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'resultat/:id/delete',
        component: ResultatDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'qualiToastApp.resultat.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
