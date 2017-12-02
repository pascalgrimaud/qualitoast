import { Component, OnInit } from '@angular/core';
import { LogFileService } from './logfile.service';

@Component({
    selector: 'jhi-logfile',
    templateUrl: './logfile.component.html'
})
export class LogFileComponent implements OnInit {

    logtxt: string;

    constructor(
        private logFileService: LogFileService
    ) { }

    ngOnInit() {
        this.logFileService.getLogFile().subscribe((logtxt) => this.logtxt = logtxt);
    }
}
