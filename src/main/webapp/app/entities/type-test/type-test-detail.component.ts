import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { EventManager , JhiLanguageService  } from 'ng-jhipster';

import { TypeTest } from './type-test.model';
import { TypeTestService } from './type-test.service';

@Component({
    selector: 'jhi-type-test-detail',
    templateUrl: './type-test-detail.component.html'
})
export class TypeTestDetailComponent implements OnInit, OnDestroy {

    typeTest: TypeTest;
    private subscription: any;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: EventManager,
        private jhiLanguageService: JhiLanguageService,
        private typeTestService: TypeTestService,
        private route: ActivatedRoute
    ) {
        this.jhiLanguageService.setLocations(['typeTest']);
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInTypeTests();
    }

    load(id) {
        this.typeTestService.find(id).subscribe((typeTest) => {
            this.typeTest = typeTest;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInTypeTests() {
        this.eventSubscriber = this.eventManager.subscribe(
            'typeTestListModification',
            (response) => this.load(this.typeTest.id)
        );
    }
}
