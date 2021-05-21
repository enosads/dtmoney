import {createContext, ReactNode, useContext, useEffect, useState} from "react";
import {api} from "../services/api";

interface Transaction {
    id: number,
    title: string,
    amount: number,
    category: string,
    createdAt: string,
    type: string
}

type TransactionInput = Omit<Transaction, 'id' | 'createdAt'>;

// type TransactionInput = Pick<Transaction, 'title' | 'amount' | 'type' | 'category' >;

interface TransactioProviderProps {
    children: ReactNode
}

interface TransactionsContextData {
    transactions: Transaction[],
    createTransaction: (transaction: TransactionInput) => Promise<void>;
}

const TransactionsContext = createContext<TransactionsContextData>(
    {} as TransactionsContextData
);

export function TransactionProvider(props: TransactioProviderProps) {
    const [transactions, setTransactions] = useState<Transaction[]>([]);

    useEffect(() => {
        api.get('transactions')
            .then(response => setTransactions(response.data.transactions));
    }, [])

    async function createTransaction(transactionInput: TransactionInput) {
        const response = await api.post('transactions', transactionInput);
        const {transaction} = response.data;
        setTransactions([...transactions, transaction]);
    }

    return (
        <TransactionsContext.Provider value={{transactions, createTransaction}}>
            {props.children}
        </TransactionsContext.Provider>
    )
}

export function useTransactions(){
    return useContext(TransactionsContext);
}