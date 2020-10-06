import React, { useState } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Input, Textarea, FileInput } from '../../utils/FormControl.jsx';
import { requierdField, validateImageFormat } from '../../utils/validators/validator.js';
import './CreateHero.css';

const CreateHeroForm = (props) => {

    const imageHandler = (e) => {
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {
                props.setPreviewLogoUrl((preview) => [...preview, reader.result]);
            }
        }
        const img = e.target.files[0]
        props.setImage((image) => [...image, img]);
        reader.readAsDataURL(img);
    }
    const deleteImage = (image, index) => {
        props.setPreviewLogoUrl((preview) => {
            return preview.filter(prev => prev != image);
        });
        props.setImage((preview) => {
            return preview.filter((prev, ind) => ind != index);
        });
    }

    const allImage = () => {
        return props.previewLogoUrl.map((image, index) => <div className={'col-sm-3'} key={index}>
            <img className={'logo-preview'} src={image} alt="" />
            <label onClick={() => deleteImage(image, index)}>Delete</label>
        </div>)
    }
    const allImg = allImage();
    return (
        <div>
            <form onSubmit={props.handleSubmit}>
                <p>Nickname:</p> <Field component={Input} className="change-input" type={'text'} name={"nickname"} placeholder={"Nickname"} validate={[requierdField]} />
                <p>Real name:</p> <Field component={Input} className="change-input" type={'text'} name={"real_name"} placeholder={"Real name"} validate={[requierdField]} />
                <p>Origin:</p> <Field component={Textarea} className="change-textarea" type={'text'} name={"origin_description"} placeholder={"Description"} validate={[requierdField]} />
                <p>Catch phrase:</p> <Field component={Input} className="change-input" type={'text'} name={"catch_phrase"} placeholder={"Phrase"} validate={[requierdField]} />
                <div>
                    <div className="row">
                        {allImg}
                    </div>
                    <div style={{ visibility: (props.previewLogoUrl.length >= 4 ? "hidden" : "visible") }}>
                        <Field component={FileInput} type={'file'} name={"image"} validate={[validateImageFormat]} handleChange={imageHandler} />
                    </div>
                </div>
                <button className="btn btn-success btn-sm">Отправить</button>
            </form>
        </div>
    )
}

const CreateHeroReduxForm = reduxForm({
    form: 'create-hero'
})(CreateHeroForm);

const CreateHero = (props) => {
    //const url = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";
    const [previewLogoUrl, setPreviewLogoUrl] = useState([]);
    const [image, setImage] = useState([]);
    const [isCreate, setIsCreate] = useState(false);

    const turnCreate = () => {
        setIsCreate((isCreate) => true);
    }

    const desabledCreate = () => {
        setIsCreate((isCreate) => false);
    }

    const onSubmit = (formData) => {
        if (image.length === 0) {
            return false;
        }
        const newHero = {
            nickname: formData.nickname,
            real_name: formData.real_name,
            origin_description: formData.origin_description,
            catch_phrase: formData.catch_phrase
        }
        console.log(image);
        props.saveHero(image, newHero);
        setPreviewLogoUrl((preview) => []);
        setImage((image) => [])
        desabledCreate();
    }

    return (
        <>
            <div className="create-cart">
                {isCreate && <div>
                    <CreateHeroReduxForm image={image} setImage={setImage} previewLogoUrl={previewLogoUrl} setPreviewLogoUrl={setPreviewLogoUrl} onSubmit={onSubmit} />
                    <button className="btn btn-primary btn-sm" onClick={desabledCreate}>Отмена</button>
                </div>
                }
                {!isCreate && <div>
                    <button className="btn btn-primary btn-sm" onClick={turnCreate}>Создать</button>
                </div>}
            </div>
        </>
    )
}

export default CreateHero;