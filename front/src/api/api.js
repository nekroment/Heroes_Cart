import * as axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:3000'
});

export const heroAPI = {
    async getHeroes () {
        return await instance.get('/heroes');
    },
    async getImage (image) {
        return await instance.get(`/heroes/${image}/image`);
    },
    async saveHero (image, hero) {
        const formData = new FormData();
        formData.append('file', image);
        formData.append('nickname', hero.nickname);
        formData.append('real_name', hero.real_name);
        formData.append('origin_description', hero.origin_description);
        formData.append('catch_phrase', hero.catch_phrase);
        return await instance.post('/', formData);
    },
    async changeHero (image, hero) {
        const formData = new FormData();
        formData.append('file', image);
        formData.append('nickname', hero.nickname);
        formData.append('real_name', hero.real_name);
        formData.append('origin_description', hero.origin_description);
        formData.append('catch_phrase', hero.catch_phrase);
        formData.append('_id', hero._id);
        return await instance.post('/heroes/change', formData);
    },
    async deleteHero (_id, image) {
        return await instance.delete(`/heroes/${_id}/${image}`);
    }
}