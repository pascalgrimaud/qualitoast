import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';

@Component({
    selector: 'jhi-error',
    templateUrl: './error.component.html'
})
export class ErrorComponent implements OnInit {
    errorMessage: string;
    error403: boolean;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private route: ActivatedRoute
    ) {
        this.jhiLanguageService.setLocations(['error']);
    }

    ngOnInit() {
        this.route.data.subscribe((routeData) => {
            if (routeData.error403) {
                this.error403 = routeData.error403;
            }
            if (routeData.errorMessage) {
                this.errorMessage = routeData.errorMessage;
            }
        });
    }
}
