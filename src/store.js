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

const findAndExpand = function(id) {
  let currentBookmark = this.findById(id);
  currentBookmark.expanded = !currentBookmark.expanded
  
}

const findAndGoToLink = function(id) {
  let currentBookmark = this.findById(id);
  let currentUrl = currentBookmark.url

  window.open(currentUrl, '_blank');
}

const findAndEdit = function(id) {
  let currentBookmark = this.findById(id);
  return currentBookmark;
}

const findAndDelete = function(id) {
  this.bookmarks = this.bookmarks.filter(currentBookmark => currentBookmark.id !== id);
};

const toggleFilterRating = function(){

}

export default {
  bookmarks,
  findById,
  findAndExpand,
  addBookmark,
  findAndEdit,
  findAndGoToLink,
  findAndDelete,
  toggleFilterRating,
  minRating:1,
}