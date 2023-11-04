import { Component, ViewChild } from '@angular/core';
import { User } from '../login/user.model';
import { UserVariableService } from '../user-variable.service';
import { Transaction, Payment } from '../login/user.transaction';
import { UserVerificationService } from '../user-verification.service';
import { Notification } from '../login/user.notifications'; //new

@Component({
  selector: 'app-future-payments',
  templateUrl: './future-payments.component.html',
  styleUrls: ['./future-payments.component.css'],
})
export class FuturePaymentsComponent {
  user!: User;
  userId!: Number;
  isData: boolean = false;
  clickedIndex: Number = -1;
  showForm: boolean = false;
  textoBTrans: string = 'New Payment';
  operator: string = '';

  payType!: string;
  payDescp!: string;
  payAmount!: number;
  payDate!: Date;
  payCat!: string;
  payParticipant!: string;
  payComm!: string;
  payRecurrent!: boolean;
  paymentsList: Payment[] = [];
  notifications: Notification[] = []; 
  transactions: Transaction[] = []

  @ViewChild('paymentForm', { static: false }) paymentForm: any;

  constructor(
    
    private userVariable: UserVariableService,
    private userVerification: UserVerificationService,
  ) {
    this.user = userVariable.getUser();
    this.userId = userVariable.getId();
    this.isData = true;

    this.paymentsList = this.user.payments!;
    this.notifications = this.user.notifications!;
    this.paymentsCheck()
  }

  deletePayment(p: Payment) {
    let index = this.user.payments!.indexOf(p);
    if (index !== -1) {
      this.paymentToTransaction(p)
      this.deleteNotifications(p)

      if(p.recurrent){
        this.recurrentPayment(p)
      } 
      this.user.monthlySpend = this.user.monthlySpend! + p.amount!
        this.user.payments!.splice(index, 1)
      
    }
  }

  paymentsCheck(){
    
  }

  editPayment(p: Payment){

  }
  recurrentPayment(p: Payment){
     let date = new Date(p.date!)
     date.setMonth(date.getMonth() + 1)
     this.paymentsList.push(new Payment(p.description!, date, p.amount!, p.category!, p.comment!, p.recurrent!, p.participant!))
     this.updatePayments()
     
    }

  paymentToTransaction(p: Payment){
    let t = new Transaction(p.description!, new Date(), p.amount!, p.category!, p.comment!, 'outcome', p.participant!)
    this.user.transactions?.push(t)
  }

  deleteNotifications(p: Payment) {
    let i = 0;
    for (let i = 0; i < this.user.notifications!.length; i++) {
      if (this.user.notifications![i].description === p.description) {
    
        this.user.notifications?.splice(i, 1);
      }
    }  
  }

  expandPayment(index: Number) {
    this.clickedIndex = index === this.clickedIndex ? -1 : index;
  }

  changeContainer() {
    if (this.showForm) {
      this.showForm = false;
      this.textoBTrans = 'New payment';
    } else {
      this.showForm = true;
      this.textoBTrans = 'Payments list';
    }
  }

  addPayment() {
    let newPayment: Payment;
    newPayment = new Payment(
      this.payDescp,
      this.payDate,
      this.payAmount,
      this.payCat,
      this.payComm,
      this.payRecurrent,
      this.payParticipant
    );
    this.paymentsList.push(newPayment);

    this.paymentForm.resetForm();
    this.updatePayments();
  }

  updatePayments() {
    this.user.payments! = this.paymentsList;

    this.userVerification.updateUser(this.user, this.userId).subscribe(
      (response) => {
        console.log('Usuario actualizado con éxito:', response);
      },
      (error) => {
        console.log('El usuario no se puedo actualizar:', error);
      }
    );
  }
}