/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';

import { QualiToastTestModule } from '../../../test.module';
import { CampagneDetailComponent } from '../../../../../../main/webapp/app/entities/campagne/campagne-detail.component';
import { CampagneService } from '../../../../../../main/webapp/app/entities/campagne/campagne.service';
import { Campagne } from '../../../../../../main/webapp/app/entities/campagne/campagne.model';

describe('Component Tests', () => {

    describe('Campagne Management Detail Component', () => {
        let comp: CampagneDetailComponent;
        let fixture: ComponentFixture<CampagneDetailComponent>;
        let service: CampagneService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [QualiToastTestModule],
                declarations: [CampagneDetailComponent],
                providers: [
                    CampagneService
                ]
            })
            .overrideTemplate(CampagneDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CampagneDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CampagneService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new Campagne(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.campagne).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
