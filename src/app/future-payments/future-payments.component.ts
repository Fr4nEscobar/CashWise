import { Component, ViewChild } from '@angular/core';
import { User } from '../login/user.model';
import { UserVariableService } from '../user-variable.service';
import { Transaction, Payment } from '../login/user.transaction';
import { UserVerificationService } from '../user-verification.service';
import { Notification } from '../login/user.notifications'; //new
import * as moment from 'moment';

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
  }

  paymentDone(p: Payment) {
    let index = this.user.payments!.indexOf(p);
    if (index !== -1) {
      this.paymentToTransaction(p)
      this.deleteNotifications(p)
      
    
      if (p.recurrent!.toString() === 'true') {

        this.recurrentPayment(p)
      }else{
      }

      this.user.totalSpend = this.user.totalSpend! + p.amount!
      
      this.user.payments!.splice(index, 1)
      
      this.updatePayments()

    }
    
  }


  deletePayment(){
    let p = this.paymentsList[this.index]
    this.paymentsList.splice(this.index, 1)
    this.updatePayments()
    this.deleteNotifications(p)
    this.showEdit = false;
    this.showList = true;
    this.textoBTrans = 'New payment';
  }



  editPayment(i: number) {
    let p = this.paymentsList[i]
    this.index = i

    this.editPayDescp = p.description!
    this.editPayAmount = p.amount!
    console.log('p.date: ', p.date!)
    let newDate = moment(p.date!)
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

    this.updatePayments()
    this.notSaveChanges()

  }

  recurrentPayment(p: Payment) {
    let date = moment(p.date!)
    date.add(1, 'months')
    let dateS = this.concatenateDate(date)
    console.log('tipo fecha actualizada: ', typeof date)
    this.paymentsList.push(new Payment(p.description!, dateS, p.amount!, p.category!, p.comment!, p.recurrent!, p.participant!))
    this.updatePayments()

  }

  paymentToTransaction(p: Payment) {
    let newDate = moment()
    newDate.hour(0)
    newDate.minute(0)
    newDate.second(0)
    newDate.millisecond(0)
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
    console.log('Fecha formulario: ', this.date)
    let newDate = moment(this.date)
    console.log('Moment recien creado: ', newDate)
    let payDate = this.concatenateDate(newDate)
    console.log('Moment string: ', payDate)
    console.log(this.payRecurrent)
   if(this.paymentForm.valid){
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
   }else if(this.payAmount<1){
    alert('The amount cannot be less than 1')
  }
  else {
    alert("Required fields must be filled")
  }
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

  calculateDays(date: string) {
    const currentDate = moment();
    const targetDate = moment(date);

    targetDate.hour(23)
    targetDate.minute(59)
    
    const days = targetDate.diff(currentDate, 'days');

    return days
  }

  concatenateDate(date: any){
    let day = date.get('date')
    let dayS = day.toString()
    if(dayS.length===1){
      dayS = '0'+dayS
    }

    let month = date.get('month')+1
    let monthS = month.toString()
    if(monthS.length===1){
      monthS = '0'+monthS
    }

    let year = date.get('year')
    let yearS = year.toString()

    let d = yearS+'-'+monthS+'-'+dayS

    return d
  }


}