const base_url = 'https://thinkful-list-api.herokuapp.com/TaylorP';

const getBookmarks = function () {
    return fetch(`${base_url}/bookmarks`)
}

const createBookmark = function (title, rating, desc, url) {
    let newBookmark = JSON.stringify({
        "title": title,
        "rating": rating,
        "desc": desc,
        "url": url
    });
    return fetch(`${base_url}/bookmarks`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: newBookmark
    });
};

const updateBookmark = function (id, updateData) {

    let updateBookmark = JSON.stringify(updateData);
    console.log("updateBookmark: ", updateBookmark)

    return fetch(`${base_url}/bookmarks/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: updateBookmark
    });
}

export default {
    getBookmarks,
    createBookmark,
    updateBookmark
};