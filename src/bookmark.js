import cuid from 'cuid';

const create = function(title, rating, desc, url) {
    return {
        id: cuid(),
        'title': title,
        'rating': rating,
        'desc': desc,
        'url': url,
        'expanded': false,
        'editing': false
    };
};

const validateTitle = function(title) {
    if (!title) throw new TypeError('Name must not be blank');
};

const validateUrl = function(url) {
    if (!url) throw new TypeError('URL must not be blank');
};

const validateDesc = function(desc) {
    if (!desc) throw new TypeError('Description must not be blank');
};

export default {
    create,
    validateTitle,
    validateUrl,
    validateDesc
}