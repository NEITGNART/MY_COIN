// @flow 
import React, { useState, useRef } from 'react';
import './style.scss';

const enumState = {
    VISIBLE: 'visible',
    CLOSE: 'close',
    HIDDEN: 'hidden'
}

export const SoftwareContainer = (props) => {
    const [optionSelect, setOptionSelect] = useState({ title: '', number: 0 });
    const fileInputRef = useRef();
    const handleClickOption = (e, title) => {
        const target = e.currentTarget;
        const index = +target.getAttribute('data-id');
        const walletOptions = document.getElementsByClassName('wallet-option');
        const flag = (index !== optionSelect.number) ? true : false;
        if (flag) {
            for (let item of walletOptions) {
                item.classList.remove('option-selected');
            }
            target.classList.add('option-selected');
            setOptionSelect({ title: title, number: index });
        } else {
            target.classList.remove('option-selected');
            setOptionSelect({ title: '', number: 0 });
        }
    }


    const handleSelectedFile = (e) => {
        handleModal();

        setDataKeyStore(e);
    }

    const handleModal = () => {
        props.setStateModal(enumState.CLOSE);
        setTimeout(() => {
            props.setCurrentModal({ ...optionSelect, number: 30 + parseInt(optionSelect.number) });
            props.setStateModal(enumState.VISIBLE);
        }, 100);
    }

    const handleContinueStep = () => {
        if (optionSelect.number === 1) {
            fileInputRef.current.click();
            return;
        }
        handleModal();
    }

    const setDataKeyStore = (e) => {
        var reader = new FileReader();
        reader.onload = (e) => {
            const dataFile = JSON.parse(e.target.result);
            props.setData(dataFile);
        };
        reader.readAsText(e.target.files[0]);
    }

    return (
        <div className='software-container'>
            <div className='content-container'>
                <div className='btn-option'>
                    <input ref={fileInputRef} type='file' style={{ display: 'none' }} onChange={handleSelectedFile}></input>
                    <div data-id='1' className='wallet-option' onClick={(e) => handleClickOption(e, 'Keystore File')}>
                        <div className='wallet-option__image'>
                            <img src='https://www.myetherwallet.com/img/button-json-hover.c5b6010e.svg'></img>
                        </div>
                        <p className='wallet-option__name'>Keystore File</p>
                        <i class="fa fa-check-circle fa-2x wallet-option__icon" aria-hidden="true"></i>
                    </div>

                    <div data-id='2' className='wallet-option' onClick={(e) => handleClickOption(e, 'Private key')}>
                        <div className='wallet-option__image'>
                            <img src='https://www.myetherwallet.com/img/button-key-hover.c1cbfefc.svg'></img>
                        </div>
                        <p className='wallet-option__name'>Private key</p>
                        <i class="fa fa-check-circle fa-2x wallet-option__icon" aria-hidden="true"></i>
                    </div>
                </div>
                <div className='software-link'>
                    <p>Purchase a hardware wallet for the highest security when accessing your crypto.</p>
                    <p className='software-link__link'>Purchase a hardware wallet</p>
                </div>
            </div>
            <div className='basic-button button--icon-hidden' onClick={handleContinueStep}>Continue</div>
            <div className='support'>
                <img src='https://www.myetherwallet.com/img/help-center.fc8a5621.svg' className='support__icon'></img>
                <h5 className='support__label'>Customer Support</h5>
            </div>

        </div>
    );
};