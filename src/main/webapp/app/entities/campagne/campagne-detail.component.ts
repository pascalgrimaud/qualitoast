import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { EventManager  } from 'ng-jhipster';

import { Campagne } from './campagne.model';
import { CampagneService } from './campagne.service';

@Component({
    selector: 'jhi-campagne-detail',
    templateUrl: './campagne-detail.component.html'
})
export class CampagneDetailComponent implements OnInit, OnDestroy {

    data: any;
    campagne: Campagne;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: EventManager,
        private campagneService: CampagneService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInCampagnes();
    }

    load(id) {
        this.campagneService.find(id).subscribe((campagne) => {
            this.campagne = campagne;
            this.data = {
                labels: ['Bloquant', 'Majeur', 'Mineur', 'Evolution'],
                datasets: [{
                    data: [
                        this.campagne.bloquant,
                        this.campagne.majeur,
                        this.campagne.mineur,
                        this.campagne.evolution
                    ],
                    backgroundColor: [
                        '#FF6384',
                        '#36A2EB',
                        '#FFCE56',
                        '#36A2EB'
                    ],
                    hoverBackgroundColor: [
                        '#FF6384',
                        '#36A2EB',
                        '#FFCE56',
                        '#36A2EB'
                    ]
                }]
            };
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInCampagnes() {
        this.eventSubscriber = this.eventManager.subscribe(
            'campagneListModification',
            (response) => this.load(this.campagne.id)
        );
    }
}
