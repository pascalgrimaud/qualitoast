/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';

import { QualiToastTestModule } from '../../../test.module';
import { TesteurComponent } from '../../../../../../main/webapp/app/entities/testeur/testeur.component';
import { TesteurService } from '../../../../../../main/webapp/app/entities/testeur/testeur.service';
import { Testeur } from '../../../../../../main/webapp/app/entities/testeur/testeur.model';

describe('Component Tests', () => {

    describe('Testeur Management Component', () => {
        let comp: TesteurComponent;
        let fixture: ComponentFixture<TesteurComponent>;
        let service: TesteurService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [QualiToastTestModule],
                declarations: [TesteurComponent],
                providers: [
                    TesteurService
                ]
            })
            .overrideTemplate(TesteurComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TesteurComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TesteurService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new Testeur(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.testeurs[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
