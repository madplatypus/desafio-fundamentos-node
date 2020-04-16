import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const incomeSum = (
      accumulator: number,
      currentValue: Transaction,
    ): number => {
      const value = currentValue.type === 'income' ? currentValue.value : 0;
      return accumulator + value;
    };

    const outcomeSum = (
      accumulator: number,
      currentValue: Transaction,
    ): number => {
      const value = currentValue.type === 'outcome' ? currentValue.value : 0;
      return accumulator + value;
    };
    const income = this.transactions.reduce(incomeSum, 0);
    const outcome = this.transactions.reduce(outcomeSum, 0);
    const total = income - outcome;
    return {
      income,
      outcome,
      total,
    };
  }

  public create({ title, type, value }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, type, value });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
