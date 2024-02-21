import { insertLast, tiger, comma, setDocumentTitle } from 'kind-tiger';
import getPbImageURL from '/src/api/getPbImageURL';
import pb from '/src/api/pocketbase';
import '/src/pages/layout';
import '/src/pages/product/product.css';
import { gsap } from 'gsap';

setDocumentTitle('30cm - 상품 목록');

/* -------------------- SDK ------------------- */
async function renderProducts() {
  const products = await pb.collection('products').getFullList();
  products.forEach((p) => {
    const { brand, description, price, discount } = p;
    const ratio = price * (discount * 0.01);
    const template = `
      <li class="product-item">
        <figure>
          <a href="/">
            <img src="${getPbImageURL(p)}" alt="" />
          </a>
        </figure>
        <span class="brand">${brand}</span>
        <span class="desc">${description}</span>
        <span class="price">${comma(price)}원</span>
        <div>
          ${discount ? `<span class="discount">${discount}%</span>` : ''}          
          <span class="real-price">${comma(price - ratio)}원</span>
        </div>
      </li>
    `;
    insertLast('.container > ul', template);
  });
  gsap.from('.product-item', { y: 30, opacity: 0, stagger: 0.1 });
}
renderProducts();

/* ---------------- REST API --------------- */
const END_POINT = `http://127.0.0.1:8090/api/collections/products/records`;
async function renderProducts_01() {
  const response = await tiger.get(END_POINT);
  const products = response.data.items;
  console.log(products);
}
