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
  value!: any
  usersArray!: any[]
  //User atributes:
  name!: string;
  email!: string;
  password!: string;
  transactions!: Transaction[];
  monthlyBudget!: number;
  monthlySpend!: number;
  preferredCurrency!: string;
  //Other atributes:
  userPassword!: string
  userId!: number
  

  constructor( private userVerification: UserVerificationService) { 

  }

  async obtainUserData(): Promise<any> {
    try {
        const data = await this.userVerification.bringUsers().toPromise();
        if (data) {
            this.usersArray = data;
            let user!: any
            //const user = this.usersArray.find(user => user.email === this.email);
            for (const us of this.usersArray) {
              if(us.email === this.email){
                user = us
              }
            }
            console.log(data)
            if (user) {
                this.userId = user.id
                this.userPassword = user.password
                this.name = user.name
                this.email = user.email
                this.password = user.password
                this.transactions = user.transaction
                this.monthlyBudget = user.monthlyBudget
                this.monthlySpend = user.monthlySpend
                this.preferredCurrency = user.preferredCurrency
                return user;
            } else {
                console.log("Usuario no encontrado");
            }
        } else {
            this.usersArray = [];
            console.log("No hay datos de usuarios");
        }

        return null;
    } catch (error) {
        console.error('Error al obtener datos de usuarios', error);
        return null;
    }
}

getUser(){
  let user = new User(this.name, this.email, this.password)
  user.transactions = this.transactions
  user.monthlyBudget = this.monthlyBudget
  user.monthlySpend = this.monthlySpend
  user.preferredCurrency = this.preferredCurrency
  return user
}
  setUser(user: any) {
    this.name = user.name
    this.email = user.email
    this.password = user.password
    this.transactions = user.transaction
    this.monthlyBudget = user.monthlyBudget
    this.monthlySpend = user.monthlySpend
    this.preferredCurrency = user.preferredCurrency
  }

}
