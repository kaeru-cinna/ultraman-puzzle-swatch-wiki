// ===== データ =====
const data = [
  {
    stage: "228",
    wave: 2,
    characters: ["バルタン星人","ベロクロン","エレキング"],
    gimmicks: [
      { name: "氷", count: 11 },
      { name: "雪", count: 11 }
    ]
  },
  {
    stage: "228",
    wave: 1,
    characters: ["バルタン星人"],
    gimmicks: [
      { name: "氷", count: 5 }
    ]
  }
];

// ===== 状態 =====
let selectedChars = [];
let selectedGimmicks = [];
let currentPage = 1;
const perPage = 10;
let timer;

// ===== 一覧生成 =====
const allChars = [...new Set(data.flatMap(d => d.characters))];
const allGimmicks = [...new Set(data.flatMap(d => d.gimmicks.map(g => g.name)))];

// ===== タグ生成 =====
function createTags(id, list, type) {
  const container = document.getElementById(id);

  list.forEach(item => {
    const tag = document.createElement("span");
    tag.textContent = item;
    tag.className = "tag";

    tag.onclick = () => toggleTag(tag, item, type);

    container.appendChild(tag);
  });
}

// ===== タグ操作 =====
function toggleTag(el, val, type) {
  let arr = type === "char" ? selectedChars : selectedGimmicks;
  const max = type === "char" ? 3 : 2;

  if (arr.includes(val)) {
    arr = arr.filter(v => v !== val);
    el.classList.remove("active");
  } else {
    if (arr.length >= max) {
      alert(`最大${max}まで`);
      return;
    }
    arr.push(val);
    el.classList.add("active");
  }

  if (type === "char") selectedChars = arr;
  else selectedGimmicks = arr;

  currentPage = 1;
  triggerSearch();
}

// ===== 即時検索 =====
function triggerSearch() {
  clearTimeout(timer);
  timer = setTimeout(runSearch, 100);
}

// ===== 検索 =====
function runSearch() {
  const resultDiv = document.getElementById("result");

  let result = (selectedChars.length === 0 && selectedGimmicks.length === 0)
    ? data
    : data.filter(s =>
        selectedChars.every(c => s.characters.includes(c)) &&
        selectedGimmicks.every(g => s.gimmicks.some(x => x.name === g))
      );

  if (result.length === 0) {
    resultDiv.innerHTML = "該当なし";
    return;
  }

  result.sort((a,b)=>a.stage.localeCompare(b.stage));

  const total = Math.ceil(result.length / perPage);
  const start = (currentPage - 1) * perPage;
  const pageData = result.slice(start, start + perPage);

  resultDiv.innerHTML = `
    <p>${result.length}件中 ${start+1}〜${start+pageData.length}</p>

    ${pageData.map(r=>`
      <div class="card">
        <strong>${r.stage} - Wave ${r.wave}</strong><br>
        キャラ: ${r.characters.map(c=>`<span class="char" onclick="quickChar('${c}')">${c}</span>`).join(" / ")}<br>
        ギミック: ${r.gimmicks.map(g=>`<span class="gimmick" onclick="quickGimmick('${g.name}')">${g.name}(${g.count})</span>`).join(" / ")}
      </div>
    `).join("")}

    <div class="pagination">
      <button onclick="prev()" ${currentPage===1?"disabled":""}>前へ</button>
      ${currentPage} / ${total}
      <button onclick="next()" ${currentPage===total?"disabled":""}>次へ</button>
    </div>
  `;

  updateURL();
}

// ===== ページ操作 =====
function next(){ currentPage++; runSearch(); }
function prev(){ currentPage--; runSearch(); }

// ===== 逆引き =====
function quickChar(name){
  selectedChars=[name];
  selectedGimmicks=[];
  resetTags();
  runSearch();
}

function quickGimmick(name){
  selectedChars=[];
  selectedGimmicks=[name];
  resetTags();
  runSearch();
}

// ===== タグ同期 =====
function resetTags(){
  document.querySelectorAll(".tag").forEach(tag=>{
    tag.classList.remove("active");
    if(selectedChars.includes(tag.textContent) || selectedGimmicks.includes(tag.textContent)){
      tag.classList.add("active");
    }
  });
}

// ===== URL =====
function updateURL(){
  const p=new URLSearchParams();
  if(selectedChars.length)p.set("char",selectedChars.join(","));
  if(selectedGimmicks.length)p.set("gimmick",selectedGimmicks.join(","));
  history.replaceState(null,"","?"+p.toString());
}

function loadURL(){
  const p=new URLSearchParams(location.search);
  selectedChars=p.get("char")?.split(",")||[];
  selectedGimmicks=p.get("gimmick")?.split(",")||[];
  resetTags();
}

// ===== 初期化 =====
window.onload=()=>{
  createTags("charTags",allChars,"char");
  createTags("gimmickTags",allGimmicks,"gimmick");
  loadURL();
  runSearch();
};