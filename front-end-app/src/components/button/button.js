// @flow 
import * as React from 'react';
import './style.scss';
export const Button = (props) => {

    return (
        <div className={`button ${props.className}`}>
            <div className='button__icon'>
                <img src={props.srcIcon}></img>
            </div>
            <div className='button__content'>
                <div className='text-content'>
                    <div className='title'>
                        <h2>{props.title}</h2>
                    </div>
                    <div className='description'>
                        <p>{props.description}</p>
                        <ul>
                            {
                                props.subDesc &&

                                props.subDesc.map((item) => {
                                    return (
                                        <li>{item}</li>
                                    );
                                })
                            }
                        </ul>
                    </div>
                </div>
                <div className='direct'>
                    <h4>{props.direct} <i class="fa fa-long-arrow-right fa-lg" style={{marginLeft: '0.25rem'}} aria-hidden="true"></i></h4>
                </div>
            </div>
        </div>
    );
};