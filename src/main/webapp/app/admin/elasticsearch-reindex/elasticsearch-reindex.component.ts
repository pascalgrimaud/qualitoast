import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiLanguageService } from 'ng-jhipster';
import { ElasticsearchReindexService } from './elasticsearch-reindex.service';

@Component({
    selector: 'jhi-elasticsearch-reindex',
    templateUrl: './elasticsearch-reindex.component.html'
})
export class ElasticsearchReindexComponent {

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private elasticsearchReindexService: ElasticsearchReindexService
    ) {
        this.jhiLanguageService.setLocations(['elasticsearch-reindex']);
    }

    reindex() {
        console.log('HELLO: elasticsearch-reindex component');
        this.elasticsearchReindexService.reindex();
    }
}
