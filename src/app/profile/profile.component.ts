import { Component, OnInit } from '@angular/core';
import { User } from '../login/user.model';
import { UserVariableService } from '../user-variable.service';
import { UserVerificationService } from '../user-verification.service';
import { generate } from 'rxjs';
import * as moment from 'moment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent{
  user!: User
  userId!: Number
  userPassword: String = ''
  isData!: boolean
  changeName?: string
  changeEmail?: string
  changePassword?: string
  changeMonthlyI?: number
  changeMonthlyB?: number
  changeMonthlyS?: number
  changeRenewalD?: number
  changePreferredC?: string

  constructor(private userVariable: UserVariableService, private userVerification: UserVerificationService) {
    this.user = userVariable.getUser()
    this.userId = userVariable.getId()
    this.isData = true
    this.changeName = this.user.name
    this.changeEmail = this.user.email
    this.changePassword = this.user.password
    this.changeMonthlyI = this.user.monthlyIncome
    this.changeMonthlyB = this.user.monthlyBudget
    this.changeRenewalD = this.getDay(this.user.renewalDate!)
    this.changePreferredC = this.user.preferredCurrency
    this.userPassword = this.generateStringByLength(this.user.password!.length)
  }


  changeDataUser(){
    if (this.changeName !== '') {
      this.user.name = this.changeName
    } 
    if (this.changeEmail !== '') {
      this.user.email = this.changeEmail
    }
    if (this.changePassword !== '') {
      this.user.password = this.changePassword
    } 
    if (this.changeMonthlyI !== undefined) {
      this.user.monthlyIncome = this.changeMonthlyI
    }
    if (this.changeMonthlyB !== undefined) {
      this.user.monthlyBudget = this.changeMonthlyB
    } 
    if (this.changeRenewalD !== undefined && this.changeRenewalD < 31 && this.changeRenewalD > 0) {
      this.user.renewalDate =  this.generateRenewalDate(this.changeRenewalD)
    }
    if (this.changePreferredC !== this.user.preferredCurrency) {
      this.user.preferredCurrency = this.changePreferredC
    } 
  
    this.userVerification.updateUser(this.user, this.userId).subscribe(
      response => {
        console.log('Usuario actualizado con éxito:', response)
      },
      error => {
        console.log('El usuario no se puedo actualizar:', error)
      }
      
    )
  }

  generateStringByLength(len: number){
    let pass: String = ''
    for(let i=0; i<len; i++){
      pass+='*'
    }
    return pass
  }

  generateRenewalDate(dayNumber: number){
    const now = moment();
    const day = dayNumber.toString()
    let date!: string
    
    if(dayNumber > now.date()){
      const momentDate = moment([now.year(), now.month(), day])
      date = momentDate.format('YYYY-MM-DD').toString()
    }else {  
      let nowPlusMonth = now.add(1, 'months')
      const momentDate = moment([nowPlusMonth.year(), nowPlusMonth.month(), day])

      date = momentDate.format('YYYY-MM-DD').toString()
    }

    console.log('MONTH: '+date+', '+typeof date)
    
    return date
   }

   getDay(date: string){
    const dateParts = date.split('-');
    const day = parseInt(dateParts[2], 10)
    return day
   }

}
