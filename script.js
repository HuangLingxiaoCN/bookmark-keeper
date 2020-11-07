const modal = document.getElementById('modal');
const modalShow = document.getElementById('show-modal');
const modalClose = document.getElementById('close-modal');
const bookmarkForm = document.getElementById('bookmark-form');
const websiteNameEl = document.getElementById('website-name'); // El - Element
const websiteUrlEl = document.getElementById('website-url');
const bookrmarksContainer = document.getElementById('bookmarks-container');

let bookmarks = [];

// Show Modal, Focus on Input function
function showModal() {
  modal.classList.add('show-modal');
  websiteNameEl.focus();  // Get the website name focused
}

// Close Modal function
function closeModal() {
  modal.classList.remove('show-modal');
}


// Validate Form function
function Validate(nameValue, urlValue) {
  const expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
  const regex = new RegExp(expression);
  if(!nameValue || !urlValue) {
    alert('Please submit both values.');
    return false;
  }

  if(!urlValue.match(regex)) {
    alert('Please provide a valid url address');
    return false;
  }

  return true;
}

// Fetch Bookmarks
function fetchBookmarks() {
  // Get bookmarks from localStorgae if available
  if (localStorage.getItem('bookmarks')) {
    bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  } else {
    // Create bookmarks array in localStorage
    bookmarks = [
      {
        name: 'Jason Huang github',
        url: 'https://github.com/JasonHuang1213',
      },
    ];
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  }
  console.log(bookmarks);
}


// Handle Data from Form function
function storeBookmark(e) {
  e.preventDefault(); // prevent if from submitting a form
  // get data from each form element
  const nameValue = websiteNameEl.value;
  let urlValue = websiteUrlEl.value;
  if(!urlValue.includes('http://', 'https://')) {
    urlValue = `https://${urlValue}`;
  }
  // if Validate function returns false, this if statement will be run and returns false
  if(!Validate(nameValue, urlValue)) {
    return false;
  }
  const bookmark = {
    name: nameValue,
    url: urlValue,
  };
  bookmarks.push(bookmark);
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks)); // store bookmark data
  fetchBookmarks();
  bookmarkForm.reset();
  websiteNameEl.focus();
}


// Modal Event Listeners
modalShow.addEventListener('click', showModal);
modalClose.addEventListener('click', closeModal);
// Close the Modal when you click outside of Modal window
window.addEventListener('click', (e) => {
  if(e.target === modal)  // if e.target equals to modal object which is a html element
    modal.classList.remove('show-modal');
})

// Form Event Listeners
bookmarkForm.addEventListener('submit', storeBookmark);

// On Load, fetch bookmarks
fetchBookmarks();