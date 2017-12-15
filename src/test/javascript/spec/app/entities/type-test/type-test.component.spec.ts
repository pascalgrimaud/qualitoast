/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';

import { QualiToastTestModule } from '../../../test.module';
import { TypeTestComponent } from '../../../../../../main/webapp/app/entities/type-test/type-test.component';
import { TypeTestService } from '../../../../../../main/webapp/app/entities/type-test/type-test.service';
import { TypeTest } from '../../../../../../main/webapp/app/entities/type-test/type-test.model';

describe('Component Tests', () => {

    describe('TypeTest Management Component', () => {
        let comp: TypeTestComponent;
        let fixture: ComponentFixture<TypeTestComponent>;
        let service: TypeTestService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [QualiToastTestModule],
                declarations: [TypeTestComponent],
                providers: [
                    TypeTestService
                ]
            })
            .overrideTemplate(TypeTestComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TypeTestComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TypeTestService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new TypeTest(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.typeTests[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
