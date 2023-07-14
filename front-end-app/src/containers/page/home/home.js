import './style.scss';
import {useEffect, useState, useContext } from 'react';
import { TopBanner } from '../../topBanner/topBanner';
import { About } from '../../about/about';
import { FAQs } from '../../FAQs/FAQs';

import { LogoutModal } from '../interface/contentsInterface/modalOption';
import { Modal } from '../../../components/modal/modal';
import {useLocation} from 'react-router-dom';

import $ from 'jquery';

import {authContext} from '../../../contexts/authContext';

const enumState = {
    HIDDEN: 'hidden',
    CLOSE: 'close',
    VISIBLE: 'visible'
}

export const Home = (props) => {
    const location = useLocation();
    const [modalState, setModalState] = useState(enumState.HIDDEN);
    const {resetWallet} = useContext(authContext);
    useEffect(() => {
        if (sessionStorage.getItem('auth') === 'true'){
            setModalState(enumState.VISIBLE);
        }

        if (location.hash.length > 0){
            $('html,body').animate({
                scrollTop: $(location.hash).offset().top,
            }, 500);
        }
        return () => {
             $('html,body').animate({scrollTop: 0}, 500);
        }
    }, [window.location.href]);

    return (
        <div id='#' className="home">
            
            <div className='Home__top-banner'>
                <div className='wrap'>
                    <TopBanner></TopBanner>
                </div>
            </div>
            <div id='about' className="home__about">
                <div className='wrap'>
                    <About></About>
                </div>
            </div>
            <div id='FAQs' className='home__FAQs'>
                <div className='wrap'>
                    <FAQs></FAQs>
                </div>
            </div>
            <div id='contact' className="home__social row">
                <p className='home__social__title'>Join MEW Community</p>
                <div className='home__social__container'>
                    {
                        socials.map((item) => {
                            return (
                                <div className='social'>
                                    <img src={item.icon} className='social--image'></img>
                                    <p className='social--name'>{item.name}</p>
                                </div>
                            );
                        })
                    }
                </div>
            </div>
       
            <Modal state={modalState} onClickOverlay={() => {setModalState(enumState.CLOSE); resetWallet();}}>
                    <LogoutModal closeModal={() => {setModalState(enumState.CLOSE)}}></LogoutModal>
            </Modal>
        </div>
    );
};

const socials = [
    { icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/1200px-Facebook_Logo_%282019%29.png', name: 'Facebook' },
    { icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Logo_of_Twitter.svg/512px-Logo_of_Twitter.svg.png?20220821125553', name: 'Twitter' },
    { icon: 'https://www.redditinc.com/assets/images/site/reddit-logo.png', name: 'Reddit' },
    { icon: 'https://upload.wikimedia.org/wikipedia/commons/c/c2/GitHub_Invertocat_Logo.svg', name: 'Github' },
    { icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/YouTube_full-color_icon_%282017%29.svg/2560px-YouTube_full-color_icon_%282017%29.svg.png', name: 'Youtube' },
    { icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Instagram_logo_2016.svg/2048px-Instagram_logo_2016.svg.png', name: 'Instagram' },
    { icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Telegram_logo.svg/2048px-Telegram_logo.svg.png', name: 'Telegram' }
];