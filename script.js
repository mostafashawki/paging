let todos = [];
let todosPages = [];
let selectedPage;
let selectedIndex;
let startIndex;
let endIndex;
let pagingList;
fetch("https://jsonplaceholder.typicode.com/todos")
  .then(response => response.json())
  .then(json => {
    console.log(json);
    todos = json;
    //paging
    let pagesNumber = todos.length / 10;
    const pagesNumberRemainder = pagesNumber % 1;
    const pagesNumberWithoutRemainder = Math.floor(pagesNumber);
    if (pagesNumberRemainder > 0)
      pagesNumber = Number(pagesNumberWithoutRemainder) + 1;
    todosPages = Array(pagesNumber)
      .fill(1)
      .map((x, i) => i + 1);
    startIndex = 0;
    endIndex = 10;
    selectedPage = 1;
    //fill the paging list
    injectPagination();
    //start mapping the list
    injectPage();
  });

injectPagination = () => {
  pagingList = `
          <li class="page-item"><a class="page-link" href="javascript:void(0)" onclick="goPrevious()">Previous</a></li>
          <li class="page-item"><span class="page-link" id="spanSelectedPage">${selectedPage} | ${todosPages.length}</span></li>
          <li class="page-item"><a class="page-link" href="javascript:void(0)" onclick="goNext()">Next</a></li>
          `;
  document.getElementById("paging").innerHTML = pagingList;
};

injectPage = () => {
  const list = todos
    ? todos
        .slice(startIndex, endIndex)
        .map(
          (todo, index) =>
            `
                      <p>${todo.title}</p>
                      <hr />
                        `
        )
        .join("") //to prevent unexpected comma
    : "";
  document.getElementById("list").innerHTML = list;
};

goPrevious = () => {
  if (selectedPage != 1) {
    startIndex -= 10;
    endIndex -= 10;
    selectedPage--;
    injectPage();
    injectPagination();
  }
};

goNext = () => {
  if (selectedPage < todosPages.length) {
    startIndex += 10;
    endIndex += 10;
    selectedPage++;
    injectPage();
    injectPagination();
  }
};
