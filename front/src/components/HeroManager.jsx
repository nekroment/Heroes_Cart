import React, { useState } from 'react';
import Hero from './Hero/Hero';
import Modal from 'react-modal';
import ModalWindow from './Hero/ModalWindow';
import CreateHero from './CreateHero/CreateHero.jsx';
Modal.setAppElement('#root');

const HeroManager = (props) => {

    const [isModal, setIsModal] = useState(false);
    const [modalHero, setModalHero] = useState();

    async function closeModal() {
        setModalHero(() => { return undefined });
        setIsModal(isModal => false);
    }

    async function openModal(hero) {
        try {
            console.log('test')
            setModalHero(() => { return hero });
            setIsModal(isModal => true);
        } catch (error) {
            throw error;
        }
    }

    const heroesCart = () => {
        return props.heroes.map(hero => <Hero setForm={props.setForm} formData={props.formData} openModal={openModal} key={hero._id} hero={hero}
            deleteHero={props.deleteHero} changeHero={props.changeHero} />)
    }

    const carts = heroesCart();

    return (
        <>
            <div>
                {carts}
            </div>
            <div>
                <CreateHero saveHero={props.saveHero} />
            </div>
            <Modal
                isOpen={isModal}
                onRequestClose={closeModal}
                style={{
                    overlay: {
                        backgroundColor: 'grey'
                    }
                }}>
                <ModalWindow hero={modalHero} />
            </Modal>
        </>
    )
}

export default HeroManager;