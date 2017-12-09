/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { QualiToastTestModule } from '../../../test.module';
import { TypeTestDialogComponent } from '../../../../../../main/webapp/app/entities/type-test/type-test-dialog.component';
import { TypeTestService } from '../../../../../../main/webapp/app/entities/type-test/type-test.service';
import { TypeTest } from '../../../../../../main/webapp/app/entities/type-test/type-test.model';

describe('Component Tests', () => {

    describe('TypeTest Management Dialog Component', () => {
        let comp: TypeTestDialogComponent;
        let fixture: ComponentFixture<TypeTestDialogComponent>;
        let service: TypeTestService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [QualiToastTestModule],
                declarations: [TypeTestDialogComponent],
                providers: [
                    TypeTestService
                ]
            })
            .overrideTemplate(TypeTestDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TypeTestDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TypeTestService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new TypeTest(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.typeTest = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'typeTestListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new TypeTest();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.typeTest = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'typeTestListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
