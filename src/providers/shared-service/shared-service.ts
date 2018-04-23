import { Injectable } from '@angular/core';

/*
  Generated class for the SharedServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SharedServiceProvider {
  userSettingsData = {
    language: ""
  }

  constructor() {
  }

  setSettingsData(val: any){
    alert("this is a val" + val);
    // this.userSettingsData = val;
    // let data = val;

    // console.log(data['language']);



    return val;
  }

  getSettingsData(){
    // alert("this is teh getting data method"+ this.userSettingsData);
    return this.userSettingsData;
  }

}
