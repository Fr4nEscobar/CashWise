import { Component } from '@angular/core';
import { User } from '../login/user.model';
import { UserVariableService } from '../user-variable.service';
import { Transaction } from '../login/user.transaction';
import { Income } from '../login/user.transaction';
import { Outcome } from '../login/user.transaction';
import { UserVerificationService } from '../user-verification.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent {
  user!: User
  userId!: Number
  isData: boolean = false
  incomeButtonOn: boolean = false
  outcomeButtonOn: boolean = false

  constructor(private userVariable: UserVariableService, private userVerification: UserVerificationService) {
    this.user = userVariable.getUser()
    this.userId = userVariable.getId()
    this.isData = true
  }

  clickOnIncome(){
    if((this.incomeButtonOn != this.outcomeButtonOn)&&(this.incomeButtonOn===false)){
      this.outcomeButtonOn = this.incomeButtonOn
      this.incomeButtonOn = !this.incomeButtonOn
    }else{
      this.incomeButtonOn = !this.incomeButtonOn
    }
  }

  clickOnOutcome(){
    if((this.outcomeButtonOn != this.incomeButtonOn)&&(this.outcomeButtonOn===false)){
      this.incomeButtonOn = this.outcomeButtonOn
      this.outcomeButtonOn = !this.outcomeButtonOn
    }else{
      this.outcomeButtonOn = !this.outcomeButtonOn
    }
  }


}