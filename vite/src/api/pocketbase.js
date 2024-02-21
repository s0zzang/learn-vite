import Pocketbase from 'pocketbase';
const pb = new Pocketbase(import.meta.env.VITE_PB_URL);
console.log(pb);

export default pb;
