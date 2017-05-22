import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, AlertService } from 'ng-jhipster';

import { Campagne } from './campagne.model';
import { CampagnePopupService } from './campagne-popup.service';
import { CampagneService } from './campagne.service';
import { Application, ApplicationService } from '../application';
import { TypeTest, TypeTestService } from '../type-test';
import { Resultat, ResultatService } from '../resultat';
import { Testeur, TesteurService } from '../testeur';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-campagne-dialog',
    templateUrl: './campagne-dialog.component.html'
})
export class CampagneDialogComponent implements OnInit {

    campagne: Campagne;
    authorities: any[];
    isSaving: boolean;

    applications: Application[];

    typetests: TypeTest[];

    resultats: Resultat[];

    testeurs: Testeur[];
    datedebutDp: any;
    datefinDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: AlertService,
        private campagneService: CampagneService,
        private applicationService: ApplicationService,
        private typeTestService: TypeTestService,
        private resultatService: ResultatService,
        private testeurService: TesteurService,
        private eventManager: EventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
        this.applicationService.query()
            .subscribe((res: ResponseWrapper) => { this.applications = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.typeTestService.query()
            .subscribe((res: ResponseWrapper) => { this.typetests = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.resultatService.query()
            .subscribe((res: ResponseWrapper) => { this.resultats = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.testeurService.query()
            .subscribe((res: ResponseWrapper) => { this.testeurs = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }
    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.campagne.id !== undefined) {
            this.subscribeToSaveResponse(
                this.campagneService.update(this.campagne));
        } else {
            this.subscribeToSaveResponse(
                this.campagneService.create(this.campagne));
        }
    }

    private subscribeToSaveResponse(result: Observable<Campagne>) {
        result.subscribe((res: Campagne) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
    }

    private onSaveSuccess(result: Campagne) {
        this.eventManager.broadcast({ name: 'campagneListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError(error) {
        try {
            error.json();
        } catch (exception) {
            error.message = error.text();
        }
        this.isSaving = false;
        this.onError(error);
    }

    private onError(error) {
        this.alertService.error(error.message, null, null);
    }

    trackApplicationById(index: number, item: Application) {
        return item.id;
    }

    trackTypeTestById(index: number, item: TypeTest) {
        return item.id;
    }

    trackResultatById(index: number, item: Resultat) {
        return item.id;
    }

    trackTesteurById(index: number, item: Testeur) {
        return item.id;
    }

    getSelected(selectedVals: Array<any>, option: any) {
        if (selectedVals) {
            for (let i = 0; i < selectedVals.length; i++) {
                if (option.id === selectedVals[i].id) {
                    return selectedVals[i];
                }
            }
        }
        return option;
    }
}

@Component({
    selector: 'jhi-campagne-popup',
    template: ''
})
export class CampagnePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private campagnePopupService: CampagnePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.modalRef = this.campagnePopupService
                    .open(CampagneDialogComponent, params['id']);
            } else {
                this.modalRef = this.campagnePopupService
                    .open(CampagneDialogComponent);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
