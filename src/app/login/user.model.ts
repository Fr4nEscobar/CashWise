import { Transaction, Payment } from "./user.transaction";
import { Notification } from "./user.notifications";
import * as moment from "moment";


export class User {
    name?: string;
    email?: string;
    password?: string;
    transactions?: Transaction[];
    monthlyIncome?: number;
    monthlyBudget?: number;
    totalIncome?: number;
    totalSpend?: number;
    renewalDate?: string;
    preferredCurrency?: string;
    payments?: Payment[]
    notifications?: Notification[] 
 
   constructor(name: string, email: string, password: string){
     this.name = name;
     this.email = email;
     this.password = password;
     this.transactions = []
     this.monthlyIncome = 0;
     this.monthlyBudget = 0;
     this.totalIncome = 0;
     this.totalSpend = 0;
     this.renewalDate = this.generateRenewalDate(1);
     this.preferredCurrency = "ARS";


     this.payments = []
     this.notifications = []
   }

   generateRenewalDate(dayNumber: number){
    const now = moment();
    const day = dayNumber.toString()
    let date!: string
    if(dayNumber < now.date()){
      const momentDate = moment([now.year(), now.month(), day])
      date = momentDate.format('YYYY-MM-DD').toString()
    }else {
      const momentDate = moment([now.year(), (now.month()+1), day])
      date = momentDate.format('YYYY-MM-DD').toString()
    }
    
    return date
   }

 }
