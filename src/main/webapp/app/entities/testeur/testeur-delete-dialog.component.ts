import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Testeur } from './testeur.model';
import { TesteurPopupService } from './testeur-popup.service';
import { TesteurService } from './testeur.service';

@Component({
    selector: 'jhi-testeur-delete-dialog',
    templateUrl: './testeur-delete-dialog.component.html'
})
export class TesteurDeleteDialogComponent {

    testeur: Testeur;

    constructor(
        private testeurService: TesteurService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.testeurService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'testeurListModification',
                content: 'Deleted an testeur'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-testeur-delete-popup',
    template: ''
})
export class TesteurDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private testeurPopupService: TesteurPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.testeurPopupService
                .open(TesteurDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
