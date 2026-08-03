
interface AtmI {
    withdraw(quantity: number): void;
}


const BILLS_AND_COINS = [500, 200, 100, 50, 20, 10, 5, 2, 1];


export const Atm = ():AtmI => {

    const addBill = (billsEntries: string[], bill: number, billCount: number) => {
        if (billCount === 0) {
            return
        }

        const billEntry = bill < 5 ? "coin" : "bill";        
        const plural =  billCount > 1 ? "s" : "";
        const billText = `${billCount} ${billEntry}${plural}`;

        billsEntries.push(`${billText} of ${bill}`);
    }

    const withdraw  = (quantity: number) => {
        let remainingAmount = quantity;
        const billsEntries: string[] = [];

        for(const bill of BILLS_AND_COINS) {
            const billCount = Math.floor(remainingAmount / bill);
            remainingAmount -= billCount * bill;
            addBill(billsEntries, bill, billCount);
        }

        return billsEntries.join(", ")+".";
    }

    return { withdraw };
}
