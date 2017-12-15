/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { QualiToastTestModule } from '../../../test.module';
import { CampagneDialogComponent } from '../../../../../../main/webapp/app/entities/campagne/campagne-dialog.component';
import { CampagneService } from '../../../../../../main/webapp/app/entities/campagne/campagne.service';
import { Campagne } from '../../../../../../main/webapp/app/entities/campagne/campagne.model';
import { ApplicationService } from '../../../../../../main/webapp/app/entities/application';
import { TypeTestService } from '../../../../../../main/webapp/app/entities/type-test';
import { ResultatService } from '../../../../../../main/webapp/app/entities/resultat';
import { TesteurService } from '../../../../../../main/webapp/app/entities/testeur';

describe('Component Tests', () => {

    describe('Campagne Management Dialog Component', () => {
        let comp: CampagneDialogComponent;
        let fixture: ComponentFixture<CampagneDialogComponent>;
        let service: CampagneService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [QualiToastTestModule],
                declarations: [CampagneDialogComponent],
                providers: [
                    ApplicationService,
                    TypeTestService,
                    ResultatService,
                    TesteurService,
                    CampagneService
                ]
            })
            .overrideTemplate(CampagneDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CampagneDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CampagneService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Campagne(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.campagne = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'campagneListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Campagne();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.campagne = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'campagneListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
