import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class UserVariableService {
  value!: any
  constructor() { 

  }

  setUser(value: any) {
    this.value = value;
  }

  getUser() {
    return this.value;
  }
}
