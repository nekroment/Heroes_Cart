import React, { Component } from 'react';
import './FormControl.css';
import { Message } from 'semantic-ui-react';

//Валидация форма типа input
export const Input = ({ input, meta, ...props }) => {
    const hasError = meta.touched && meta.error;
    return (
        <div className={'formControl'}>
            <div className={hasError ? 'error' : ''}>
                <input {...input} {...props} />
                {hasError && <p>{meta.error}</p>}
            </div>
        </div>

    )
}

export const Textarea = ({ input, meta, ...props }) => {
    const hasError = meta.touched && meta.error;
    return (
        <div className={'formControl'}>
            <div className={hasError ? 'error' : ''}>
                <textarea {...input} {...props} />
                {hasError && <p>{meta.error}</p>}
            </div>
        </div>

    )
}

export const FileInput = ({ input, type, meta, ...props }) => {
    const mimeType = "image/jpeg, image/png";
    return (
        <div className="example-2">
            <div className="form-group">
                <input
                    name={input.name}
                    type={type}
                    id="file"
                    accept={mimeType}
                    className="input-file"
                    onChange={event => props.handleChange(event)}
                />
                <label for="file" className="btn btn-tertiary js-labelFile">
                    <span className="js-fileName">Загрузить файл</span>
                </label>
                {meta && meta.invalid && meta.error && (
                    <Message negative header="Error:" content={meta.error} />
                )}
            </div>

        </div>
    );
};

//Валидация форма типа select
export const Select = ({ input, label, meta, children, ...props }) => {
    const hasError = meta.touched && meta.error;
    return (
        <div className={'formControl'}>
            <label>{label}</label>
            <div className={hasError ? 'error' : ''}>
                <select {...input} {...props}>
                    {children}
                </select>
                {hasError && <p>{meta.error}</p>}
            </div>
        </div>
    )
}
