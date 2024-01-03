function checkIfReadySem81(fn) {
  if (document.readyState != "loading") {
    fn();
  } else {
    document.addEventListener("DOMContentLoaded", fn);
  }
}

checkIfReadySem81(function () {
  let searchBtn = document.querySelector('div[data-test*="search"] button[class^="search_button"]');
  if (searchBtn) {
    searchBtn.addEventListener("click", function (e) {
      if (document.querySelector("div[data-path='search.no_results_modal']") && !document.querySelector(".speero-modal")) {
        e.stopPropagation();
        buildModal();
      }
    });

    //open modal using Enter key
    document.querySelector('input[data-test="search_input"]').addEventListener("keydown", function (e) {
      if (e.keyCode === 13 && document.querySelector("div[data-path='search.no_results_modal']") && !document.querySelector(".speero-modal")) {
        e.stopImmediatePropagation();
        buildModal();
      }
    });
  }
});

function buildModal() {
  let svgLock = `<svg xmlns="http://www.w3.org/2000/svg" width="41" height="44" viewBox="0 0 41 44" fill="none">
<path fill-rule="evenodd" clip-rule="evenodd" d="M32.42 14H36.42C37.4809 14 38.4983 14.4214 39.2484 15.1716C39.9986 15.9217 40.42 16.9391 40.42 18V36C40.42 38.1217 39.5772 40.1566 38.0769 41.6568C36.5766 43.1571 34.5417 44 32.42 44H8.42C6.29827 44 4.26344 43.1571 2.76315 41.6568C1.26286 40.1566 0.42 38.1217 0.42 36V18C0.42 16.9391 0.841427 15.9217 1.59157 15.1716C2.34172 14.4214 3.35913 14 4.42 14H8.42V12C8.42 10.4241 8.73039 8.86371 9.33345 7.4078C9.9365 5.95189 10.8204 4.62902 11.9347 3.51472C13.049 2.40042 14.3719 1.5165 15.8278 0.913446C17.2837 0.310389 18.8441 0 20.42 0C21.9959 0 23.5563 0.310389 25.0122 0.913446C26.4681 1.5165 27.791 2.40042 28.9053 3.51472C30.0196 4.62902 30.9035 5.95189 31.5066 7.4078C32.1096 8.86371 32.42 10.4241 32.42 12V14ZM14.764 6.344C13.2636 7.84394 12.4205 9.87844 12.42 12V14H28.42V12C28.4197 10.418 27.9503 8.87161 27.0712 7.55633C26.1921 6.24105 24.9428 5.21594 23.4812 4.61058C22.0196 4.00522 20.4114 3.84679 18.8597 4.15533C17.3081 4.46387 15.8828 5.22552 14.764 6.344ZM35.248 38.828C35.9982 38.078 36.4198 37.0608 36.42 36V18H4.42V36C4.42 37.0609 4.84143 38.0783 5.59157 38.8284C6.34172 39.5786 7.35913 40 8.42 40H32.42C33.4808 39.9998 34.498 39.5782 35.248 38.828ZM21.834 33.414C21.5543 33.6936 21.198 33.884 20.8101 33.9612C20.4222 34.0383 20.0201 33.9987 19.6547 33.8474C19.2893 33.696 18.977 33.4397 18.7572 33.1109C18.5374 32.7821 18.4201 32.3955 18.42 32V26C18.42 25.4696 18.6307 24.9609 19.0058 24.5858C19.3809 24.2107 19.8896 24 20.42 24C20.9504 24 21.4591 24.2107 21.8342 24.5858C22.2093 24.9609 22.42 25.4696 22.42 26V32C22.4199 32.5304 22.2091 33.039 21.834 33.414Z" fill="#171A22"/>
</svg>`;

  let svgCloseBtn = `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M17.7071 1.70711C18.0976 1.31658 18.0976 0.683417 17.7071 0.292893C17.3166 -0.0976311 16.6834 -0.0976311 16.2929 0.292893L9 7.58579L1.70711 0.292894C1.31658 -0.0976295 0.683417 -0.0976295 0.292893 0.292894C-0.0976311 0.683418 -0.097631 1.31658 0.292893 1.70711L7.58579 9L0.292894 16.2929C-0.0976304 16.6834 -0.0976304 17.3166 0.292894 17.7071C0.683418 18.0976 1.31658 18.0976 1.70711 17.7071L9 10.4142L16.2929 17.7071C16.6834 18.0976 17.3166 18.0976 17.7071 17.7071C18.0976 17.3166 18.0976 16.6834 17.7071 16.2929L10.4142 9L17.7071 1.70711Z" fill="#A9ABB6"/>
</svg>`;

  //grab user input
  let inputUrl = document.querySelector('input[data-test="search_input"]').value;

  //build modal structure
  const modalContainer = `<div class="speero-modal">
    <div class="speero-modal-inner">
    <a class="speero-close-btn">${svgCloseBtn}</a>
      ${svgLock}
      <p class="speero-headline">
        Oops, we haven&#39;t made data for <br />
        {${inputUrl}} public yet
      </p>
      <div class="speero-copy">
        <p>Create a free account to access the data for <span class="speero-bold">{${inputUrl}}</span></p>
        <p>and comprehensive insights about many other websites!</p>
      </div>
      <a class="speero-signup-cta" href="https://www.semrush.com/signup/">Try for Free &#8594;</a>
    </div>
  </div>`;

  //append modal to the page
  document.querySelector("body").insertAdjacentHTML("beforeend", modalContainer);

  //make body unscrollable
  document.querySelector("html").style.overflowY = "hidden";

  //close modal using ESC
  document.activeElement.blur();
  document.addEventListener("keydown", function (e) {
    if (e.keyCode === 27) {
      closeModal();
    }
  });

  //when user clicks on the X or outside the modal, close the modal and make the body scrollable again
  document.querySelector(".speero-close-btn").addEventListener("click", closeModal);
  document.querySelector(".speero-modal").addEventListener("click", function (e) {
    if (e.target === this) {
      closeModal();
    }
  });
}

function closeModal() {
  document.querySelector("html").style.overflowY = "auto";
  document.querySelector(".speero-modal").remove();
}
