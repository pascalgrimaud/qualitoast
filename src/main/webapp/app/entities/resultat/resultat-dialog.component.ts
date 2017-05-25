import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, AlertService } from 'ng-jhipster';

import { Resultat } from './resultat.model';
import { ResultatPopupService } from './resultat-popup.service';
import { ResultatService } from './resultat.service';

@Component({
    selector: 'jhi-resultat-dialog',
    templateUrl: './resultat-dialog.component.html'
})
export class ResultatDialogComponent implements OnInit {

    resultat: Resultat;
    authorities: any[];
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: AlertService,
        private resultatService: ResultatService,
        private eventManager: EventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
    }
    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.resultat.id !== undefined) {
            this.subscribeToSaveResponse(
                this.resultatService.update(this.resultat), false);
        } else {
            this.subscribeToSaveResponse(
                this.resultatService.create(this.resultat), true);
        }
    }

    private subscribeToSaveResponse(result: Observable<Resultat>, isCreated: boolean) {
        result.subscribe((res: Resultat) =>
            this.onSaveSuccess(res, isCreated), (res: Response) => this.onSaveError(res));
    }

    private onSaveSuccess(result: Resultat, isCreated: boolean) {
        this.alertService.success(
            isCreated ? 'qualiToastApp.resultat.created'
            : 'qualiToastApp.resultat.updated',
            { param : result.id }, null);

        this.eventManager.broadcast({ name: 'resultatListModification', content: 'OK'});
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
}

@Component({
    selector: 'jhi-resultat-popup',
    template: ''
})
export class ResultatPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private resultatPopupService: ResultatPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.modalRef = this.resultatPopupService
                    .open(ResultatDialogComponent, params['id']);
            } else {
                this.modalRef = this.resultatPopupService
                    .open(ResultatDialogComponent);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
