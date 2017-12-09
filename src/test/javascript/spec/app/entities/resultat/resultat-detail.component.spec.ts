/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';

import { QualiToastTestModule } from '../../../test.module';
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
                    ResultatService
                ]
            })
            .overrideTemplate(ResultatDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ResultatDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ResultatService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new Resultat(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.resultat).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
