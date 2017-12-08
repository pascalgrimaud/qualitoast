/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { QualiToastTestModule } from '../../../test.module';
import { TesteurDialogComponent } from '../../../../../../main/webapp/app/entities/testeur/testeur-dialog.component';
import { TesteurService } from '../../../../../../main/webapp/app/entities/testeur/testeur.service';
import { Testeur } from '../../../../../../main/webapp/app/entities/testeur/testeur.model';
import { TypeTestService } from '../../../../../../main/webapp/app/entities/type-test';
import { CampagneService } from '../../../../../../main/webapp/app/entities/campagne';

describe('Component Tests', () => {

    describe('Testeur Management Dialog Component', () => {
        let comp: TesteurDialogComponent;
        let fixture: ComponentFixture<TesteurDialogComponent>;
        let service: TesteurService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [QualiToastTestModule],
                declarations: [TesteurDialogComponent],
                providers: [
                    TypeTestService,
                    CampagneService,
                    TesteurService
                ]
            })
            .overrideTemplate(TesteurDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TesteurDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TesteurService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Testeur(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.testeur = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'testeurListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Testeur();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.testeur = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'testeurListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
