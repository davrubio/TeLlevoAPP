import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

  async saveLocalStorage(key: string, value: any) {
    return await Preferences.set({key: key, value: JSON.stringify(value)})
  }

  async getFromLocalStorage(value: string) {
    return (await Preferences.get({key: value})).value;
  }
}
