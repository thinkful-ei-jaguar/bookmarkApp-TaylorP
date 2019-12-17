const bookmarks = [];


const findById = function(id) {
    return this.bookmarks.find(currentItem => currentItem.id ===id);
};

const addBookmark = function (bookmark) {
    this.bookmarks.push(bookmark);
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

const findAndUpdate = function(id, newData) {
  console.log(`f&u: ${id}`);
  console.log(`f&u: ${newData}`);
  let bookmark = this.bookmarks.find(currentItem => currentItem.id ===id)
  let newBookmark = Object.assign(bookmark, newData);
  

  return newBookmark;
}

export default {
  bookmarks,
  findById,
  findAndExpand,
  addBookmark,
  findAndEdit,
  findAndGoToLink,
  findAndDelete,
  findAndUpdate,
  minRating:1,
}