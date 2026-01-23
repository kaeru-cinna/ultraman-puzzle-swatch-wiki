let isDrawing = false;

/* 排出率テーブル（画像は後で差し替え可） */
const gachaRates = {
  normal: [
    { name: "コモン", rate: 70, rarity: 3, img: "images/common.png" },
    { name: "レア", rate: 25, rarity: 4, img: "images/rare.png" },
    { name: "スーパーレア", rate: 5, rarity: 5, img: "images/super_rare.png" }
  ],
  rare: [
    { name: "コモン", rate: 50, rarity: 3, img: "images/common.png" },
    { name: "レア", rate: 35, rarity: 4, img: "images/rare.png" },
    { name: "スーパーレア", rate: 15, rarity: 5, img: "images/super_rare.png" }
  ]
};

function drawOnce(table) {
  const rand = Math.random() * 100;
  let total = 0;
  for (const item of table) {
    total += item.rate;
    if (rand < total) return item;
  }
  return table[0];
}

/* 20連（1枠ずつ） */
function draw20() {
  if (isDrawing) return;

  isDrawing = true;
  document.getElementById("retryButton").style.display = "none";

  const level = document.getElementById("gachaLevel").value;
  const table = gachaRates[level];
  const results = document.getElementById("results");

  results.innerHTML = "";

  for (let i = 0; i < 20; i++) {
    setTimeout(() => {
      const item = drawOnce(table);

      const div = document.createElement("div");
      div.className = `gacha-item rarity-${item.rarity}`;

      const img = document.createElement("img");
      img.src = item.img;
      img.alt = item.name;
      img.onerror = () => img.remove();
      div.appendChild(img);

      const p = document.createElement("p");
      p.textContent = item.name;
      div.appendChild(p);

      if (item.rarity === 5) {
        div.classList.add("rare-hit");
      }

      results.appendChild(div);

      if (i === 19) {
        isDrawing = false;
        document.getElementById("retryButton").style.display = "inline-block";
      }
    }, i * 150);
  }
}

function retryGacha() {
  draw20();
}
