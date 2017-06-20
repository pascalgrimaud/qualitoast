import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ElasticsearchReindexService } from './elasticsearch-reindex.service';
import { ElasticsearchReindexModalComponent } from './elasticsearch-reindex-modal.component';

@Component({
    selector: 'jhi-elasticsearch-reindex',
    templateUrl: './elasticsearch-reindex.component.html'
})
export class ElasticsearchReindexComponent {

    constructor(
        private modalService: NgbModal,
        private elasticsearchReindexService: ElasticsearchReindexService
    ) { }

    showConfirm() {
        const modalRef = this.modalService.open(ElasticsearchReindexModalComponent);
        modalRef.result.then((result) => {
            // Left blank intentionally, nothing to do here
        }, (reason) => {
            // Left blank intentionally, nothing to do here
        });
    }
}
