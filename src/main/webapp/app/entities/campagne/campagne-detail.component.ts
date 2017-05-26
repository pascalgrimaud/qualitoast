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
    options: any;
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
                labels: ['Statistiques'],
                datasets: [
                    {
                        label: 'Bloquant',
                        backgroundColor: '#FF6384',
                        borderColor: '#1E88E5',
                        data: [this.campagne.bloquant]
                    },
                    {
                        label: 'Majeur',
                        backgroundColor: '#36A2EB',
                        borderColor: '#7CB342',
                        data: [this.campagne.majeur]
                    },
                    {
                        label: 'Mineur',
                        backgroundColor: '#FFCE56',
                        borderColor: '#7CB342',
                        data: [this.campagne.mineur]
                    },
                    {
                        label: 'Evolution',
                        backgroundColor: '#9CCC65',
                        borderColor: '#7CB342',
                        data: [this.campagne.evolution]
                    }
                ]
            };
            this.options = {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
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
