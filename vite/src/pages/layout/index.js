import "/src/pages/layout/header.css";

window.addEventListener("load", function () {
  const allElements = document.querySelectorAll("*");
  Array.prototype.forEach.call(allElements, function (el) {
    const path = el.dataset.path;
    if (path) {
      const xhr = new XMLHttpRequest();
      xhr.addEventListener("readystatechange", () => {
        const { readyState, status, responseText } = xhr;
        if (readyState == 4 && status == 200) {
          el.outerHTML = responseText;
        }
      });
      xhr.open("GET", path, true);
      xhr.send();
    }
  });
});
