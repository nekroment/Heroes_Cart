import React from 'react';
import './Hero.css';

const Hero = (props) => {
    return (
        <div className={'cart'}>
            <img className={'hero-logo'} src={`${props.hero.img}`} alt=""/>
            <div className={'nickname'}>
                {props.hero.nickname}
            </div>
        </div>
    )
}

export default Hero;