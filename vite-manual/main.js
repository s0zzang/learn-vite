import "@/styles/main.css";
import { getNode, insertLast } from "kind-tiger";
import santa from "@/assets/santa.png";
import { button } from "@/styles/main.module.css";

const app = getNode("#app");
const template = `
  <figure class="container">
    <img style="width: 30vw" src="${santa}"/>
    <figcaption>산타 모자를 쓴 호랑이</figcaption>
  </figure>
  <button class="${button}" type="button">버튼</button>
`;

insertLast(app, template);
