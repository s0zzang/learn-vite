import { gsap } from 'gsap';
import { getNode, getStorage, setDocumentTitle, setStorage } from 'kind-tiger';
import pb from '/src/api/pocketbase';
import '/src/pages/layout';
import '/src/pages/login/login.css';

setDocumentTitle('30cm - 로그인');

const loginButton = getNode('.login');
const idField = getNode('#idField');
const pwField = getNode('#pwField');

const tl = gsap.timeline({ defaults: { opacity: 0 } });
tl.from('.container h1', { y: 20 })
  .from('.container hr', { scaleX: 0 }, '<')
  .from('form > *', { y: 30, stagger: 0.1 })
  .from('.register', { y: -20 }, '-=0.25');

async function handleLogin(e) {
  e.preventDefault();
  try {
    const id = idField.value;
    const pw = pwField.value;

    await pb.collection('users').authWithPassword(id, pw);
    const { model, token } = await getStorage('pocketbase_auth');

    // storage 다시 등록
    setStorage('auth', {
      isAuth: !!model,
      user: model,
      token,
    });

    alert('로그인 성공!');
    location.href = '/';
  } catch (e) {
    alert('인증된 사용자가 아닙니다.');
    // clearContents(idField);
    // clearContents(pwField);
    idField.focus();
  }
}

loginButton.addEventListener('click', handleLogin);
