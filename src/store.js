import bookmark from './bookmark';

const bookmarks = [];

const findById = function(id) {
    return this.bookmarks.find(currentItem => currentItem.id ===id);
};

const addBookmark = function (title, rating, desc, url) {
    try {
      bookmark.validateTitle(title);
      bookmark.validateUrl(url);
      bookmark.validateDesc(desc);
      this.bookmarks.push(bookmark.create(title, rating, desc, url));
    } catch (e) {
      console.log(e.message);
    }
  };

  export default {
      bookmarks,
      findById,
      addBookmark
  }