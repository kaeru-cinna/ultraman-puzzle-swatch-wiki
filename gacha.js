let isDrawing = false;

/* 排出率テーブル（画像は後で差し替え可） */
const gachaRates = {
  Character: [
    { name: "ノーバ", rate: 8.333, rarity: 3, img: "silver1.png" },
    { name: "ババルウ", rate: 8.333, rarity: 3, img: "silver1.png" },
    { name: "ネロンガ", rate: 8.333, rarity: 3, img: "silver1.png" },
    { name: "ガラオン", rate: 6.250, rarity: 3, img: "silver2.png" },
    { name: "ツインテール", rate: 6.250, rarity: 3, img: "silver2.png" },
    { name: "グドン", rate: 6.250, rarity: 3, img: "silver2.png" },
    { name: "タガヌラー", rate: 6.250, rarity: 3, img: "silver2.png" },
    { name: "デマーガ", rate: 3.989, rarity: 3, img: "silver3.png" },
    { name: "シャゴン", rate: 3.989, rarity: 3, img: "silver3.png" },
    { name: "ウインダム", rate: 3.989, rarity: 3, img: "silver3.png" },
    { name: "ミクラス", rate: 3.989, rarity: 3, img: "silver3.png" },
    { name: "ベムスター", rate: 3.989, rarity: 3, img: "silver3.png" },
    { name: "アギラ", rate: 3.989, rarity: 3, img: "silver3.png" },
    { name: "モンスアーガー", rate: 3.989, rarity: 3, img: "silver3.png" },
    { name: "オーブ", rate: 2.286, rarity: 3, img: "silver4.png" },
    { name: "ベロクロン", rate: 2.286, rarity: 3, img: "silver4.png" },
    { name: "ウルトラマン", rate: 2.286, rarity: 3, img: "silver4.png" },
    { name: "マグマ星人", rate: 2.286, rarity: 3, img: "silver4.png" },
    { name: "ネクサスAF", rate: 2.286, rarity: 3, img: "silver4.png" },
    { name: "ザムシャー", rate: 2.286, rarity: 3, img: "silver4.png" },
    { name: "セブン", rate: 2.286, rarity: 3, img: "silver4.png" },
    { name: "スラン星人", rate: 0.625, rarity: 3, img: "gold1.png" },
    { name: "マックス", rate: 0.625, rarity: 3, img: "gold1.png" },
    { name: "ダダ", rate: 0.625, rarity: 3, img: "gold1.png" },
    { name: "バードン", rate: 0.625, rarity: 3, img: "gold1.png" },
    { name: "アストラ", rate: 0.625, rarity: 3, img: "gold1.png" },
    { name: "ホロボロス", rate: 0.625, rarity: 3, img: "gold1.png" },
    { name: "ブルAQ", rate: 0.625, rarity: 3, img: "gold1.png" },
    { name: "ロッソFL", rate: 0.625, rarity: 3, img: "gold1.png" },
    { name: "エックス", rate: 0.067, rarity: 3, img: "gold2.png" },
    { name: "バルタン星人", rate: 0.067, rarity: 3, img: "gold2.png" },
    { name: "レオ", rate: 0.067, rarity: 3, img: "gold2.png" },
    { name: "ジャック", rate: 0.067, rarity: 3, img: "gold2.png" },
    { name: "レイキュウバス", rate: 0.067, rarity: 3, img: "gold2.png" },
    { name: "ガンQ", rate: 0.067, rarity: 3, img: "gold2.png" },
    { name: "アグル", rate: 0.067, rarity: 3, img: "gold2.png" },
    { name: "ガイア", rate: 0.067, rarity: 3, img: "gold2.png" },
    { name: "セブンガー", rate: 0.067, rarity: 3, img: "gold2.png" },
    { name: "ゼットORG", rate: 0.067, rarity: 3, img: "gold2.png" },
    { name: "デッカーFL", rate: 0.067, rarity: 3, img: "gold2.png" },
    { name: "ベロクロン", rate: 0.067, rarity: 3, img: "gold2.png" },
    { name: "ダイナFL", rate: 0.017, rarity: 4, img: "gold3.png" },
    { name: "メルバ", rate: 0.017, rarity: 4, img: "gold3.png" },
    { name: "ゴルザ", rate: 0.017, rarity: 4, img: "gold3.png" },
    { name: "ゴモラ", rate: 0.017, rarity: 4, img: "gold3.png" },
    { name: "メビウス", rate: 0.017, rarity: 4, img: "gold3.png" },
    { name: "ゾフィー", rate: 0.017, rarity: 4, img: "gold3.png" },
    { name: "エース", rate: 0.017, rarity: 4, img: "gold3.png" },
    { name: "テラフェイザー", rate: 0.017, rarity: 4, img: "gold3.png" },
    { name: "アースガロン", rate: 0.017, rarity: 4, img: "gold3.png" },
    { name: "トリガーMUL", rate: 0.017, rarity: 4, img: "gold3.png" },
    { name: "アーク", rate: 0.017, rarity: 4, img: "gold3.png" },
    { name: "ギンガ", rate: 0.017, rarity: 4, img: "gold3.png" },
    { name: "ブレイザー", rate: 0.017, rarity: 4, img: "gold3.png" },
    { name: "エレキング", rate: 0.017, rarity: 4, img: "gold3.png" },
    { name: "オメガ", rate: 0.017, rarity: 4, img: "gold3.png" },
    { name: "ティガMUL", rate: 0.006, rarity: 5, img: "gold4.png" },
    { name: "ゼロ", rate: 0.006, rarity: 5, img: "gold4.png" },
    { name: "ゼットン", rate: 0.006, rarity: 5, img: "gold4.png" },
    { name: "タロウ", rate: 0.006, rarity: 5, img: "gold4.png" },
    { name: "ジャグラー", rate: 0.006, rarity: 5, img: "gold4.png" }
  ],
  Core: [
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
