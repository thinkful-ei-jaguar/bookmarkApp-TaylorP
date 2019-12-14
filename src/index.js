'use strict';
import list from './list';
import './index.css';

function main() {
  list.bindEventListeners();
  list.render();
};

$(main);