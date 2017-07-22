import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Campagne } from './campagne.model';
import { CampagneService } from './campagne.service';

@Injectable()
export class CampagnePopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private campagneService: CampagneService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.campagneService.find(id).subscribe((campagne) => {
                    if (campagne.datedebut) {
                        campagne.datedebut = {
                            year: campagne.datedebut.getFullYear(),
                            month: campagne.datedebut.getMonth() + 1,
                            day: campagne.datedebut.getDate()
                        };
                    }
                    if (campagne.datefin) {
                        campagne.datefin = {
                            year: campagne.datefin.getFullYear(),
                            month: campagne.datefin.getMonth() + 1,
                            day: campagne.datefin.getDate()
                        };
                    }
                    this.ngbModalRef = this.campagneModalRef(component, campagne);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.campagneModalRef(component, new Campagne());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    campagneModalRef(component: Component, campagne: Campagne): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.campagne = campagne;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true });
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}
