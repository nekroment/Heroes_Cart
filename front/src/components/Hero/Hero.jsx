import React, { useState } from 'react';
import './Hero.css';
import ChangeHero from '../ChangeHero/ChangeHero';

const Hero = (props) => {

    const [changeForm, setChangeForm] = useState(false);

    const turnChangeForm = () => {
        setChangeForm((changeForm) => true);
        const formData = {
            nickname: props.hero.nickname,
            real_name: props.hero.real_name,
            origin_description: props.hero.origin_description,
            catch_phrase: props.hero.catch_phrase
        }
        props.setForm(formData);
    }
    const desabledChangeForm = () => {
        setChangeForm((changeForm) => false);
    }
    return (
        <>
            <div className={'cart' 
            + ' '
            + (!changeForm ? '' : 'change')}>
                {!changeForm && <div onDoubleClick={() => { props.openModal(props.hero) }}>
                    <img className={'hero-logo'} src={`${props.hero.img[0]}`} alt="" />
                    <div className={'nickname'}>
                        <span>Nickname: </span>{props.hero.nickname}
                    </div>
                    <div className="btn-group btn-group-sm change-button">
                        <button class="btn btn-secondary" onClick={turnChangeForm}>Редактировать</button>
                    <button class="btn btn-secondary" onClick={() => { props.deleteHero(props.hero._id, props.hero.image) }}>Delete</button>
                    </div>
                </div>
                }
                <div>
                     {changeForm && <ChangeHero image={props.hero.image} img={props.hero.img} changeHero={props.changeHero} _id={props.hero._id} formData={props.formData} desabledChangeForm={desabledChangeForm} />}
                </div>
            </div>
        </>
    )
}

export default Hero;