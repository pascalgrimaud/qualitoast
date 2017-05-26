import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { DateUtils, DataUtils, EventManager } from 'ng-jhipster';
import { QualiToastTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { ApplicationDetailComponent } from '../../../../../../main/webapp/app/entities/application/application-detail.component';
import { ApplicationService } from '../../../../../../main/webapp/app/entities/application/application.service';
import { Application } from '../../../../../../main/webapp/app/entities/application/application.model';

describe('Component Tests', () => {

    describe('Application Management Detail Component', () => {
        let comp: ApplicationDetailComponent;
        let fixture: ComponentFixture<ApplicationDetailComponent>;
        let service: ApplicationService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [QualiToastTestModule],
                declarations: [ApplicationDetailComponent],
                providers: [
                    DateUtils,
                    DataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    ApplicationService,
                    EventManager
                ]
            }).overrideTemplate(ApplicationDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ApplicationDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ApplicationService);
        });


        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Application(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.application).toEqual(jasmine.objectContaining({id:10}));
            });
        });
    });

});
