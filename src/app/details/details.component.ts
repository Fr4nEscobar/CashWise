import { Component } from '@angular/core';
import { User } from '../login/user.model';
import { UserVariableService } from '../user-variable.service';
import { Transaction } from '../login/user.transaction';
import { UserVerificationService } from '../user-verification.service';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent {
  user!: User;
  userId!: Number;
  isData: boolean = false;
  incomeButtonOn: boolean = false;
  outcomeButtonOn: boolean = false;
  clickedIndex: Number = -1;
  incomeList: Transaction[] = [];
  outcomeList: Transaction[] = [];

  constructor(
    private userVariable: UserVariableService,
    private userVerification: UserVerificationService
  ) {
    this.user = userVariable.getUser();
    this.userId = userVariable.getId();
    this.user.transactions?.forEach((t) => {
      if (t.type === 'income') {
        this.incomeList.push(t);
      } else {
        this.outcomeList.push(t);
      }
    });
    console.log(this.user.preferredCurrency);
    this.isData = true;
  }

  clickOnIncome() {
    if (
      this.incomeButtonOn != this.outcomeButtonOn &&
      this.incomeButtonOn === false
    ) {
      this.outcomeButtonOn = this.incomeButtonOn;
      this.incomeButtonOn = !this.incomeButtonOn;
    } else {
      this.incomeButtonOn = !this.incomeButtonOn;
    }
  }

  clickOnOutcome() {
    if (
      this.outcomeButtonOn != this.incomeButtonOn &&
      this.outcomeButtonOn === false
    ) {
      this.incomeButtonOn = this.outcomeButtonOn;
      this.outcomeButtonOn = !this.outcomeButtonOn;
    } else {
      this.outcomeButtonOn = !this.outcomeButtonOn;
    }
  }

  expandTransfer(index: Number) {
    this.clickedIndex = index === this.clickedIndex ? -1 : index;
  }

 
  exportToPDF() {
    const doc = new jsPDF();

    let transactionsArray = [...this.user.transactions!]
    let totalAmount = this.calculateTotal()
    let operator!: string
    if(totalAmount>=0){
      operator = '+'
    }else{
      operator = '-'
      totalAmount = Math.abs(totalAmount)
    }
    let totalTransactions = new Transaction('', 'TOTAL', this.calculateTotal(), '', '', operator, '')
    transactionsArray?.push(totalTransactions)

    const orderedData = transactionsArray!.map((transaction) => [
      transaction.date!,
      transaction.description!,
      transaction.category!,
      transaction.participant!,
      transaction.type!,
      transaction.amount!,
    ]);

    const logoImg = new Image();
    logoImg.src = './../../assets/icons/greenLogoLarge.png';

    logoImg.onload = function () {
    doc.addImage(logoImg, 'PNG', 14, 2, 30, 10);

    autoTable(doc, {
      head: [
        ['Date', 'Description', 'Category', 'Participant', 'Type', 'Amount'],
      ],
      body: orderedData,
      headStyles: {
        fillColor: [134, 195, 50], 
        textColor: [0, 0, 0] 
      }
    });

    doc.save('Transactions.pdf');
    }

    transactionsArray = []
  }


  calculateTotal(){
    let total = 0
    this.user.transactions!.forEach(element => {
      if(element.type === "income"){
        total += element.amount!
        console.log('income')
      }else if(element.type === "outcome"){
        total -= element.amount!
        console.log('outcome')
      }
    });

    return total
  }
}
