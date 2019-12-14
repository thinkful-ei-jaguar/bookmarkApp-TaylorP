const create = function(title, url, desc, rating) {
    return {
        id: cuid(),
        'title': title,
        'url': url,
        'desc': desc,
        'rating': rating,
        expanded: false
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
    ValidateDesc
}