const params = new URLSearchParams(location.search);
const id = params.get("id");

const enemies = {
  Gomora: {
    name: "ゴモラ",
    locations: [
      {
        stage: "2",
        wave: 2,
        obstacles: ["木箱7個"],
        partners: []
      },
      {
        stage: "410",
        wave: 1,
        obstacles: ["ガラス"],
        partners: []
      }
    ]
  },

  Demarga: {
    name: "デマーガ",
    locations: [
      {
        stage: "1",
        wave: 2,
        obstacles: [],
        partners: []
      },
      {
        stage: "11",
        wave: 1,
        obstacles: ["巨大植物8個"],
        partners: ["Babalou","Demarga"]
      }
    ]
  },

  Babalou: {
    name: "ババルウ",
    locations: [
      {
        stage: "第1章 3-2",
        wave: 2,
        obstacles: ["トゲ"],
        partners: ["gomora"]
      }
    ]
  }
};

if (enemies[id]) {
  const enemy = enemies[id];

  document.getElementById("enemyName").textContent = enemy.name;
  document.title = enemy.name + "｜敵情報";

  const table = document.getElementById("enemyTable");

  enemy.locations.forEach(loc => {
    const row = table.insertRow();

    row.insertCell(0).textContent = loc.stage;
    row.insertCell(1).textContent = loc.wave ?? "-";

    const obstacleCell = row.insertCell(2);
    obstacleCell.textContent = loc.obstacles && loc.obstacles.length
      ? loc.obstacles.join(" / ")
      : "-";

    const partnerCell = row.insertCell(3);

   if (loc.partners && loc.partners.length) {
      loc.partners.forEach((partnerId, index) => {

        // 自分自身はリンクなしで表示
        if (partnerId === id) {
          const span = document.createElement("span");
          span.textContent = enemies[partnerId].name;
          partnerCell.appendChild(span);

        // 他の敵はリンク
        } else if (enemies[partnerId]) {
          const link = document.createElement("a");
          link.href = "enemy.html?id=" + partnerId;
          link.textContent = enemies[partnerId].name;
          partnerCell.appendChild(link);
        }

        // 区切り
        if (index < loc.partners.length - 1) {
          partnerCell.appendChild(document.createTextNode(" / "));
        }
      });

    } else {
      partnerCell.textContent = "-";
    }
  });

} else {
  document.getElementById("enemyName").textContent = "敵が見つかりません";
}