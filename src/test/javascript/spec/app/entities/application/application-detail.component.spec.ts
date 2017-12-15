/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';

import { QualiToastTestModule } from '../../../test.module';
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
                    ApplicationService
                ]
            })
            .overrideTemplate(ApplicationDetailComponent, '')
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

                spyOn(service, 'find').and.returnValue(Observable.of(new Application(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.application).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
