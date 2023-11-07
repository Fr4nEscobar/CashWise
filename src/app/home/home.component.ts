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

  transType!: string
  transDescp!: string
  transAmount!: number
  transDate!: Date
  transCat!: string
  transComm!: string
  transParticipant!: string
  transactions!: Transaction[]

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

    this.transactions = this.user.transactions!
    console.log(this.transactions)


  }

  ngOnInit(): void {
    this.setGraph()
    this.percents = [this.perMarket, this.perServices, this.perShopping, this.perTransport, this.perGastronomy, this.perTourism, this.perOthers];

    const colors = ['#FF5733', '#3498db', '#2ecc71' , '#A3412C' , '#198CFF', '#0AA524', '#F111E7']; // Colores para cada porcentaje

    const canvas = document.getElementById('pieChart') as HTMLCanvasElement;
    const ctx: CanvasRenderingContext2D | null = canvas.getContext('2d');

   if(ctx) {
    const chartOptions: ChartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
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

        new Chart(ctx, {
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
    return this.user.monthlyBudget! - this.user.monthlySpend!
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
        this.user.monthlyBudget! = this.user.monthlyBudget! + this.transAmount
      } else {
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
}
