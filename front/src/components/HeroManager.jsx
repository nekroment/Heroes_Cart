import React from 'react';
import Hero from './Hero/Hero';

const HeroManager = (props) => {
    const heroesCart = () => {
        return props.heroes.map(hero => <Hero key={hero._id} hero={hero}
            deleteHero={props.deleteHero} changeHero={props.changeHero} />)
    }

    const carts = heroesCart();

    return (
        <div>
            {carts}
        </div>
    )
}

export default HeroManager;