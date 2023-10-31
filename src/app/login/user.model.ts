import { Transaction } from "./user.transaction";
import { Income } from "./user.transaction";
import { Outcome } from "./user.transaction";


export class User {
    name?: string;
    email?: string;
    password?: string;
    transactions?: Transaction[];
    monthlyBudget?: number;
    monthlySpend?: number;
    preferredCurrency?: string;
 
   constructor(name: string, email: string, password: string){
     this.name = name;
     this.email = email;
     this.password = password;
     this.transactions = []
     this.monthlyBudget = 0;
     console.log(typeof this.monthlyBudget)
     this.monthlySpend = 0;
     this.preferredCurrency = "ARS";
   }

 }
