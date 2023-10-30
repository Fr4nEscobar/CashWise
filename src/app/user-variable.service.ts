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
  
  

  constructor( private userVerification: UserVerificationService) { 
    console.log(this.user)
  }

  
getUser(){
  console.log(this.user)
  return this.user
}
  setUser(user: User) {
    this.user = user
  }

}
