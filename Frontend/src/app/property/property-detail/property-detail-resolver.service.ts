import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, catchError, of } from 'rxjs';
import { Property } from 'src/app/models/property';
import { HousingService } from 'src/app/services/housing.service';

@Injectable({
    providedIn: 'root'
})
export class PropertyDetailResolverService implements Resolve<Property> {
    
    constructor(private _housingService: HousingService, private _router: Router){}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): 
        Property | Observable<Property> | Promise<Property>| any {
        const propID = route.params['id']
        return this._housingService.getProperty(+propID).pipe(
            catchError(error =>{
                this._router.navigate(['/'])
                return of(null);
            })
        );
    }
}