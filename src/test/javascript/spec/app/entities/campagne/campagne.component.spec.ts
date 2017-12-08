/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';

import { QualiToastTestModule } from '../../../test.module';
import { CampagneComponent } from '../../../../../../main/webapp/app/entities/campagne/campagne.component';
import { CampagneService } from '../../../../../../main/webapp/app/entities/campagne/campagne.service';
import { Campagne } from '../../../../../../main/webapp/app/entities/campagne/campagne.model';

describe('Component Tests', () => {

    describe('Campagne Management Component', () => {
        let comp: CampagneComponent;
        let fixture: ComponentFixture<CampagneComponent>;
        let service: CampagneService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [QualiToastTestModule],
                declarations: [CampagneComponent],
                providers: [
                    CampagneService
                ]
            })
            .overrideTemplate(CampagneComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CampagneComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CampagneService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new Campagne(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.campagnes[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
