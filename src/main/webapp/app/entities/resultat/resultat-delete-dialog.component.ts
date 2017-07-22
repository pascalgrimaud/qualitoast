import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Resultat } from './resultat.model';
import { ResultatPopupService } from './resultat-popup.service';
import { ResultatService } from './resultat.service';

@Component({
    selector: 'jhi-resultat-delete-dialog',
    templateUrl: './resultat-delete-dialog.component.html'
})
export class ResultatDeleteDialogComponent {

    resultat: Resultat;

    constructor(
        private resultatService: ResultatService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.resultatService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'resultatListModification',
                content: 'Deleted an resultat'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-resultat-delete-popup',
    template: ''
})
export class ResultatDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private resultatPopupService: ResultatPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.resultatPopupService
                .open(ResultatDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
