import {
  clearContents,
  getNode as $,
  getNode,
  getStorage,
  insertLast,
  setStorage,
} from "../lib/index.js";

const $form = $(".form");
const $todoInput = $("#todo");
const $todoList = $(".toDoList");
let toDoArray = [];

const handleSubmit = (e) => {
  e.preventDefault();
  const id = Date.now();
  const value = $todoInput.value;

  renderItem({ target: $todoList, item: value, id });
  addItemArray(id, value);
  clearContents($todoInput);
  setStorage("todo", toDoArray);
};

const handleRemove = (e) => {
  const target = e.target.closest("li");
  const id = target.id;
  if (!id) return;

  removeItem(id);
  removeItemArray(id);
  setStorage("todo", toDoArray);
};

function createItem(value, id) {
  return `<li id="${id}">${value}</li>`;
}

function renderItem({ target, item, id }) {
  insertLast(target, createItem(item, id));
}

function addItemArray(id, value) {
  toDoArray.push({ id, todoItem: value });
}

function removeItem(id) {
  const li = getNode(`[id="${id}"]`);
  li.remove();
}

function removeItemArray(id) {
  toDoArray = toDoArray.filter((item) => item.id != id);
}

// [phase-4]
// 1. IIFE 만들기
// 2. 스토리지 데이터 가져오기 (getStorage)
// 3. 비동기 처리로 데이터 받기 (then | await)
// 4. 렌더링하기 (renderItem)

(async () => {
  const initList = await getStorage("todo");
  // 5. 데이터가 없을 경우 에러처리 : 옵셔널 체이닝과 둘 중에 하나 사용
  if (!initList) return;

  initList?.map(({ todoItem, id }) =>
    renderItem({ target: $todoList, item: todoItem, id })
  );
})();

$form.addEventListener("submit", handleSubmit);
$todoList.addEventListener("click", handleRemove);
