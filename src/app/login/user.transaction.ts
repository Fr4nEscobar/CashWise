export class Transaction {
    description?: string;
    date?: Date;
    amount?: number;
    category?: string;
    comment?: string;

    constructor(description: string, date: Date, amount: number, category: string, comment: string){
        this.description = description;
        this.date = date;
        this.amount = amount;
        this.category = category
        this.comment = comment

    }
}

export class Income extends Transaction {
    sender?: string;

    constructor(description: string, date: Date, amount: number, category:string, comment: string, sender:string) {
        super(description, date, amount, category, comment);
        this.sender = sender;
    }

}

export class Outcome extends Transaction {
    reciber?: string;

    constructor(description: string, date: Date, amount: number, category:string, comment: string, reciber:string) {
        super(description, date, amount,category, comment);
        this.reciber = reciber;
    }
}