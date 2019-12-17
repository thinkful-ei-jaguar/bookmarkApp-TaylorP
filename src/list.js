import store from './store';
import $ from 'jquery';
import api from './api';


const generateSlider = function() {
    let header = ` <header>
    <div class="slide-container">
        <h2 id='rating-header'>Minimum Rating:</h2>
        <input type="range" min="1" max="5" value="${store.minRating}" class="slider" id="slider" list='tickmarks'>
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
    let bookmarkElement = `<div class='bookmark' id='expand' data-id='${bookmark.id}'>
    <h3>${bookmark.title}</h3>
      <div class=ratings>`
      +generateBookmarkRatingElement(bookmark)+
      `</div>
      <section class='description hidden'>
            <p>${bookmark.desc}</p>
      </section>
      <section class='expand-buttons hidden'>
            <button type='button' id='visit-button' name='visit-button'>Visit</buttion>
            <button type='button' id='edit-button' name='edit-button' href='edit.html'>edit</buttion>
      </section>
      </div>`
    ;
    if(store.minRating > bookmark.rating){
        return '';
    }
    if(bookmark.expanded) {
        bookmarkElement = `<div class='bookmark expand' id='expand' data-id='${bookmark.id}'>
        <h3>${bookmark.title}</h3>
          <div class=ratings>`
          +generateBookmarkRatingElement(bookmark)+
          `</div>
          <section class='description'>
                <p>${bookmark.desc}</p>
          </section>
          <section class='expand-buttons'>
                <button type='button' id='visit-button' name='visit-button'><a href='${bookmark.url}' target='_blank'>Visit</a></buttion>
                <button type='button' id='edit-button' name='edit-button' href='edit.html'>edit</buttion>
          </section>
          </div>`;
    }

    return bookmarkElement;
}

const generateBookmarkRatingElement = function(bookmark) {
    let starRatings = '';
    let checksNeedToAdd = bookmark.rating;
    let starElement;
  
    for(let i = 0; i < 5; i++) {
      if(checksNeedToAdd > 0) {
        starElement = `<div class='star checked'></div>`;
        checksNeedToAdd -= 1;
      } else {
        starElement = `<div class='star'></div>`;
      }
  
      starRatings += starElement;
    }
  
    return starRatings;
  }

const generateBookmarkString = function(bookmarkList) {
    const bookmarks = bookmarkList.map((item)=>generateBookmarkElement(item));
    return bookmarks.join('');
}

const generateAddBookmark = function() {
    let addForm = `<div class='bookmark expand'>
    <form id='add-bookmark-form'>
        <label for="title">Title:</label>
        <input type="text" name='title' id='title' placeholder="Add a title..." maxlength="50" required>
    <div class=ratings id='add-rating'>
        <input type="radio" name="initial-rating" value="1" required>1
        <input type="radio" name="initial-rating" value="2" required>2
        <input type="radio" name="initial-rating" value="3" required>3
        <input type="radio" name="initial-rating" value="4" required>4
        <input type="radio" name="initial-rating" value="5" required>5
    </div>
      <textarea rows="14" cols="10" maxlength="350" wrap="soft" id='description' name='description' placeholder="Add a description..." required></textarea>
      <label for="url">URL:</label>
      <input type="url" name="url" id="url" required>
      <section class='expand-buttons'>
          <button type='submit' id='save-button' name='save-button'>Save</button>
          <button type='button' id='cancel-button' name='cancel-button'>Cancel</button>
      </section>
    </form>
</div>`;

$('.bookmarks-container').prepend(addForm);
}

const generateUpdateForm = function(bookmark) {
    let update = 
    `<form id='update-bookmark-form'>
        <label for="title">Title:</label>
        <input type="text" name='title' id='title' placeholder="${bookmark.title}" maxlength="50">
      <label for='description'>Description:</label>
      <textarea rows="14" cols="10" maxlength="350" wrap="soft" id='description' name='description' placeholder="${bookmark.desc}"></textarea>
      <section class='expand-buttons'>
          <button type='submit' id='update-button' name='update-button'>Save</button>
          <button type='button' id='delete-button' name='delete-button'>Remove</button>
      </section>
    </form>`;

$('.expand').html(update)
}

const handleAddClick = function() {
    $('#add-button').on('click', event => {
        event.preventDefault();
        generateAddBookmark();
        $('#add-button').attr('disabled', true);
    })
}

const handleVisitClick = function() {
    $('.main').on('click', '#visit-button', event=>{
        event.stopPropagation();
    })
}

const handleEditClick = function (){
    $('.main').on('click', '#edit-button', event=>{
        event.stopPropagation();
        let id = getBookmarkIdFromElement(event.currentTarget);
        let bookmark = store.findAndEdit(id);
        bookmark.editing = !bookmark.editing;
        generateUpdateForm(bookmark);
});
}

const handleDeleteClick = function(){
    $('.main').on('click', '#delete-button', event =>{
        event.stopPropagation();
        let id = getBookmarkIdFromElement(event.currentTarget);
        store.findAndDelete(id);
        render();
    })
}

const getBookmarkIdFromElement = function(bookmark) {
    return $(bookmark).closest('.bookmark').data('id');
}

const handleExpand = function() {
    $('.main').on('click', '#expand', event => {
        event.preventDefault();
        event.stopPropagation();
        let id = getBookmarkIdFromElement(event.currentTarget);
        let bookmark = store.findAndEdit(id);
        if (!bookmark.editing) {
          store.findAndExpand(id);
          render();
        }
    })
}

const handleNewBookmarkSubmit = function () {
    $('.main').submit(function (event) {
      event.preventDefault();
      const newBookmarkTitle = $('#title').val();
      const newBookmarkRating = $('input[name=initial-rating]:checked').val();
      const newBookmarkDesc = $('#description').val();
      const newBookmarkUrl = $('#url').val();

      api.createBookmark(newBookmarkTitle, newBookmarkRating, newBookmarkDesc, newBookmarkUrl)
        .then(res=>res.json)
        .then((newBookmark) => {
            store.addBookmark(newBookmark);
            $('#add-button').removeAttr('disabled');
            render();
        })
    });

    $('.main').on('click', '#cancel-button', event => {
        event.preventDefault();
        $('#add-button').removeAttr('disabled');
        render();
    })
  
};

  const handleUpdateBookmark = function() {
    $('.main').on('click', '#update-button', event =>{
        event.stopPropagation();

      const title = $('#title').val();
      //const updateBookmarkRating = $('input[name=new-rating]:checked').val();
      const desc = $('#description').val();
      const editing = !editing;
      const updateBookmark = {title, desc, editing}

      let id = getBookmarkIdFromElement(event.currentTarget);
      //let bookmark = store.findAndEdit(id);
      console.log(updateBookmark);

      api.updateBookmark(id, updateBookmark)
      .then(store.findAndUpdate(id, updateBookmark));
      
      
      render();

  })
  }

 const handleMinRating =function() {
     $('.main').on('click', '#slider', function(e){
         e.stopPropagation();
         let min = $('#slider').val();
         store.minRating = min;;
         render();
     })
 }

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
    handleExpand();
    handleVisitClick();
    handleEditClick();
    handleUpdateBookmark();
    handleDeleteClick();
    handleMinRating();
}

export default {
    render,
    bindEventListeners
}