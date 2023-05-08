import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http'
import { map } from 'rxjs/operators';
import { IPropertyBase } from '../models/iproperty-base';
import { Property } from '../models/property';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HousingService {

  constructor(private _http: HttpClient) { }

  getProperty(_id: number){
    return this.getAllProperties().pipe(
          map(propertiesArray => {
          //throw new Error('Some Error');
          return propertiesArray.find(p=> p.Id === _id) as Property;
         })
       );
  }

  getAllProperties(_sellRent?:number): Observable<Property[]>{
    return this._http.get<Property[]>('data/properties.json').pipe(
      map(data=>{
        const propertiesArray: Array<Property> = [];
        const localProperties = JSON.parse(localStorage.getItem('newProp')!);

        if (localProperties){
          for (const id in localProperties){
            if (_sellRent){
              if (localProperties.hasOwnProperty(id) && localProperties[id].SellRent === _sellRent){
                propertiesArray.push(localProperties[id]);
              }
            } else{
              propertiesArray.push(localProperties[id]);
            }
          }
        }

        for (const id in data){
          if (_sellRent){
            if (data.hasOwnProperty(id) && data[id].SellRent === _sellRent){
              propertiesArray.push(data[id])
            }
          } else{
            propertiesArray.push(data[id])
          }
        }
        return propertiesArray
      })
    )
  }

  addProperty(_property: Property){
    //localStorage.setItem('newProp', JSON.stringify(_property));

    let props:Property[] = [];
    
    let properties = localStorage.getItem('newProp');
    if (properties){
      let prop = JSON.parse(properties);
      console.log(prop)

      const arr = Array.from(prop) as Property[];
      arr.forEach((p: Property) => {
        props.push(p);
      });
    }
    props.push(_property);
    localStorage.setItem('newProp', JSON.stringify(props));
  }

  newPropertyId(){
    const pid =  localStorage.getItem('PID')
    if (pid){
      const updatePID = String(+pid + 1);
      localStorage.setItem('PID', updatePID);
      return +updatePID;
    } else {
      localStorage.setItem('PID', '101');
      return 101;
    }
  }
}
