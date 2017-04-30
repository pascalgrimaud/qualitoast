import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, AlertService, JhiLanguageService } from 'ng-jhipster';

import { TypeTest } from './type-test.model';
import { TypeTestPopupService } from './type-test-popup.service';
import { TypeTestService } from './type-test.service';

@Component({
    selector: 'jhi-type-test-dialog',
    templateUrl: './type-test-dialog.component.html'
})
export class TypeTestDialogComponent implements OnInit {

    typeTest: TypeTest;
    authorities: any[];
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiLanguageService: JhiLanguageService,
        private alertService: AlertService,
        private typeTestService: TypeTestService,
        private eventManager: EventManager
    ) {
        this.jhiLanguageService.setLocations(['typeTest']);
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
        if (this.typeTest.id !== undefined) {
            this.subscribeToSaveResponse(
                this.typeTestService.update(this.typeTest));
        } else {
            this.subscribeToSaveResponse(
                this.typeTestService.create(this.typeTest));
        }
    }

    private subscribeToSaveResponse(result: Observable<TypeTest>) {
        result.subscribe((res: TypeTest) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
    }

    private onSaveSuccess(result: TypeTest) {
        this.eventManager.broadcast({ name: 'typeTestListModification', content: 'OK'});
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
    selector: 'jhi-type-test-popup',
    template: ''
})
export class TypeTestPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private typeTestPopupService: TypeTestPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.modalRef = this.typeTestPopupService
                    .open(TypeTestDialogComponent, params['id']);
            } else {
                this.modalRef = this.typeTestPopupService
                    .open(TypeTestDialogComponent);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
