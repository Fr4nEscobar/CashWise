import { Transaction, Payment } from "./user.transaction";
import { Notification } from "./user.notifications";


export class User {
    name?: string;
    email?: string;
    password?: string;
    transactions?: Transaction[];
    monthlyBudget?: number;
    monthlySpend?: number;
    preferredCurrency?: string;
    payments?: Payment[]
    notifications?: Notification[] 
 
   constructor(name: string, email: string, password: string){
     this.name = name;
     this.email = email;
     this.password = password;
     this.transactions = []
     this.monthlyBudget = 0;
     this.monthlySpend = 0;
     this.preferredCurrency = "ARS";
     this.payments = []
     this.notifications = []
   }

 }
