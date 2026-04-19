const params = new URLSearchParams(location.search);
const id = params.get("id");

const enemies = {
  gomora: {
    name: "ゴモラ",
    locations: [
      {
        stage: "第1章 3-2",
        wave: 2,
        obstacles: ["岩", "トゲ"],
        partners: ["pigmon", "redking"]
      },
      {
        stage: "第2章 5-1",
        wave: 1,
        obstacles: [],
        partners: ["redking"]
      }
    ]
  },

  pigmon: {
    name: "ピグモン",
    locations: [
      {
        stage: "第1章 3-2",
        wave: 2,
        obstacles: ["岩"],
        partners: ["gomora"]
      }
    ]
  },

  redking: {
    name: "レッドキング",
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
        if (partnerId !== id && enemies[partnerId]) {

          const link = document.createElement("a");
          link.href = "Enemy.html?id=" + partnerId;
          link.textContent = enemies[partnerId].name;

          partnerCell.appendChild(link);

          if (index < loc.partners.length - 1) {
            partnerCell.appendChild(document.createTextNode(" / "));
          }
        }
      });
    } else {
      partnerCell.textContent = "-";
    }
  });

} else {
  document.getElementById("enemyName").textContent = "敵が見つかりません";
}