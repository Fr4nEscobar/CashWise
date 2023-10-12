export class Transaction {
    description?: string;
    date?: Date;
    amount?: number;
    comment?: string;

    constructor(description: string, date: Date, amount: number, comment: string){
        this.description = description;
        this.date = date;
        this.amount = amount;
        this.comment = comment

    }
}

export class Income extends Transaction {
    sender?: string;

    constructor(description: string, date: Date, amount: number, sender:string, comment: string) {
        super(description, date, amount, comment);
        this.sender = sender;
    }

}

export class Outcome extends Transaction {
    reciber?: string;

    constructor(description: string, date: Date, amount: number, reciber:string, comment: string) {
        super(description, date, amount, comment);
        this.reciber = reciber;
    }
}