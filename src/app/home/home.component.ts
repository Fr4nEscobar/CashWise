import { Component, ViewChild } from '@angular/core';
import { User } from '../login/user.model';
import { UserVariableService } from '../user-variable.service';
import { Transaction } from '../login/user.transaction';
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
  participant: string = 'Sender'
  operator: string = ""

  transType!: string
  transDescp!: string
  transAmount!: number
  transDate!: Date
  transCat!: string
  transComm!: string
  transParticipant!: string
  transactions!: Transaction[]

  @ViewChild('transactionForm', { static: false }) transactionForm: any;

  constructor(private userVariable: UserVariableService, private userVerification: UserVerificationService) {
    this.user = userVariable.getUser()
    this.userId = userVariable.getId()
    this.isData = true
    
    this.transactions = this.user.transactions!
    console.log(this.transactions)
  }

  changeParticipant() {
    if(this.transType === 'income') {
      this.participant = 'Sender'
    } else {
      this.participant = 'Receiver'
    }
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
    let newDate = new Date(this.transDate)
    newDate.setDate(newDate.getDate()+1)
    let payDate = newDate.toDateString()
    if(this.transactionForm.valid) {
      if(this.transType==='income'){
        newTrans = new Transaction(this.transDescp, payDate, this.transAmount, this.transCat, this.transComm, this.transType, this.transParticipant)
        this.user.monthlyBudget! = this.user.monthlyBudget! + this.transAmount
      }else{
        newTrans = new Transaction(this.transDescp, payDate, this.transAmount, this.transCat, this.transComm, this.transType, this.transParticipant)
        this.user.monthlySpend! = this.user.monthlySpend! + this.transAmount
      }
      this.transactions.push(newTrans)
  
      this.transactionForm.resetForm()
      this.udpateTransactions()
    } else {
      alert("Required fields must be filled")
    }
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

  getCurrentDate(): string {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const day = today.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
}
