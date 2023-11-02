import { Component, ViewChild } from '@angular/core';
import { User } from '../login/user.model';
import { UserVariableService } from '../user-variable.service';
import { Transaction, Payment } from '../login/user.transaction';
import { UserVerificationService } from '../user-verification.service';

@Component({
  selector: 'app-future-payments',
  templateUrl: './future-payments.component.html',
  styleUrls: ['./future-payments.component.css']
})
export class FuturePaymentsComponent {
  user!: User
  userId!: Number
  isData: boolean = false
  clickedIndex: Number = -1;
  showForm: boolean = false
  textoBTrans: string = "New Payment"
  operator: string = ""

  payType!: string
  payDescp!: string
  payAmount!: number
  payDate!: Date
  payCat!: string
  payParticipant!: string
  payComm!: string
  payRecurrent!: boolean
  paymentsList: Payment[] = []

  @ViewChild('paymentForm', { static: false }) paymentForm: any;

  constructor(private userVariable: UserVariableService, private userVerification: UserVerificationService) {
    this.user = userVariable.getUser()
    this.userId = userVariable.getId()
    this.isData = true

    this.paymentsList = this.user.payments!
  }

  expandPayment(index: Number) {
    this.clickedIndex = index === this.clickedIndex ? -1 : index;
  }

  changeContainer() {
    if(this.showForm) {
      this.showForm = false
      this.textoBTrans = "New payment"
    } else {
      this.showForm = true
      this.textoBTrans = "Payments list"
    }
  }

  addPayment(){
    let newPayment: Payment
    newPayment = new Payment(this.payDescp, this.payDate, this.payAmount, this.payCat, this.payComm, this.payRecurrent, this.payParticipant)
      this.paymentsList.push(newPayment)
  
      this.paymentForm.resetForm()
      this.updatePayments()
    
  }

  updatePayments() {
    this.user.payments! = this.paymentsList

    this.userVerification.updateUser(this.user, this.userId).subscribe(
      response => {
        console.log('Usuario actualizado con éxito:', response)
      },
      error => {
        console.log('El usuario no se puedo actualizar:', error)
      })
  }


}
