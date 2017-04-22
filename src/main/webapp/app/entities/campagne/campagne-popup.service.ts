import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Campagne } from './campagne.model';
import { CampagneService } from './campagne.service';
@Injectable()
export class CampagnePopupService {
    private isOpen = false;
    constructor(
        private modalService: NgbModal,
        private router: Router,
        private campagneService: CampagneService

    ) {}

    open(component: Component, id?: number | any): NgbModalRef {
        if (this.isOpen) {
            return;
        }
        this.isOpen = true;

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
                this.campagneModalRef(component, campagne);
            });
        } else {
            return this.campagneModalRef(component, new Campagne());
        }
    }

    campagneModalRef(component: Component, campagne: Campagne): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.campagne = campagne;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true });
            this.isOpen = false;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true });
            this.isOpen = false;
        });
        return modalRef;
    }
}
