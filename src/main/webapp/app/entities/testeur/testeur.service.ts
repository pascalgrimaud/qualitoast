import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { Testeur } from './testeur.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class TesteurService {

    private resourceUrl = SERVER_API_URL + 'api/testeurs';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/testeurs';

    constructor(private http: Http) { }

    create(testeur: Testeur): Observable<Testeur> {
        const copy = this.convert(testeur);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(testeur: Testeur): Observable<Testeur> {
        const copy = this.convert(testeur);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Testeur> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
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
        const result = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            result.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return new ResponseWrapper(res.headers, result, res.status);
    }

    /**
     * Convert a returned JSON object to Testeur.
     */
    private convertItemFromServer(json: any): Testeur {
        const entity: Testeur = Object.assign(new Testeur(), json);
        return entity;
    }

    /**
     * Convert a Testeur to a JSON which can be sent to the server.
     */
    private convert(testeur: Testeur): Testeur {
        const copy: Testeur = Object.assign({}, testeur);
        return copy;
    }
}
