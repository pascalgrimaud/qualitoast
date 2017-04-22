import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { DateUtils, DataUtils, EventManager } from 'ng-jhipster';
import { QualiToastTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { ResultatDetailComponent } from '../../../../../../main/webapp/app/entities/resultat/resultat-detail.component';
import { ResultatService } from '../../../../../../main/webapp/app/entities/resultat/resultat.service';
import { Resultat } from '../../../../../../main/webapp/app/entities/resultat/resultat.model';

describe('Component Tests', () => {

    describe('Resultat Management Detail Component', () => {
        let comp: ResultatDetailComponent;
        let fixture: ComponentFixture<ResultatDetailComponent>;
        let service: ResultatService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [QualiToastTestModule],
                declarations: [ResultatDetailComponent],
                providers: [
                    DateUtils,
                    DataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    ResultatService,
                    EventManager
                ]
            }).overrideComponent(ResultatDetailComponent, {
                set: {
                    template: ''
                }
            }).compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ResultatDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ResultatService);
        });


        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Resultat(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.resultat).toEqual(jasmine.objectContaining({id:10}));
            });
        });
    });

});
