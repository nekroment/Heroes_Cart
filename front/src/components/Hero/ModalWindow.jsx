import React from 'react';
import './ModalWindow.css';

const ModalWindow = (props) => {

    const allImage = () => {
        if (props.hero) {
            debugger
            return props.hero.img.map((image, index) => <div className="col-4" key={index}>
                <img className={'modal-logo-preview'} src={image} alt="" />
            </div>)
        }
        return undefined;

    }
    const image = allImage()
    return (
        <>
            {props.hero && <div>
                <div className="row">
                    {image}
                </div>
                <div className="modal-description">
                    <span>Псевдоним: </span>{props.hero.nickname}
                </div>
                <div className="modal-description">
                <span>Ральное имя: </span>{props.hero.real_name}
                </div>
                <div className="modal-description">
                <span>Предыстория: </span>{props.hero.origin_description}
                </div>
                <div className="modal-description">
                <span>Фраза: </span> {props.hero.catch_phrase}
                </div>
            </div>
            }

        </>
    )
}

export default ModalWindow;