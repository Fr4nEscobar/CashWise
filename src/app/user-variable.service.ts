import { Injectable } from '@angular/core';
import { User } from './login/user.model';
import { UserVerificationService } from './user-verification.service';
import { Transaction } from "./login/user.transaction";
import { Income } from "./login/user.transaction";
import { Outcome } from "./login/user.transaction";

@Injectable({
  providedIn: 'root'
})

export class UserVariableService {
  user!: User
  userId!: Number
  
  

  constructor( private userVerification: UserVerificationService) { 

  }

getId() {
  return this.userId
}
  
getUser(){
  return this.user
}
  setUser(user: User, userId: number) {
    this.user = user
    this.userId = userId
  }

}
