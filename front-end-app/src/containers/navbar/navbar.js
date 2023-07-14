import './style.scss';
import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';

import { Modal } from '../../components/modal/modal';
import {authContext} from '../../contexts/authContext';

import numeral from 'numeral';
import axios from 'axios';

const enumState = {
    HIDDEN: 'hidden',
    CLOSE: 'close',
    VISIBLE: 'visible'
}

const baseTrans = 18000;

export const Navbar = (props) => {
    const {myWallet} = useContext(authContext);
    const [modalState, setModalState] = useState(enumState.HIDDEN);
    const [step, setStep] = useState(1);
    const [amount, setAmount] = useState(1);
    const [address, setAddress] = useState(1);
    const [price, setPrice] = useState(baseTrans);

    useEffect(()=>{
        if (myWallet.publicKey !== ''){
            setAddress(myWallet.publicKey);
        }
    },[myWallet.publicKey]);

    useEffect(() => {
        setPrice(amount*baseTrans);
    }, [amount])

    const handleBuyMC = () => {
        setModalState(enumState.VISIBLE);
    }

    const handleFinishConfirm = () => {
        handleCloseModal();
        setAmount(1);
    }

    const handleCloseModal = () => {
        setModalState(enumState.CLOSE);

        setTimeout(()=> {
            setStep(1);
        },300);
    }

    const handleBuyCoin = async () => {
        setModalState(enumState.CLOSE);

        await axios.post('http://localhost:8080/transactions/buycoin', {
            address: address.substring(2, address.length),
            amount: amount
        })

        setTimeout(()=> {
            setStep(2);
            setModalState(enumState.VISIBLE);
        },200);
    }

    return (
        <div className={`navbar row ${props.className}`}>
            <div className='navbar__container'>
                <Link to='/' className='navbar__container__logo'>
                    <img src='https://www.myetherwallet.com/img/short-hand-logo-web.5d962d4e.png'></img>
                </Link>
                <ul className='navbar__container__items'>
                    <li><div className='buy-MC' onClick={handleBuyMC}>
                        <div className='buy-MC__image'>
                            <img src='https://www.myetherwallet.com/img/buy-eth.75fcd9b0.svg'></img>
                        </div>
                        <p className='buy-MC__text'>Buy MC</p>
                    </div>
                    </li>
                    <li><Link to='/#about'>About</Link></li>
                    <li><Link to='/#FAQs'>FAQ</Link></li>
                    <li><Link to='/#contact'>Contact</Link></li>

                </ul>
            </div>

            <Modal state={modalState} onClickOverlay={handleCloseModal}>
                <div className={`buy-coin-modal ${(step === 1) ? '' : 'buy-coin-modal--hidden'}`}>
                    <div className='top-content'>
                        <div className='top-content-item'>
                            <p className='top-content-item__label'>Amount</p>
                            <div className='body'>
                                <input type='number' onChange={(e) => setAmount(+e.target.value)} value={amount} className='body__input' />
                                <div className='body__sub-desc'>MC</div>
                            </div>
                        </div>
                        <div className='top-content-item'>
                            <p className='top-content-item__label'>Price</p>
                            <div className='body'>
                                <input className='body__input' value={numeral(price).format('0,0')} readOnly />
                                <div className='body__sub-desc'>VND</div>
                            </div>
                        </div>
                    </div>
                    <div className='buy-address'>
                        <div className='buy-address__top'>
                            <p className='buy-address__label'>MC Address</p>
                            <p className='buy-address__sub-label'>Don't have one?</p>
                        </div>
                        <input onChange={(e)=>setAddress(e.target.value)} value={address} placeholder='Please enter the address' className='buy-address__input' />
                    </div>
                    <div className='buy-btn' onClick={handleBuyCoin}>
                        Buy
                    </div>
                </div>

            <div className={`notice ${(step === 2) ? '' : 'notice--hidden'}`}>
                <div className='modal-block'>
                    <div className='status-modal'>
                        <i className='fa fa-check fa-5x status-modal__icon ' aria-hidden='true'></i>
                        <p className='status-modal__title'>Success</p>
                        <h5 className='status-modal__desc'>You have purchased {numeral(amount).format('0,0')} coin successfully.</h5>
                    </div>

                    <div className='basic-button button--icon-hidden' onClick={handleFinishConfirm}>
                        Accept
                            <i className="fa fa-arrow-right basic-button__icon" aria-hidden="true"></i>
                    </div>
                </div>
            </div>
            </Modal>
        </div>
    );
};