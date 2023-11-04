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
  showList: boolean = true;
  showForm: boolean = false;
  showEdit: boolean = false;
  textoBTrans: string = 'New Payment';
  operator: string = '';

  date!: Date
  payDescp!: string;
  payAmount!: number;
  payCat!: string;
  payParticipant!: string;
  payComm!: string;
  payRecurrent!: boolean;

  editDate!: string
  editPayDescp!: string;
  editPayAmount!: number;
  editPayCat!: string;
  editPayParticipant!: string;
  editPayComm!: string;
  editPayRecurrent!: boolean;
  index!: number

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

      if (p.recurrent) {
        this.recurrentPayment(p)
      }
      this.user.monthlySpend = this.user.monthlySpend! + p.amount!
      this.user.payments!.splice(index, 1)

    }
  }

  paymentsCheck() {
    
  }

  editPayment(i: number) {
    let p = this.paymentsList[i]
    this.index = i

    this.editPayDescp = p.description!
    this.editPayAmount = p.amount!
    console.log('p.date: ', p.date!)
    let newDate = new Date(p.date!)
    console.log('newDate: ', newDate)
    this.editDate = this.concatenateDate(newDate);
    console.log('editDate: ', this.editDate)
    this.editPayCat = p.category!
    this.editPayParticipant = p.participant!
    this.editPayComm = p.comment!
    this.editPayRecurrent = p.recurrent!

    if (this.showEdit) {
      this.showEdit = false;
      this.showList = true;
      this.textoBTrans = 'New payment';
    } else {
      this.showList = false;
      this.showEdit = true;
      this.textoBTrans = 'back';
    }

  }

  notSaveChanges(){
      this.showEdit = false;
      this.showList = true;
      this.textoBTrans = 'New payment';
  }

  saveChanges(){
    let p = this.paymentsList[this.index]

    p.description = this.editPayDescp
    p.amount = this.editPayAmount
    p.date = this.editDate
    p.category = this.editPayCat
    p.participant = this.editPayParticipant
    p.comment = this.editPayComm
    p.recurrent = this.editPayRecurrent

    this.paymentsList[this.index] = p

    this.notSaveChanges()

  }

  recurrentPayment(p: Payment) {
    let date = new Date(p.date!)
    date.setMonth(date.getMonth() + 1)
    let dateS = this.concatenateDate(date)
    console.log('tipo fecha actualizada: ', typeof date)
    this.paymentsList.push(new Payment(p.description!, dateS, p.amount!, p.category!, p.comment!, p.recurrent!, p.participant!))
    this.updatePayments()

  }

  paymentToTransaction(p: Payment) {
    let newDate = new Date()
    let payDate = this.concatenateDate(newDate)
    let t = new Transaction(p.description!, payDate, p.amount!, p.category!, p.comment!, 'outcome', p.participant!)
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
    if (this.showList) {
      this.showEdit = false;
      this.showList = false;
      this.showForm = true;
      this.textoBTrans = 'Payments list';
      
    } else {
      this.showEdit = false;
      this.showForm = false;
      this.showList = true;
      this.textoBTrans = 'New payment';
    }
  }

  addPayment() {
    let newPayment: Payment;
    let newDate = new Date(this.date)
    let payDate = this.concatenateDate(newDate)
    newPayment = new Payment(
      this.payDescp,
      payDate,
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

  concatenateDate(date: Date){
    let day = date.getDate()
    let dayS = day.toString()
    if(dayS.length===1){
      dayS = '0'+dayS
    }

    let month = date.getMonth()
    let monthS = day.toString()
    if(monthS.length===1){
      monthS = '0'+monthS
    }

    let year = date.getFullYear()

    let d = year+'-'+monthS+'-'+dayS

    return d
  }
}