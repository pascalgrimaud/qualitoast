import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { QualiToastTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { TesteurDetailComponent } from '../../../../../../main/webapp/app/entities/testeur/testeur-detail.component';
import { TesteurService } from '../../../../../../main/webapp/app/entities/testeur/testeur.service';
import { Testeur } from '../../../../../../main/webapp/app/entities/testeur/testeur.model';

describe('Component Tests', () => {

    describe('Testeur Management Detail Component', () => {
        let comp: TesteurDetailComponent;
        let fixture: ComponentFixture<TesteurDetailComponent>;
        let service: TesteurService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [QualiToastTestModule],
                declarations: [TesteurDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    TesteurService,
                    JhiEventManager
                ]
            }).overrideTemplate(TesteurDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TesteurDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TesteurService);
        });


        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Testeur(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.testeur).toEqual(jasmine.objectContaining({id:10}));
            });
        });
    });

});
