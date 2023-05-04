import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http'
import { map } from 'rxjs/operators';
import { IProperty } from '../property/IProperty.interface';

@Injectable({
  providedIn: 'root'
})
export class HousingService {

  constructor(private _http: HttpClient) { }

  getAllProperties(_sellRent:number){
    return this._http.get<IProperty[]>('data/properties.json').pipe(
      map(data=>{
        const propertiesArray: Array<IProperty> = [];
        for (const id in data){
          if (data.hasOwnProperty(id) && data[id].sellRent === _sellRent){
            propertiesArray.push(data[id])
          }
        }
        return propertiesArray
      })
    )
  }
}