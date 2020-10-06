import React, { useState, useEffect } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Input, Textarea, FileInput } from '../../utils/FormControl.jsx';
import { requierdField, validateImageFormat } from '../../utils/validators/validator.js';
import './ChangeHero.css';

const ChangeHeroForm = (props) => {

    const imageHandler = (e) => {
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {
                props.setPreviewLogoUrl((preview) =>  [...preview, reader.result]);
            }
        }
        const img = e.target.files[0]
        props.setImage((image) =>  [...image, img]);
        reader.readAsDataURL(img);
    }
    const deleteImage = (image, index) => {
        props.setPreviewLogoUrl((preview) =>  {
            return preview.filter(prev => prev != image);
        });
        props.setDeleteImage((del) =>  [...del, props.allImage[index]]);
        props.setAllImage((preview) =>  {
            return preview.filter((prev, ind) => ind != index);
        });
    }
    const allImage = () => {
        return props.previewLogoUrl.map((image, index) => <div className={'col-sm-3'} key={index}>
            <img className={'logo-preview'} src={image} alt=""/>
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
                    <div style={{visibility: (props.previewLogoUrl.length >= 4 ? "hidden" : "visible")}}>
                         <Field component={FileInput} className="change-image" type={'file'} name={"image"} validate={[validateImageFormat]} handleChange={imageHandler} />
                    </div>
                   
                </div>
                <button className="btn btn-success btn-sm">Отправить</button>
            </form>
        </div>
    )
}

const ChangeHeroReduxForm = reduxForm({
    form: 'create-hero',
    enableReinitialize: true
})(ChangeHeroForm);

const ChangeHero = (props) => {

    const [previewLogoUrl, setPreviewLogoUrl] = useState([]);
    const [image, setImage] = useState([]);
    const [deleteImage, setDeleteImage] = useState([]);
    const [allImage, setAllImage] = useState([]);
    useEffect(() => setPreviewLogoUrl((preview) =>  [...preview, ...props.img]), [])
    useEffect(() => setAllImage((preview) =>  [...preview, ...props.image]), [])
    const onSubmit = (formData) => {
        const newHero = {
            nickname: formData.nickname,
            real_name: formData.real_name,
            origin_description: formData.origin_description,
            catch_phrase: formData.catch_phrase,
            _id: props._id,
            delete_image: deleteImage,
            save_image: props.image
        }

        props.changeHero(image, newHero);
    }

    return (
        <div className="change-cart">
            <ChangeHeroReduxForm allImage={allImage} setAllImage={setAllImage}  image={props.image} setDeleteImage={setDeleteImage} setImage={setImage} previewLogoUrl={previewLogoUrl} setPreviewLogoUrl={setPreviewLogoUrl} initialValues={props.formData} onSubmit={onSubmit} />
            <button className="btn btn-primary btn-sm" onClick={props.desabledChangeForm}>Отмена</button>
        </div>
    )
}

export default ChangeHero;