import { Component } from '@angular/core';
import { User } from '../login/user.model';
import { UserVariableService } from '../user-variable.service';
import { Transaction } from '../login/user.transaction';
import { Income } from '../login/user.transaction';
import { Outcome } from '../login/user.transaction';
import { UserVerificationService } from '../user-verification.service';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  user!: User
  userId!: Number
  email!: String
  isData: boolean = false
  showForm: boolean = false
  textoBTrans: string = "New transaction"

  transType!: string
  transDescp!: string
  transAmount!: number
  transDate!: Date
  transCat!: string
  transComm!: string
  transParticipant!: string
  transactions!: Transaction[]

  

  constructor(private userVariable: UserVariableService, private userVerification: UserVerificationService) {
    this.user = userVariable.getUser()
    this.userId = userVariable.getId()
    this.isData = true
    
    this.transactions = this.user.transactions!
    console.log(this.transactions)
  }

  calculateRemaining(){
     return this.user.monthlyBudget! - this.user.monthlySpend!
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
    let newTrans: Transaction
    if(this.transType==='income'){
      newTrans = new Income(this.transDescp, this.transDate, this.transAmount, this.transCat, this.transComm, this.transParticipant)
      this.user.monthlyBudget! = this.user.monthlyBudget! + this.transAmount
    }else{
      newTrans = new Outcome(this.transDescp, this.transDate, this.transAmount, this.transCat, this.transComm, this.transParticipant)
      this.user.monthlySpend! = this.user.monthlySpend! + this.transAmount
    }
    this.transactions.push(newTrans)
    console.log(this.transactions)
    
    this.udpateTransactions()
  }

  udpateTransactions() {
    this.user.transactions = this.transactions

    this.userVerification.updateUser(this.user, this.userId).subscribe(
      response => {
        console.log('Usuario actualizado con éxito:', response)
      },
      error => {
        console.log('El usuario no se puedo actualizar:', error)
      })
  }
}
