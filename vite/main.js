import { gsap } from 'gsap';
import { deleteStorage, getNode, getStorage, insertLast } from 'kind-tiger';
import pb from 'pocketbase';
import '/src/pages/layout';
import '/src/styles/style.css';

const tl = gsap.timeline();
tl.from('.visual img', { opacity: 0, x: 50 });
tl.from('.visual h2 span', { opacity: 0, x: -50, stagger: 0.2 });

async function welcome() {
  if (!localStorage.getItem('auth')) return;
  const { isAuth, user } = await getStorage('auth');
  if (isAuth) {
    const template = `
      <p class="userName">${user.name}님, 환영합니다 🥳</p>
    `;
    insertLast('.container', template);
  }

  const logout = getNode('.logout');
  logout.addEventListener('click', () => {
    pb.authStore.clear();
    deleteStorage('auth').then(() => {
      window.location.reload();
    });
  });
}
welcome();
