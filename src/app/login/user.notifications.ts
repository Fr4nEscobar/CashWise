export class Notification{
    description?: string
    issueDate?: string
    timeSince?: number
    timeLeft?: number
    participant?: string
    amount?: number
    active?: boolean

constructor(description: string, issueDate: string, timeSince: number, timeleft: number, participant: string, amount: number){
    this.description = description;
    this.issueDate = issueDate;
    this.timeSince = timeSince;
    this.timeLeft = timeleft;
    this.participant = participant;
    this.amount = amount;
    this.active = true;
    
}
}