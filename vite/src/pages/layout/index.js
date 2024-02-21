import '/src/pages/layout/header.css';
import { getStorage, deleteStorage } from 'kind-tiger';
import pb from '/src/api/pocketbase';

window.addEventListener('load', function () {
  const allElements = document.querySelectorAll('*');
  Array.prototype.forEach.call(allElements, function (el) {
    const path = el.dataset.path;
    if (path) {
      const xhr = new XMLHttpRequest();
      xhr.addEventListener('readystatechange', () => {
        const { readyState, status, responseText } = xhr;
        if (readyState == 4 && status == 200) {
          el.outerHTML = responseText;
          header();
        }
      });
      xhr.open('GET', path, true);
      xhr.send();
    }
  });
});

const header = async () => {
  if (!localStorage.getItem('auth')) return;
  const { isAuth } = await getStorage('auth');
  if (isAuth) {
    const a = document.querySelector('nav li:last-child a');
    a.href = '#';
    a.textContent = 'LOGOUT';

    a.addEventListener('click', () => {
      if (confirm('정말 로그아웃 하실..?')) {
        pb.authStore.clear();
        deleteStorage('auth');
        location.reload();
      }
    });
  }
};
