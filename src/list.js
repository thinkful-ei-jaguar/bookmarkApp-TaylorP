import store from './store';
//import bookmark from './bookmark';
import $ from 'jquery';


const generateSlider = function() {
    let header = ` <header>
    <div class="slide-container">
        <h2 id='rating-header'>Minimum Rating:</h2>
        <input type="range" min="1" max="5" value="1" class="slider" id="myRange" list='tickmarks'>
        <datalist id="tickmarks">
                <option value="1" label="1"></option>
                <option value="2"></option>
                <option value="3"></option>
                <option value="4"></option>
                <option value="5" label="5"></option>
              </datalist>
    </div>
    </header>`

    $('.main').html(header);
};

const generateList = function() {
    let container = `
    <section class='bookmarks-container'></section>`;
  
    $('.main').append(container);
}

const generateBookmarkElement = function(bookmark) {
    let bookmarkElement = `<div class='bookmark' id='expand'>
    <h3>${bookmark.title}</h3>
      <div class=ratings>
        <div class='star checked'></div>
        <div class='star checked'></div>
        <div class='star checked'></div>
        <div class='star'></div>
        <div class='star'></div>
      </div>
    </div>`;

    return bookmarkElement;
}

const generateBookmarkString = function(bookmarkList) {
    const bookmarks = bookmarkList.map((item)=>generateBookmarkElement(item));
    return bookmarks.join('');
}

const generateAddBookmark = function() {
    let addForm = `<div class='bookmark expand'>
    <form id='add-bookmark-form'>
        <label for="title">Title:</label>
        <input type="text" name='title' id='title' placeholder="Add a title..." maxlength="50">
    <div class=ratings id='add-rating'>
        <input type="radio" name="initial-rating" value="1">1
        <input type="radio" name="initial-rating" value="2">2
        <input type="radio" name="initial-rating" value="3">3
        <input type="radio" name="initial-rating" value="4">4
        <input type="radio" name="initial-rating" value="5">5
    </div>
      <textarea rows="14" cols="10" maxlength="350" wrap="soft" id='description' name='description' placeholder="Add a description..."></textarea>
      <label for="url">URL:</label>
      <input type="text" name="url" id="url">
      <section class='expand-buttons'>
          <button type='submit' id='save-button' name='save-button'>Save</button>
          <button type='button' id='cancel-button' name='cancel-button'>Cancel</button>
      </section>
    </form>
</div>`;

$('.bookmarks-container').prepend(addForm);


}

const handleAddClick = function() {
    $('#add-button').on('click', event => {
        event.preventDefault();
        generateAddBookmark();
        $('#add-button').attr('disabled', true);
    })
}

const handleNewBookmarkSubmit = function () {
    $('.main').submit(function (event) {
      event.preventDefault();
      const newBookmarkTitle = $('#title').val();
      const newBookmarkRating = $('input[name=initial-rating]:checked').val();
      const newBookmarkDesc = $('#description').val();
      const newBookmarkUrl = $('#url').val();
      store.addBookmark(newBookmarkTitle, newBookmarkRating, newBookmarkDesc, newBookmarkUrl);
      console.log(store.bookmarks);
      $('#add-button').removeAttr('disabled');
      render();
    });
    $('.main').on('click', '#cancel-button', event => {
        event.preventDefault();
        console.log('cancel button clicked');
        render();
    })
  };

let render = function() {
    let bookmarks = [...store.bookmarks];
    generateSlider();
    generateList();

    const bookmarkListString = generateBookmarkString(bookmarks);

    $('.bookmarks-container').html(bookmarkListString);
    
}

let bindEventListeners = function() {
    handleAddClick();
    handleNewBookmarkSubmit();
}

export default {
    render,
    bindEventListeners
}