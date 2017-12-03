import { Injectable } from '@angular/core';
import { Http , HttpModule } from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class RedditService {
    http: any;
    baseUrl: String;

    constructor(http: Http) {
        this.http = http;
        this.baseUrl = 'https://www.reddit.com';
    }

    getTops(limit) {
        return this.http.get(this.baseUrl+'/'+'top.json?limit='+limit)
            .map(resp => resp.json());
    }
}


