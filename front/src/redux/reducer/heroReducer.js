import { heroAPI } from "../../api/api";
var _ = require('lodash');

const GET_HEROES = 'GET_HEROES';
const SET_FORM_DATA = 'SET_FORM_DATA';
const SET_COUNT = 'SET_COUNT';

let initialState = {
    heroes: [],
    formData: {
        nickname: '',
        real_name: '',
        origin_description: '',
        catch_phrase: '',
    },
    count: 0,
    isLoading: true
}

const heroReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_HEROES: {
            let stateCopy = _.cloneDeep(state);
            stateCopy.heroes = [...action.heroes];
            return stateCopy;
        }
        case SET_FORM_DATA: {
            let stateCopy = _.cloneDeep(state);
            stateCopy.formData = action.formData;
            return stateCopy;
        }
        case SET_COUNT: {
            let stateCopy = _.cloneDeep(state);
            stateCopy.count = action.count;
            return stateCopy;
        }
        default: return state;
    }
}

export const setCount = (count) => ({ type: SET_COUNT, count });
export const setFormData = (formData) => ({ type: SET_FORM_DATA, formData })
export const getHero = (heroes) => ({ type: GET_HEROES, heroes });

export const getHeroThunkCreator = () => {
    return async (dispatch) => {
        try {
            const responce = await heroAPI.getHeroes();
            const heroes = responce.data;
            for (let i = 0; i < heroes.length; i++) {
                for (let j = 0; j < heroes[i].image.length; j++) {
                    const img = await heroAPI.getImage(heroes[i].image[j]);
                    heroes[i].img = [];
                    heroes[i].img.push('data:image/jpeg;base64,' + img.data);
                }
            }
            dispatch(getHero(heroes));
        } catch (error) {
        }
    }
}

export const changeHeroThunkCreator = (image, hero) => {
    return async (dispatch) => {
        try {
            await heroAPI.changeHero(image, hero);
            dispatch(getHeroThunkCreator());
        } catch (error) {

        }
    }
}

export const limitHeroesThunkCreator = (skip = 0, limit = 5) => {
    return async (dispatch) => {
        try {
            let response = await heroAPI.getLimitHeroes(skip, limit);
            const heroes = response.data;
            for (let i = 0; i < heroes.length; i++) {
                heroes[i].img = [];
                for (let j = 0; j < heroes[i].image.length; j++) {
                    const img = await heroAPI.getImage(heroes[i].image[j]);
                    heroes[i].img.push('data:image/jpeg;base64,' + img.data);
                }
            }
            dispatch(getHero(heroes));
        } catch (error) {
        }
    }
}

export const getCountThunkCreator = () => {
    return async (dispatch) => {
        try {
            let response = await heroAPI.getCount();
            dispatch(setCount(response.data));
        } catch (error) {

        }
    }
}
export const saveHeroThunkCreator = (image, hero) => {
    return async (dispatch) => {
        try {
            await heroAPI.saveHero(image, hero);
            dispatch(limitHeroesThunkCreator());
            dispatch(getCountThunkCreator());
        } catch (error) {
            console.log(error);
        }
    }
}

export const deleteHeroThunkCreator = (_id) => {
    return async (dispatch) => {
        try {
            await heroAPI.deleteHero(_id);
            dispatch(limitHeroesThunkCreator());
            dispatch(getCountThunkCreator());
        } catch (error) {

        }
    }
}

export default heroReducer;