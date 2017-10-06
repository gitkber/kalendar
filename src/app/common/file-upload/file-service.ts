import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class FileService {
    _baseURL: string;

    constructor(private http: Http) {
        this._baseURL = 'http://localhost:xxxx/api/fileupload/';
    }

    upload(files, parameters) {
        const headers = new Headers();
        const options = new RequestOptions({headers: headers});
        options.params = parameters;
        return this.http.post(this._baseURL + 'upload', files, options)
            .map(response => response.json())
            .catch(error => Observable.throw(error));

    }

    getImages() {
        return this.http.get(this._baseURL + 'getimages')
            .map(response => response.json())
            .catch(error => Observable.throw(error));
    }
}
