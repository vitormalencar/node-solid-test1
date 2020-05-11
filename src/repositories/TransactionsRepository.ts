import Transaction from '../models/Transaction';

interface TransactionType {
  title: string;

  value: number;

  type: 'income' | 'outcome';
}

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface TransactionResponse {
  transactions: Transaction[];
  balance: Balance;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): TransactionResponse {
    const balance = this.getBalance();
    const transactions = {
      transactions: this.transactions,
      balance,
    };

    return transactions;
  }

  public getBalance(): Balance {
    const sumReducer = (
      accumulator: number,
      transaction: TransactionType,
    ): number => accumulator + transaction.value;

    const income = this.transactions
      .filter(({ type }) => type === 'income')
      .reduce(sumReducer, 0);

    const outcome = this.transactions
      .filter(({ type }) => type === 'outcome')
      .reduce(sumReducer, 0);

    const total = income - outcome;

    return {
      outcome,
      income,
      total,
    };
  }

  public create({ title, value, type }: TransactionType): Transaction {
    const transaction = new Transaction({ title, value, type });
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
