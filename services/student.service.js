import { apiUrl } from 'config';
import { fetchWrapper } from 'helpers';

export const studentService = {
    getAll,
    getById,
    create,
    update,
    toggleCourse,
    delete: _delete
};

const baseUrl = `${apiUrl}/students`;

function getAll() {
    return fetchWrapper.get(baseUrl);
}

function getById(id) {
    return fetchWrapper.get(`${baseUrl}/${id}`);
}

function toggleCourse(params) {
    return fetchWrapper.postArray(`${baseUrl}/roll`, params);
}

function create(params) {
    return fetchWrapper.post(baseUrl, params);
}

function update(id, params) {
    return fetchWrapper.put(`${baseUrl}/${id}`, params);
}

// prefixed with underscored because delete is a reserved word in javascript
function _delete(id) {
    return fetchWrapper.delete(`${baseUrl}/${id}`);
}
