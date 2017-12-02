import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class LogFileService {

    constructor(private http: Http) { }

    getLogFile(): Observable<any> {
        return this.http.get('management/logfile').map((res: Response) => res.text());
//        return this.http.get('api/authenticate').map((res: Response) => res);
    }
//
//    findAll(): Observable<Log[]> {
//            return this.http.get('management/logs').map((res: Response) => res.json());
//        }
}
