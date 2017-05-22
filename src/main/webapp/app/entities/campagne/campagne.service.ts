import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { DateUtils } from 'ng-jhipster';

import { Campagne } from './campagne.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class CampagneService {

    private resourceUrl = 'api/campagnes';
    private resourceSearchUrl = 'api/_search/campagnes';

    constructor(private http: Http, private dateUtils: DateUtils) { }

    create(campagne: Campagne): Observable<Campagne> {
        const copy = this.convert(campagne);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            this.convertItemFromServer(jsonResponse);
            return jsonResponse;
        });
    }

    update(campagne: Campagne): Observable<Campagne> {
        const copy = this.convert(campagne);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            this.convertItemFromServer(jsonResponse);
            return jsonResponse;
        });
    }

    find(id: number): Observable<Campagne> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            const jsonResponse = res.json();
            this.convertItemFromServer(jsonResponse);
            return jsonResponse;
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
        for (let i = 0; i < jsonResponse.length; i++) {
            this.convertItemFromServer(jsonResponse[i]);
        }
        return new ResponseWrapper(res.headers, jsonResponse);
    }

    private convertItemFromServer(entity: any) {
        entity.datedebut = this.dateUtils
            .convertLocalDateFromServer(entity.datedebut);
        entity.datefin = this.dateUtils
            .convertLocalDateFromServer(entity.datefin);
    }

    private convert(campagne: Campagne): Campagne {
        const copy: Campagne = Object.assign({}, campagne);
        copy.datedebut = this.dateUtils
            .convertLocalDateToServer(campagne.datedebut);
        copy.datefin = this.dateUtils
            .convertLocalDateToServer(campagne.datefin);
        return copy;
    }
}
