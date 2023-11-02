export class Notification{
    description?: string;
    timeLeft?: number
    participant?: string
    amount?: number

constructor(description: string, timeleft: number, participant: string, amount: number){
    this.description = description;
    this.timeLeft = timeleft
    this.participant = participant
    this.amount = amount;
}
}