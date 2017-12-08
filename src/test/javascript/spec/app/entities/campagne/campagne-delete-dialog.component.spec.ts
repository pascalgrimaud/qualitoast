/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { QualiToastTestModule } from '../../../test.module';
import { CampagneDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/campagne/campagne-delete-dialog.component';
import { CampagneService } from '../../../../../../main/webapp/app/entities/campagne/campagne.service';

describe('Component Tests', () => {

    describe('Campagne Management Delete Component', () => {
        let comp: CampagneDeleteDialogComponent;
        let fixture: ComponentFixture<CampagneDeleteDialogComponent>;
        let service: CampagneService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [QualiToastTestModule],
                declarations: [CampagneDeleteDialogComponent],
                providers: [
                    CampagneService
                ]
            })
            .overrideTemplate(CampagneDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CampagneDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CampagneService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(Observable.of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
