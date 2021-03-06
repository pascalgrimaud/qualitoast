/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';

import { QualiToastTestModule } from '../../../test.module';
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
                    TesteurService
                ]
            })
            .overrideTemplate(TesteurDetailComponent, '')
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

                spyOn(service, 'find').and.returnValue(Observable.of(new Testeur(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.testeur).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
