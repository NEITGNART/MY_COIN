// @flow 
import React, {useContext, useEffect} from 'react';
import './style.scss';

import { interfaceOptionContext } from '../../../../contexts/interfaceOptionContext';

export const SlideMenu = (props) => {
    const {option, setInterfaceOption} = useContext(interfaceOptionContext);

    const handleInterfaceOption = (e) => {
        const target = e.currentTarget;
        setInterfaceOption(+target.getAttribute('data-id')+1);
    }

    return (
        <div className='slide-menu'>
            {
                menuItems.map((item,index)=>{
                    return (
                        <div 
                            onClick={handleInterfaceOption}
                            data-id={index} 
                            className={`menu-item ${(+option === index+1)? 'item--active': '' }`}>
                            <div className='menu-item__image'>
                                <img src={item.srcImg}></img>
                            </div>
                            <p className='menu-item__text'>{item.text}</p>
                        </div>
                    );
                })
            }
        </div>
    );
};

const menuItems = [
    {srcImg: 'https://www.myetherwallet.com/img/dashboard-active.add4c084.svg', text: 'Dashboard' },
    {srcImg: 'https://www.myetherwallet.com/img/send-active.0fd1caad.svg', text: 'Send'},
    {srcImg: 'https://www.myetherwallet.com/img/swap-active.79919f1c.svg', text: 'History' },
    {srcImg: 'https://www.myetherwallet.com/img/dapps-active.add486a4.svg', text: 'DApps' },
    {srcImg: 'https://www.myetherwallet.com/img/contract-active.2edeb603.svg', text: 'Contract' },
    {srcImg: 'https://www.myetherwallet.com/img/message-active.fc2a8dcc.svg', text: 'Message' },
];  