import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AlertService, EventManager } from 'ng-jhipster';

import { Campagne } from './campagne.model';
import { CampagnePopupService } from './campagne-popup.service';
import { CampagneService } from './campagne.service';

@Component({
    selector: 'jhi-campagne-delete-dialog',
    templateUrl: './campagne-delete-dialog.component.html'
})
export class CampagneDeleteDialogComponent {

    campagne: Campagne;

    constructor(
        private campagneService: CampagneService,
        public activeModal: NgbActiveModal,
        private alertService: AlertService,
        private eventManager: EventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.campagneService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'campagneListModification',
                content: 'Deleted an campagne'
            });
            this.activeModal.dismiss(true);
        });
        this.alertService.success('qualiToastApp.campagne.deleted', { param : id }, null);
    }
}

@Component({
    selector: 'jhi-campagne-delete-popup',
    template: ''
})
export class CampagneDeletePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private campagnePopupService: CampagnePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.modalRef = this.campagnePopupService
                .open(CampagneDeleteDialogComponent, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
