import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { Testeur } from './testeur.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class TesteurService {

    private resourceUrl = 'api/testeurs';
    private resourceSearchUrl = 'api/_search/testeurs';

    constructor(private http: Http) { }

    create(testeur: Testeur): Observable<Testeur> {
        const copy = this.convert(testeur);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    update(testeur: Testeur): Observable<Testeur> {
        const copy = this.convert(testeur);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    find(id: number): Observable<Testeur> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            return res.json();
        });
    }

    query(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceUrl, options)
            .map((res: Response) => this.convertResponse(res));
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(`${this.resourceUrl}/${id}`);
    }

    search(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceSearchUrl, options)
            .map((res: any) => this.convertResponse(res));
    }

    private convertResponse(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        return new ResponseWrapper(res.headers, jsonResponse);
    }

    private convert(testeur: Testeur): Testeur {
        const copy: Testeur = Object.assign({}, testeur);
        return copy;
    }
}
