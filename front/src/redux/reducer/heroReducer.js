import { heroAPI } from "../../api/api";

const GET_HEROES = 'GET_HEROES';

let initialState = {
    heroes: [],
    form: {},
    isLoading: true
}

const heroReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_HEROES: {
            let stateCopy = {...state};
            stateCopy.heroes = [...action.heroes];
            return stateCopy;
        }
        default: return state;
    }
}

export const getHero = (heroes) => ({type: GET_HEROES, heroes});

export const getHeroThunkCreator = () => {
    return async (dispatch) => {
        try {
            const responce = await heroAPI.getHeroes();
            const heroes = responce.data
            for(let i = 0; i < heroes.length; i++) {
                const img = await heroAPI.getImage(heroes[i].image);
                heroes[i].img = img;
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

export const deleteHeroThunkCreator = (_id, image) => {
    return async (dispatch) => {
        try {
            await heroAPI.deleteHero(_id, image);
            dispatch(getHeroThunkCreator());
        } catch (error) {

        }
    }
}

export default heroReducer;