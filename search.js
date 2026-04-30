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
    stage: "230",
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
let searchTimer = null;

// ===== 一覧生成 =====
const allChars = [...new Set(data.flatMap(d => d.characters))];
const allGimmicks = [...new Set(data.flatMap(d => d.gimmicks.map(g => g.name)))];

// ===== タグ生成 =====
function createTags(containerId, list, type) {
  const container = document.getElementById(containerId);

  list.forEach(item => {
    const tag = document.createElement("span");
    tag.textContent = item;
    tag.className = "tag";

    tag.onclick = () => toggleTag(tag, item, type);

    container.appendChild(tag);
  });
}

// ===== タグ操作 =====
function toggleTag(element, value, type) {
  let target = type === "char" ? selectedChars : selectedGimmicks;
  const max = type === "char" ? 3 : 2;

  if (target.includes(value)) {
    target = target.filter(v => v !== value);
    element.classList.remove("active");
  } else {
    if (target.length >= max) {
      alert(`最大${max}まで`);
      return;
    }
    target.push(value);
    element.classList.add("active");
  }

  if (type === "char") {
    selectedChars = target;
  } else {
    selectedGimmicks = target;
  }

  triggerSearch();
}

// ===== 即時検索 =====
function triggerSearch() {
  const resultDiv = document.getElementById("result");
  resultDiv.innerHTML = "検索中...";

  clearTimeout(searchTimer);
  searchTimer = setTimeout(() => {
    runSearch();
  }, 100);
}

// ===== 検索 =====
function runSearch() {
  const resultDiv = document.getElementById("result");

  if (selectedChars.length === 0 && selectedGimmicks.length === 0) {
    resultDiv.innerHTML = "<p>条件を選択してください</p>";
    return;
  }

  const result = data.filter(stage => {
    const charMatch = selectedChars.every(c =>
      stage.characters.includes(c)
    );

    const gimmickMatch = selectedGimmicks.every(g =>
      stage.gimmicks.some(obj => obj.name === g)
    );

    return charMatch && gimmickMatch;
  });

  updateURL(selectedChars, selectedGimmicks);

  if (result.length === 0) {
    resultDiv.innerHTML = "<p>該当なし</p>";
    return;
  }

  result.sort((a, b) => a.stage.localeCompare(b.stage));

  resultDiv.innerHTML = `
    <p>${result.length}件ヒット</p>
    ${result.map(r => `
      <div class="card">
        <strong>${r.stage} - Wave ${r.wave}</strong><br>
        キャラ: ${r.characters.map(c =>
          `<span class="char" onclick="quickSearchChar('${c}')">${c}</span>`
        ).join(" / ")}<br>
        ギミック: ${r.gimmicks.map(g =>
          `<span class="gimmick" onclick="quickSearchGimmick('${g.name}')">${g.name}(${g.count})</span>`
        ).join(" / ")}
      </div>
    `).join("")}
  `;
}

// ===== 逆引き =====
function quickSearchChar(name) {
  selectedChars = [name];
  selectedGimmicks = [];
  resetTags();
  triggerSearch();
}

function quickSearchGimmick(name) {
  selectedChars = [];
  selectedGimmicks = [name];
  resetTags();
  triggerSearch();
}

// ===== タグリセット =====
function resetTags() {
  document.querySelectorAll(".tag").forEach(tag => {
    tag.classList.remove("active");

    if (selectedChars.includes(tag.textContent) ||
        selectedGimmicks.includes(tag.textContent)) {
      tag.classList.add("active");
    }
  });
}

// ===== URL更新 =====
function updateURL(chars, gimmicks) {
  const params = new URLSearchParams();

  if (chars.length) params.set("char", chars.join(","));
  if (gimmicks.length) params.set("gimmick", gimmicks.join(","));

  history.replaceState(null, "", `?${params.toString()}`);
}

// ===== URL復元 =====
function loadFromURL() {
  const params = new URLSearchParams(location.search);

  const chars = params.get("char")?.split(",") || [];
  const gimmicks = params.get("gimmick")?.split(",") || [];

  selectedChars = chars;
  selectedGimmicks = gimmicks;

  resetTags();

  if (chars.length || gimmicks.length) {
    triggerSearch();
  }
}

// ===== 初期化 =====
window.onload = () => {
  createTags("charTags", allChars, "char");
  createTags("gimmickTags", allGimmicks, "gimmick");

  loadFromURL();
};