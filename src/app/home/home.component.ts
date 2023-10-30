import { Component } from '@angular/core';
import { User } from '../login/user.model';
import { UserVariableService } from '../user-variable.service';
import { Transaction } from '../login/user.transaction';
import { Income } from '../login/user.transaction';
import { Outcome } from '../login/user.transaction';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  user!: User
  email!: String
  isData!: boolean
  showForm: boolean = false
  textoBTrans: string = "New transaction"

  transType!: string
  transDescp!: string
  transAmount!: number
  transDate!: Date
  transCat!: string
  transComm!: string
  transParticipant!: string

  

  constructor(private userVariable: UserVariableService) {
    this.initUserData()
    this.user = userVariable.getUser()
    console.log(this.user)
  }

  async initUserData(){
    this.user = await this.userVariable.obtainUserData();
    this.isData = true
  }

  calculateRemaining(){
    return this.userVariable.monthlyBudget - this.userVariable.monthlySpend
  }

  changeContainer() {
    if(this.showForm) {
      this.showForm = false
      this.textoBTrans = "New transaction"
    } else {
      this.showForm = true
      this.textoBTrans = "Transaction list"
    }
  }

  addTransaction(){
    let newTrans!: Transaction

    if(this.transType==='income'){
      newTrans = new Income(this.transDescp, this.transDate, this.transAmount, this.transCat, this.transComm, this.transParticipant)
    }else{
      newTrans = new Outcome(this.transDescp, this.transDate, this.transAmount, this.transCat, this.transComm, this.transParticipant)
    }

    this.userVariable.transactions.push(newTrans)
    
  }
}
