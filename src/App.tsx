import {GlobalStyle} from './styles/global'
import {Header} from "./components/Header";
import {Dashboard} from "./components/Dashboard";
import Modal from "react-modal";
import {useState} from "react";
import {NewTransactionModal} from "./components/NewTransactionModal";
import {TransactionProvider} from "./hooks/useTransactions";

// Questões de acessibilidade, quando o modal for aberto adiciona
// ao app element um atributo que indica que o conteudo abaixo do modal não está visível
Modal.setAppElement("#root");

export function App() {

    const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] = useState(false)

    function handleOpenNewTransactionModal() {
        setIsNewTransactionModalOpen(true);
    }

    function handleCloseNewTransactionModal() {
        setIsNewTransactionModalOpen(false);
    }

    return (
        <TransactionProvider>
            <Header onOpenNewTransactionModal={handleOpenNewTransactionModal}/>
            <Dashboard/>
            <NewTransactionModal
                isOpen={isNewTransactionModalOpen}
                onRequestClose={handleCloseNewTransactionModal}
            />
            <GlobalStyle/>
        </TransactionProvider>
    );
}

