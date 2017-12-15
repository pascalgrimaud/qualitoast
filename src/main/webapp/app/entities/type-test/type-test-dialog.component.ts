import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { TypeTest } from './type-test.model';
import { TypeTestPopupService } from './type-test-popup.service';
import { TypeTestService } from './type-test.service';

@Component({
    selector: 'jhi-type-test-dialog',
    templateUrl: './type-test-dialog.component.html'
})
export class TypeTestDialogComponent implements OnInit {

    typeTest: TypeTest;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private typeTestService: TypeTestService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
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
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: TypeTest) {
        this.eventManager.broadcast({ name: 'typeTestListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-type-test-popup',
    template: ''
})
export class TypeTestPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private typeTestPopupService: TypeTestPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.typeTestPopupService
                    .open(TypeTestDialogComponent as Component, params['id']);
            } else {
                this.typeTestPopupService
                    .open(TypeTestDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
