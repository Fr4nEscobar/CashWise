import { Component } from '@angular/core';
import { User } from '../login/user.model';
import { UserVariableService } from '../user-variable.service';
import { UserVerificationService } from '../user-verification.service';
import { Payment } from '../login/user.transaction';
import { Notification } from '../login/user.notifications';


@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent {

  user!: User
  userId!: Number
  isData: boolean = false
  payments: Payment[] = []
  notifications: Notification[] = []
expand: boolean = false


constructor(private userVariable: UserVariableService, private userVerification: UserVerificationService) {
  this.user = userVariable.getUser()
  this.userId = userVariable.getId()
  this.isData = true
  this.payments = this.user.payments!
  this.notifications = this.user.notifications!
  if(this.payments){
  this.notificationsList()
  }
}


expandNotifications(){
this.expand = !this.expand
}



notificationsList(){
  let date = new Date()
  if(this.payments){
  this.payments.forEach(p => {
    let fechaDate = new Date(p.date!)
      let remaining = fechaDate.getTime() - date.getTime()
    let daysLeft = remaining / (1000 * 60 * 60 * 24)
    let daysLeftInt: number = parseInt(daysLeft.toString(), 10);
    daysLeftInt++;


    if(daysLeftInt <= 7){
      const exist = this.notifications.some(notificacion => notificacion.description === p.description)
      if(!exist) {
        let aux = new Notification(p.description!, daysLeftInt, p.participant!, p.amount!)
        this.notifications.push(aux)
      }
    }
  });
}
  this.udpateNotifications();
}

udpateNotifications() {
  this.user.notifications = this.notifications
  this.userVerification.updateUser(this.user, this.userId).subscribe(
    response => {
      console.log('Usuario actualizado con éxito:', response)
    },
    error => {
      console.log('El usuario no se puedo actualizar:', error)
    })
}
}
