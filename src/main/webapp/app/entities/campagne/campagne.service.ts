import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, BaseRequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { Campagne } from './campagne.model';
import { DateUtils } from 'ng-jhipster';

@Injectable()
export class CampagneService {

    private resourceUrl = 'api/campagnes';
    private resourceSearchUrl = 'api/_search/campagnes';

    constructor(private http: Http, private dateUtils: DateUtils) { }

    create(campagne: Campagne): Observable<Campagne> {
        const copy: Campagne = Object.assign({}, campagne);
        copy.datedebut = this.dateUtils
            .convertLocalDateToServer(campagne.datedebut);
        copy.datefin = this.dateUtils
            .convertLocalDateToServer(campagne.datefin);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    update(campagne: Campagne): Observable<Campagne> {
        const copy: Campagne = Object.assign({}, campagne);
        copy.datedebut = this.dateUtils
            .convertLocalDateToServer(campagne.datedebut);
        copy.datefin = this.dateUtils
            .convertLocalDateToServer(campagne.datefin);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    find(id: number): Observable<Campagne> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            const jsonResponse = res.json();
            jsonResponse.datedebut = this.dateUtils
                .convertLocalDateFromServer(jsonResponse.datedebut);
            jsonResponse.datefin = this.dateUtils
                .convertLocalDateFromServer(jsonResponse.datefin);
            return jsonResponse;
        });
    }

    query(req?: any): Observable<Response> {
        const options = this.createRequestOption(req);
        return this.http.get(this.resourceUrl, options)
            .map((res: Response) => this.convertResponse(res))
        ;
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(`${this.resourceUrl}/${id}`);
    }

    search(req?: any): Observable<Response> {
        const options = this.createRequestOption(req);
        return this.http.get(this.resourceSearchUrl, options)
            .map((res: any) => this.convertResponse(res))
        ;
    }

    private convertResponse(res: Response): Response {
        const jsonResponse = res.json();
        for (let i = 0; i < jsonResponse.length; i++) {
            jsonResponse[i].datedebut = this.dateUtils
                .convertLocalDateFromServer(jsonResponse[i].datedebut);
            jsonResponse[i].datefin = this.dateUtils
                .convertLocalDateFromServer(jsonResponse[i].datefin);
        }
        res.json().data = jsonResponse;
        return res;
    }

    private createRequestOption(req?: any): BaseRequestOptions {
        const options: BaseRequestOptions = new BaseRequestOptions();
        if (req) {
            const params: URLSearchParams = new URLSearchParams();
            params.set('page', req.page);
            params.set('size', req.size);
            if (req.sort) {
                params.paramsMap.set('sort', req.sort);
            }
            params.set('query', req.query);

            options.search = params;
        }
        return options;
    }
}
