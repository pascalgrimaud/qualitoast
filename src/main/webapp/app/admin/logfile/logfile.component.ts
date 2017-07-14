import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { LogFileService } from './logfile.service';

@Component({
    selector: 'jhi-logfile',
    templateUrl: './logfile.component.html'
})
export class LogFileComponent implements OnInit {

    logtxt: string;

    constructor(
        private modalService: NgbModal,
        private logFileService: LogFileService
    ) { }

    ngOnInit() {
        this.logFileService.getLogFile().subscribe((logtxt) => this.logtxt = logtxt);
        console.log(this.logtxt);
    }
}
