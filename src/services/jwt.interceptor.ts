import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { JwtHelper } from "./jwt-helper.service";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

    constructor(private jwtHelper: JwtHelper) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this.jwtHelper.getToken();

        if(token)
            req = req.clone({
                setHeaders: {
                    Authorization: 'Bearer '+token,
                }
            });
            
           
        return next.handle(req);
    }

}