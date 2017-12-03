import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { Campagne } from './campagne.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class CampagneService {

    private resourceUrl = SERVER_API_URL + 'api/campagnes';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/campagnes';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(campagne: Campagne): Observable<Campagne> {
        const copy = this.convert(campagne);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(campagne: Campagne): Observable<Campagne> {
        const copy = this.convert(campagne);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Campagne> {
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
     * Convert a returned JSON object to Campagne.
     */
    private convertItemFromServer(json: any): Campagne {
        const entity: Campagne = Object.assign(new Campagne(), json);
        entity.datedebut = this.dateUtils
            .convertLocalDateFromServer(json.datedebut);
        entity.datefin = this.dateUtils
            .convertLocalDateFromServer(json.datefin);
        return entity;
    }

    /**
     * Convert a Campagne to a JSON which can be sent to the server.
     */
    private convert(campagne: Campagne): Campagne {
        const copy: Campagne = Object.assign({}, campagne);
        copy.datedebut = this.dateUtils
            .convertLocalDateToServer(campagne.datedebut);
        copy.datefin = this.dateUtils
            .convertLocalDateToServer(campagne.datefin);
        return copy;
    }
}
