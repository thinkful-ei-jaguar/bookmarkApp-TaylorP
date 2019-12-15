'use strict';
import list from './list';
import './index.css';
import $ from 'jquery';
import store from './store';

function main() {
  list.bindEventListeners();
  list.render();
};

$(main);