import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { EventManager  } from 'ng-jhipster';

import { Resultat } from './resultat.model';
import { ResultatService } from './resultat.service';

@Component({
    selector: 'jhi-resultat-detail',
    templateUrl: './resultat-detail.component.html'
})
export class ResultatDetailComponent implements OnInit, OnDestroy {

    resultat: Resultat;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: EventManager,
        private resultatService: ResultatService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInResultats();
    }

    load(id) {
        this.resultatService.find(id).subscribe((resultat) => {
            this.resultat = resultat;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInResultats() {
        this.eventSubscriber = this.eventManager.subscribe(
            'resultatListModification',
            (response) => this.load(this.resultat.id)
        );
    }
}
