export class Transaction {
    description?: string;
    date?: Date;
    amount?: number;
    category?: string;
    comment?: string;
    type?: string
    participant?: string

    constructor(description: string, date: Date, amount: number, category: string, comment: string, type: string, participant: string){
        this.description = description;
        this.date = date;
        this.amount = amount;
        this.category = category
        this.comment = comment
        this.type = type
        this.participant = participant
    }
}

export class Payment {
    description?: string;
    date?: Date;
    amount?: number;
    category?: string;
    comment?: string;
    recurrent?: boolean = false
    participant?: string

    constructor(description: string, date: Date, amount: number, category: string, comment: string, recurrent: boolean, participant: string){
        this.description = description;
        this.date = date;
        this.amount = amount;
        this.category = category
        this.comment = comment
        this.recurrent = recurrent
        this.participant = participant
    }
}
