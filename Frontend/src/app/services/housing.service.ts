import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http'
import { map } from 'rxjs/operators';
import { IPropertyBase } from '../models/iproperty-base';

@Injectable({
  providedIn: 'root'
})
export class HousingService {

  constructor(private _http: HttpClient) { }

  getAllProperties(_sellRent:number){
    return this._http.get<IPropertyBase[]>('data/properties.json').pipe(
      map(data=>{
        const propertiesArray: Array<IPropertyBase> = [];
        for (const id in data){
          if (data.hasOwnProperty(id) && data[id].SellRent === _sellRent){
            propertiesArray.push(data[id])
          }
        }
        return propertiesArray
      })
    )
  }
}
