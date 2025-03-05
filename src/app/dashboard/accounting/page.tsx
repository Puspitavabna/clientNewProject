"use client"
import NavLink from '@/src/app/(auth)/NavLink';
import { useEffect, useState } from 'react';
import WithdrawalHistoryPage from '../refund-payment/page';
import OnlinePaymentPage from '../online-payment/page';
import WithdrawModal from './WithdrawalModal/page';
import DepositModal from './DepositModal/page';
import Modal from './Modal/page';

interface Props { }

const AccountingPage: React.FC<Props> = () => {
    const [isFirstVisit, setIsFirstVisit] = useState<boolean>(true);
    const [currency, setCurrency] = useState<string>('');
    const [showModal, setShowModal] = useState(false);
    // const [currentPage, setCurrentPage] = useState<'deposithistory' | 'withdrawhistory'>('deposithistory');
    const [modalType, setModalType] = useState<'deposithistory' | 'withdrawhistory' | 'deposit' | 'withdraw' | null>(null);

    const openModalWithPage = (page: 'deposithistory' | 'withdrawhistory' | 'deposit' | 'withdraw') => {
        setModalType(page);
        setShowModal(true);
    };
    
    const closeModal = () => {
        setShowModal(false);
        setModalType(null);
    };
    


    // Check if user has already visited on component mount
    useEffect(() => {
        const hasVisited = localStorage.getItem('hasVisited');
        if (hasVisited) {
            setIsFirstVisit(false);
        }
    }, []);

    // Function to handle saving the selected currency
    const handleSave = () => {
        if (currency) {
            localStorage.setItem('currency', currency);
            localStorage.setItem('hasVisited', 'true');
            setIsFirstVisit(false);
        } else {
            alert('Please select a currency');
        }
    };

    return (
        (<div className='min-h-[80vh] flex items-center justify-center bg-gray-500 rounded-xl'>
            {/* First time visit interface */}
            {isFirstVisit ? (
                <div className="flex flex-col items-center">
                    <h2 className="text-xl font-semibold mb-4">Set Your Account Currency</h2>
                    <div className='flex gap-3 bg-[#D5D6EA] px-3 py-4 mt-3 rounded-xl'>
                        <select
                            value={currency}
                            onChange={(e) => setCurrency(e.target.value)}
                            className="border border-gray-300 rounded-lg p-2 mb-4 w-64"
                        >
                            <option value="">Select Currency</option>
                            <option value="USD">USD</option>
                            <option value="EUR">EUR</option>
                            <option value="GBP">GBP</option>
                        </select>
                        <button
                            onClick={handleSave}
                            className="bg-blue-500 text-white h-[40px] px-4 rounded-lg hover:bg-blue-600"
                        >
                            Save
                        </button>

                    </div>
                </div>
            ) : (
                /* Second interface after the first visit */
                (<div className="account-dashboard flex flex-col items-center max-w-full mx-auto m-0 p-0 rounded-lg">
                    <div className="flex items-center gap-10 -mt-20 justify-between space-x-4 mb-24">
                        <div className='flex justify-around gap-4'>
                            <button
                                onClick={() => openModalWithPage('withdraw')}
                                className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600">
                                Withdraw
                            </button>
                            
                            <button
                                onClick={() => openModalWithPage('deposithistory')}
                                className="bg-blue-500 text-white px-4 py-2 rounded"
                            >
                                Withdraw History
                            </button>
                        </div>
                        <div className='flex justify-around gap-4'>
                            <button
                                onClick={() => openModalWithPage('withdrawhistory')}
                                className="bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-orange-600 flex items-center gap-2">
                                Deposit History
                            </button>
                        
                            <button 
                                onClick={() => openModalWithPage('deposit')}
                                className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600">
                                Deposit
                            </button>
                        </div>
                    </div>
                    <Modal show={showModal} onClose={closeModal} size={'large'}>
                        {modalType === 'withdrawhistory' && <OnlinePaymentPage />}
                        {modalType === 'deposithistory' && <WithdrawalHistoryPage />}
                        {modalType === 'withdraw' && <WithdrawModal />}
                        {modalType === 'deposit' && <DepositModal />}
                    </Modal>
                    <div className="flex flex-col items-center justify-center">
                            {/* Other metrics */}
                            <div className="flex items-center justify-center gap-4">
                                {/* Total Paid Amount Button */}
                                <button className="bg-gray-100 rounded-lg text-center h-24 w-40 flex flex-col justify-center items-center">
                                    <span className="text-xl font-bold">476.36</span>
                                    <span>Total Paid Amount</span>
                                </button>

                                {/* Circle for Current Balance */}

                                <div className="relative">
                                    <div className="flex items-center justify-center">
                                        {/* Outer Circle with First Border */}
                                        <div className="rounded-full border-4 border-gray-300 p-2 bg-blue-900 flex items-center justify-center">
                                            {/* Inner Circle with Second Border */}
                                            <div className="rounded-full border-4 border-gray-400 bg-gray-200 h-48 w-48 flex items-center justify-center">
                                                <h2 className="text-3xl font-bold text-center">
                                                    $523.64 <br />
                                                    <span className="font-normal text-xl">Current Balance</span>
                                                </h2>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                                {/* Total Deposit Amount Button */}
                                <button className="bg-gray-100 rounded-lg text-center h-24 w-48 flex flex-col justify-center items-center">
                                    <span className="text-xl font-bold">1,000</span>
                                    <span>Total Deposit Amount</span>
                                </button>
                            </div>
          
        </div>
                </div>)
        )}
        </div>)
    );     
};

export default AccountingPage;
