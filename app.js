const myElem = document.body || document.documentElement;
const config = {
  childList: true,
  subtree: true,
};
var observer = new MutationObserver(function () {
  if (!document.querySelector(".speero-container")) {
    if (document.querySelectorAll("").length > 0) {
      observer.disconnect();
      runFn();
    }
  }
});

observer.observe(myElem, config);

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//check if dom is loaded
function checkIfReady(fn) {
  if (document.readyState != "loading") {
    fn();
  } else {
    document.addEventListener("DOMContentLoaded", fn);
  }
}

checkIfReady(function () {
  runFn();
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function initObserver() {
  const targetNode = document.querySelector("body");
  const config = { childList: true, subtree: true };

  const myFunc = (mutationsList, observer) => {
    for (const mutation of mutationsList) {
      if (mutation.target.id === "") {
        //
      }
    }
  };
  const observer = new MutationObserver(myFunc);
  observer.observe(targetNode, config);
}
