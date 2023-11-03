export class Notification{
    description?: string
    issueDate?: Date
    timeSince?: number
    timeLeft?: number
    participant?: string
    amount?: number

constructor(description: string, issueDate: Date, timeSince: number, timeleft: number, participant: string, amount: number){
    this.description = description;
    this.issueDate = issueDate;
    this.timeSince = timeSince;
    this.timeLeft = timeleft;
    this.participant = participant;
    this.amount = amount;
    
}
}