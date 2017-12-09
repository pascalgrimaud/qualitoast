/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';

import { QualiToastTestModule } from '../../../test.module';
import { ResultatComponent } from '../../../../../../main/webapp/app/entities/resultat/resultat.component';
import { ResultatService } from '../../../../../../main/webapp/app/entities/resultat/resultat.service';
import { Resultat } from '../../../../../../main/webapp/app/entities/resultat/resultat.model';

describe('Component Tests', () => {

    describe('Resultat Management Component', () => {
        let comp: ResultatComponent;
        let fixture: ComponentFixture<ResultatComponent>;
        let service: ResultatService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [QualiToastTestModule],
                declarations: [ResultatComponent],
                providers: [
                    ResultatService
                ]
            })
            .overrideTemplate(ResultatComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ResultatComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ResultatService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new Resultat(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.resultats[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
