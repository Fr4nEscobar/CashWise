import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from '../login/user.model';
import { UserVariableService } from '../user-variable.service';
import { Transaction } from '../login/user.transaction';
import { UserVerificationService } from '../user-verification.service';
import * as moment from 'moment';
import { Chart, ChartOptions } from 'chart.js';




@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  user!: User
  userId!: Number
  email!: String
  isData: boolean = false
  showForm: boolean = false
  textoBTrans: string = "New transaction"
  participant: string = 'Sender'
  operator: string = ""
  monthlySpend: number = 0
  monthlyRemaining: number = 0

  transType!: string
  transDescp!: string
  transAmount!: number
  transDate!: Date
  transCat!: string
  transComm!: string
  transParticipant!: string
  transactions!: Transaction[]
  chart!: any

  perMarket!: number
  perServices!: number
  perShopping!: number
  perTransport!: number
  perGastronomy!: number
  perTourism!: number
  perOthers!: number
  angleMarket!: number
  angleServices!: number
  angleShopping!: number
  angleTransport!: number
  angleGastronomy!: number
  angleTourism!: number
  angleOthers!: number
  percents: Number[] = []


  @ViewChild('transactionForm', { static: false }) transactionForm: any;

  constructor(private userVariable: UserVariableService, private userVerification: UserVerificationService) {
    this.user = userVariable.getUser()
    this.userId = userVariable.getId()
    this.isData = true

    this.user.renewalDate = this.checkRenewalDate()
    this.monthlySpend = this.calculateMonthlySpend()
    this.monthlyRemaining = this.user.monthlyBudget! - this.monthlySpend

    this.transactions = this.user.transactions!
    console.log(this.transactions)

    this.setGraph()

  }

  ngOnInit(): void {
    this.setGraph()
    this.createGraph()
  }

  createGraph() {
    this.percents = [this.perMarket, this.perServices, this.perShopping, this.perTransport, this.perGastronomy, this.perTourism, this.perOthers];

    const colors = ['#d2c677', '#cfd277', '#b9d277' , '#a2d277' , '#84d277', '#77d288', '#77d2a8']; // Colores para cada porcentaje

    const canvas = document.getElementById('pieChart') as HTMLCanvasElement;
    canvas.width = 128
    canvas.height = 128
    const ctx: CanvasRenderingContext2D | null = canvas.getContext('2d');

    

   if(ctx) {
    const chartOptions: ChartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
          position: 'bottom'
        }
      }
      
    }

        const chartData = {
          labels: ['Market', 'Services', 'Shopping', 'Transport', 'Gastronomy', 'Tourism', 'Others'],
          datasets: [{
            data: this.percents,
            backgroundColor: colors
          }]
        };

        this.chart = new Chart(ctx, {
          type: 'pie',
          data: chartData,
          options: chartOptions
        });
   }
  }

  changeParticipant() {
    if (this.transType === 'income') {
      this.participant = 'Sender'
    } else {
      this.participant = 'Receiver'
    }
  }

  calculateRemaining() {
    return this.user.totalIncome! - this.user.totalSpend!
  }

  calculateMonthlySpend(){
    let total = 0
    const finalDate = this.user.renewalDate!
    let finalDateArray = finalDate.split('-')
    let monthNumber = parseInt(finalDateArray[1], 10)-1
    const initialDate = finalDateArray[0]+'-'+(monthNumber.toString())+'-'+finalDateArray[2]
    
    this.user.transactions!.forEach(transaction => {
      if(transaction.type === 'outcome') {
        let transDate = moment(transaction.date).format('YYYY-MM-DD')
        if(this.sameOrAfter(transDate, initialDate) && this.isBefore(transDate, finalDate)){
          total += transaction.amount!
        }
      }
    });

    console.log('TOTAL: '+total)

    return total
  }

  isBefore(date1: string, date2: string) {
    let date1Array = date1?.split('-')
    let date2Array = date2?.split('-')

    if(date1Array[0]<date2Array[0]) {
      return true
    }else if(date1Array[0]===date2Array[0]) {
      if(date1Array[1]<date2Array[1]) {
        return true
      }else if(date1Array[1]===date2Array[1]) {
        if(date1Array[2]<date2Array[2]) {
          return true
        }
      }
    }
    console.log('isBefore failing')
    return false
  }

  sameOrAfter(date1: string, date2: string) {
    let date1Array = date1?.split('-')
    let date2Array = date2?.split('-')

    if(date1Array[0]>date2Array[0]) {
      return true
    }else if(date1Array[0]===date2Array[0]) {
      if(date1Array[1]>date2Array[1]) {
        return true
      }else if(date1Array[1]===date2Array[1]) {
        if(date1Array[2]>=date2Array[2]) {
          return true
        }
      }
    }
    return false
  }

  checkRenewalDate() {
    let now = moment().format('YYYY-MM-DD')
    let originalRenewal = this.user.renewalDate!
    let monthNumber!: number
    let newDate!: string

    if(this.sameOrAfter(now, originalRenewal)) {
      let originalRenewalArray = originalRenewal.split('-')
      monthNumber = parseInt(originalRenewalArray[1], 10)+1
      newDate = originalRenewalArray[0]+'-'+(monthNumber.toString())+'-'+originalRenewalArray[2]
      return newDate
    }
    
    return originalRenewal

  }

  changeContainer() {
    if (this.showForm) {
      this.showForm = false
      this.textoBTrans = "New transaction"
    } else {
      this.showForm = true
      this.textoBTrans = "Transaction list"
    }
  }

  addTransaction() {
    let newTrans: Transaction
    let newDate = moment(this.transDate)
    let payDate = this.concatenateDate(newDate)
    if (this.transactionForm.valid) {
      if (this.transType === 'income') {
        newTrans = new Transaction(this.transDescp, payDate, this.transAmount, this.transCat, this.transComm, this.transType, this.transParticipant)
        this.user.totalIncome! = this.user.totalIncome! + this.transAmount
      } else {
        newTrans = new Transaction(this.transDescp, payDate, this.transAmount, this.transCat, this.transComm, this.transType, this.transParticipant)
        this.user.totalSpend! = this.user.totalSpend! + this.transAmount
      }
      this.transactions.push(newTrans)

      this.transactionForm.resetForm()
      this.udpateTransactions()
    } else if(this.transAmount<1){
      alert('The amount cannot be less than 1')
    }
    else {
      alert("Required fields must be filled")
    }

    this.setGraph()
    this.chart.destroy()
    this.createGraph()
  }

  concatenateDate(date: any) {
    let day = date.get('date')
    let dayS = day.toString()
    if (dayS.length === 1) {
      dayS = '0' + dayS
    }

    let month = date.get('month') + 1
    let monthS = month.toString()
    if (monthS.length === 1) {
      monthS = '0' + monthS
    }

    let year = date.get('year')
    let yearS = year.toString()

    let d = yearS + '-' + monthS + '-' + dayS

    return d
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
    const today = moment();
    return this.concatenateDate(today);
  }

  getPercentage(category: string): number {
    let categoryTotal = 0
    this.user.transactions!.forEach(transaction => {
      if (transaction.category === category) {
        if (transaction.type === "outcome") {
          categoryTotal += transaction.amount!
        }
      }
    });

    return (categoryTotal / this.getTotalAmount()) * 100;
  }

  getTotalAmount(): number {
    let total = 0
    this.user.transactions!.forEach(transaction => {
      if (transaction.type === "outcome") {
        total = total + transaction.amount!
      }
    });

    return total
  }

  setGraph() {
    this.perMarket = this.getPercentage('market')
    this.perServices = this.getPercentage('services')
    this.perShopping = this.getPercentage('shopping')
    this.perTransport = this.getPercentage('transport')
    this.perGastronomy = this.getPercentage('gastronomy')
    this.perTourism = this.getPercentage('tourism')
    this.perOthers = this.getPercentage('others')

    this.angleMarket = (360 * this.perMarket) / 100;
    this.angleServices = (360 * this.perServices) / 100;
    this.angleShopping = (360 * this.perShopping) / 100;
    this.angleTransport = (360 * this.perTransport) / 100;
    this.angleGastronomy = (360 * this.perGastronomy) / 100;
    this.angleTourism = (360 * this.perTourism) / 100;
    this.angleOthers = (360 * this.perOthers) / 100;
  }

  shortPercentage(percentage: number){
    const decimals = 2;

    const shortPercentage = percentage.toFixed(decimals);

    return shortPercentage

  }




}
