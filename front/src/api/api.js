import * as axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:3000'
});

export const heroAPI = {
    async getHeroes() {
        return await instance.get('/heroes');
    },
    async getImage(image) {
        return await instance.get(`/heroes/${image}/image`);
    },
    async saveHero(image, hero) {
        const formData = new FormData();
        for (let i = 0; i < image.length; i++) {
            formData.append('files', image[i]);
        }
        formData.append('nickname', hero.nickname);
        formData.append('real_name', hero.real_name);
        formData.append('origin_description', hero.origin_description);
        formData.append('catch_phrase', hero.catch_phrase);
        return await instance.post('/heroes', formData);
    },
    async getLimitHeroes(skip, limit) {
        return await instance.get(`/heroes/limit/${skip}/${limit}`);
    },
    async getCount() {
        return await instance.get('heroes/count');
    },
    async changeHero(image, hero) {
        const formData = new FormData();
        for (let i = 0; i < image.length; i++) {
            formData.append('files', image[i]);
        }
        formData.append('nickname', hero.nickname);
        formData.append('real_name', hero.real_name);
        formData.append('origin_description', hero.origin_description);
        formData.append('catch_phrase', hero.catch_phrase);
        formData.append('_id', hero._id);
        formData.append('delete_image', hero.delete_image);
        formData.append('save_image', hero.save_image);
        debugger
        return await instance.put('/heroes/change', formData);
    },
    async deleteHero(_id) {
        return await instance.delete(`/heroes/${_id}`);
    }
}