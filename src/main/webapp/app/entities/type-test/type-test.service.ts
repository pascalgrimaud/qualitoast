import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { TypeTest } from './type-test.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class TypeTestService {

    private resourceUrl = SERVER_API_URL + 'api/type-tests';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/type-tests';

    constructor(private http: Http) { }

    create(typeTest: TypeTest): Observable<TypeTest> {
        const copy = this.convert(typeTest);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(typeTest: TypeTest): Observable<TypeTest> {
        const copy = this.convert(typeTest);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<TypeTest> {
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
     * Convert a returned JSON object to TypeTest.
     */
    private convertItemFromServer(json: any): TypeTest {
        const entity: TypeTest = Object.assign(new TypeTest(), json);
        return entity;
    }

    /**
     * Convert a TypeTest to a JSON which can be sent to the server.
     */
    private convert(typeTest: TypeTest): TypeTest {
        const copy: TypeTest = Object.assign({}, typeTest);
        return copy;
    }
}
