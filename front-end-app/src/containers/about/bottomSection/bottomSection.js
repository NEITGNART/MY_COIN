// @flow 
import * as React from 'react';
import './style.scss';
import Wallet from '/Users/lucky/WebstormProjects/my-coin-blockchain/front-end-app/src/wallet.png'
import Swap from '/Users/lucky/WebstormProjects/my-coin-blockchain/front-end-app/src/swap.png'

export const BottomSection = (props) => {
    return (
        <>
            <div className="bottom-section row">
                    {
                        features.map((item) => {
                            return (
                                <div className='bottom-section__item'>
                                    <div className='icon'>
                                        <img src={item.icon} style={{height: 60, width: 60}}></img>
                                    </div>
                                    <div className='content'>
                                        <div className='text'>
                                            <div className='title'>
                                                <h2>{item.title}</h2>
                                            </div>
                                            <div className='description'>
                                                <p>{item.description}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    }
                </div>
        </>
    );
};

const features = [
    { 
        icon: Wallet,
        title: 'Join MEW', 
        description: 'Access the Ethereum blockchain\'s original and most-trusted wallet client, now with a host of new features all contained in an elegant, easy-to-use interface.' },
    { 
        icon: 'https://www.myetherwallet.com/img/icon-hardware-wallet.78248a8e.png',
        title: 'Hardware Wallet Support', 
        description: 'MEW offers support for all major hardware wallets including Ledger, Trezor, and many more.' },
    { 
        icon: Swap,
        title: 'Swap', 
        description: 'MEW has partnered with Bity, Kyber Network, Changelly, and Simplex to allow users to swap fiat to crypto, ETH and BTC, ETH and ERC20.' },
    { 
        icon: 'https://www.myetherwallet.com/img/icon-mew-wallet.f29574d3.png',
        title: 'MEW wallet',
        description: 'MEW\'s official fully-fledged app brings Ethereum to your iOS or Android smartphone. MEW wallet puts you in full control.' }
];