import { Component } from '@angular/core';
import { User } from '../login/user.model';
import { UserVariableService } from '../user-variable.service';
import { UserVerificationService } from '../user-verification.service';
import { Payment } from '../login/user.transaction';
import { Notification } from '../login/user.notifications';
import * as moment from 'moment';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css'],
})
export class NotificationsComponent {
  user!: User;
  userId!: Number;
  isData: boolean = false;
  payments: Payment[] = [];
  notifications: Notification[] = [];

  constructor(
    private userVariable: UserVariableService,
    private userVerification: UserVerificationService
  ) {
    this.user = userVariable.getUser();
    this.userId = userVariable.getId();
    this.isData = true;
    this.payments = this.user.payments!;
    this.notifications = this.user.notifications!;
    if (this.payments) {
      this.notificationsList();
      this.updateNotifications();
    }
  }

  notificationsList() {
    if (this.payments) {
      for (let i = 0; i < this.payments.length; i++) {
        let daysLeftDate = moment(this.payments[i].date!);
        let daysLeftInt = this.checkRemainingDays(daysLeftDate);
        daysLeftInt++

        if (daysLeftInt <= 7) {
          const exist = this.notifications.some(
            (notificacion) =>
              notificacion.description === this.payments[i].description
          );
          if (!exist) {
            let daysSinceDate = moment()
            let daysSinceDateS = this.concatenateDate(daysSinceDate)
            let daysSinceInt = this.checkRemainingDays(daysLeftDate)
            daysSinceInt = daysSinceInt * (-1)
            let aux = new Notification(this.payments[i].description!, daysSinceDateS, daysSinceInt, daysLeftInt, this.payments[i].participant!, this.payments[i].amount!);
            this.notifications.push(aux);
          }
        }
      }
    }
    this.udpateNotificationsInUser();
  }

  checkRemainingDays(d: any) {
    const currentDate = moment();

    currentDate.hour(23)
    currentDate.minute(59)
    
    const remaining = d.diff(currentDate, 'days');
    
    return remaining;
  }



  udpateNotificationsInUser() {
    this.user.notifications = this.notifications;
    this.userVerification.updateUser(this.user, this.userId).subscribe(
      (response) => {
        console.log('Usuario actualizado con éxito:', response);
      },
      (error) => {
        console.log('El usuario no se puedo actualizar:', error);
      }
    );
  }

  updateNotifications() {
    this.notifications.forEach((notification) => {
      let date = moment(notification.issueDate!)
      let remainingDays = Math.abs(this.checkRemainingDays(date))
      notification.timeSince = remainingDays;
    });
  }

  deleteNotification(notificacion: Notification){
    this.notifications.forEach(n => {
      if(n.description === notificacion.description){
        n.active = false;
        this.udpateNotificationsInUser()
      }
    });
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
