'use strict';
import list from './list';
import './index.css';
import $ from 'jquery';
import api from './api';
import store from './store';

function main() {
  api.getBookmarks()
  .then(res => res.json())
  .then((bookmarks) => {
    bookmarks.forEach((bookmark) => store.addBookmark(bookmark));
    store.expanded = false;
    store.editing = false;
    list.render();
  });

  list.bindEventListeners();
  list.render();
};

$(main);