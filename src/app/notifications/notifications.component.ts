import { Component } from '@angular/core';
import { User } from '../login/user.model';
import { UserVariableService } from '../user-variable.service';
import { UserVerificationService } from '../user-verification.service';
import { Payment } from '../login/user.transaction';
import { Notification } from '../login/user.notifications';

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
        let daysLeftDate = new Date(this.payments[i].date!);
        let daysLeftInt = this.checkRemainingDays(daysLeftDate);
        daysLeftInt++

        if (daysLeftInt <= 7) {
          const exist = this.notifications.some(
            (notificacion) =>
              notificacion.description === this.payments[i].description
          );
          if (!exist) {
            let daysSinceDate = new Date()
            let daysSinceInt = this.checkRemainingDays(daysLeftDate)
            daysSinceInt = daysSinceInt * (-1)
            let aux = new Notification(this.payments[i].description!, daysSinceDate, daysSinceInt, daysLeftInt, this.payments[i].participant!, this.payments[i].amount!);
            this.notifications.push(aux);
          }
        }
      }
    }
    this.udpateNotificationsInUser();
  }

  checkRemainingDays(d: Date) {
    let date = new Date();

    let remaining = d.getTime() - date.getTime();
    let daysLeft = remaining / (1000 * 60 * 60 * 24);
    let daysLeftInt: number = parseInt(daysLeft.toString(), 10);
    
    return daysLeftInt;
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
      let date = new Date(notification.issueDate!)
      let remainingDays = Math.abs(this.checkRemainingDays(date))
      console.log(remainingDays)
      notification.timeSince = remainingDays;
    });
  }
}
