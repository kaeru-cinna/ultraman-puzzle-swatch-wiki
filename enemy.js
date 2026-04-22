const params = new URLSearchParams(location.search);
const id = params.get("id");

const enemies = {
  ゴモラ: {
    name: "ゴモラ",
    locations: [
      {
        stage: "2",
        wave: 1,
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

  デマーガ: {
    name: "デマーガ",
    locations: [
      {
        stage: "1",
        wave: 1,
        obstacles: [],
        partners: []
      },
      {
        stage: "11",
        wave: 1,
        obstacles: ["巨大植物8個"],
        partners: ["ババルウ","デマーガ"]
      },
      {
        stage: "13",
        wave: 1,
        obstacles: ["巨大植物12個"],
        partners: ["ババルウ","デマーガ"]
      },
      {
        stage: "14",
        wave: 2,
        obstacles: ["巨大植物14個"],
        partners: ["タガヌラー","ババルウ","デマーガ"]
      },
      {
        stage: "18",
        wave: 2,
        obstacles: ["巨大植物22個"],
        partners: ["タガヌラー","ババルウ","デマーガ"]
      },
      {
        stage: "32",
        wave: 2,
        obstacles: ["砂利10個"],
        partners: ["スラン星人","ダダ","デマーガ"]
      },
      {
        stage: "34",
        wave: 2,
        obstacles: ["砂利14個"],
        partners: ["スラン星人","ダダ","デマーガ"]
      },
      {
        stage: "35",
        wave: 2,
        obstacles: ["砂利16個"],
        partners: ["モンスアーガー","ダダ","スラン星人","デマーガ"]
      },
      {
        stage: "37",
        wave: 2,
        obstacles: ["砂利20個"],
        partners: ["ダダ","ダダ","デマーガ"]
      },
      {
        stage: "38",
        wave: 2,
        obstacles: ["砂利22個"],
        partners: ["ダダ","モンスアーガー","デマーガ"]
      },
      {
        stage: "111",
        wave: 1,
        obstacles: ["ツル4個","巨大植物4個"],
        partners: ["ババルウ","デマーガ"]
      },
      {
        stage: "112",
        wave: 2,
        obstacles: ["ツル5個","巨大植物5個"],
        partners: ["タガヌラー","ババルウ","デマーガ"]
      },
      {
        stage: "113",
        wave: 1,
        obstacles: ["ツル6個","巨大植物6個"],
        partners: ["ババルウ","デマーガ"]
      },
      {
        stage: "114",
        wave: 2,
        obstacles: ["ツル7個","巨大植物7個"],
        partners: ["タガヌラー","ババルウ","デマーガ"]
      },
      {
        stage: "132",
        wave: 2,
        obstacles: ["石化5個","砂利5個"],
        partners: ["モンスアーガー","ダダ","デマーガ"]
      },
      {
        stage: "134",
        wave: 2,
        obstacles: ["石化7個","砂利7個"],
        partners: ["ダダ","モンスアーガー","デマーガ"]
      },
      {
        stage: "135",
        wave: 2,
        obstacles: ["石化8個","砂利8個"],
        partners: ["ダダ","モンスアーガー","スラン星人","デマーガ"]
      },
      {
        stage: "137",
        wave: 2,
        obstacles: ["石化10個","砂利10個"],
        partners: ["ダダ","スラン星人","デマーガ"]
      },
      {
        stage: "138",
        wave: 2,
        obstacles: ["石化11個","砂利11個"],
        partners: ["ダダ","デマーガ"]
      },
      {
        stage: "211",
        wave: 1,
        obstacles: ["ツル4個","巨大植物4個"],
        partners: ["ババルウ","デマーガ"]
      },
      {
        stage: "213",
        wave: 1,
        obstacles: ["ツル6個","巨大植物6個"],
        partners: ["ババルウ","デマーガ"]
      },
      {
        stage: "217",
        wave: 2,
        obstacles: ["ツル10個","巨大植物10個"],
        partners: ["タガヌラー","ババルウ","デマーガ"]
      },
      {
        stage: "232",
        wave: 2,
        obstacles: ["石化5個","砂利5個"],
        partners: ["ダダ","デマーガ","デマーガ"]
      },
      {
        stage: "234",
        wave: 2,
        obstacles: ["石化7個","砂利7個"],
        partners: ["ダダ","デマーガ","デマーガ"]
      },
      {
        stage: "235",
        wave: 2,
        obstacles: ["石化8個","砂利8個"],
        partners: ["ダダ","モンスアーガー","スラン星人","デマーガ"]
      },
      {
        stage: "237",
        wave: 2,
        obstacles: ["石化10個","砂利10個"],
        partners: ["ダダ","モンスアーガー","デマーガ"]
      },
      {
        stage: "238",
        wave: 2,
        obstacles: ["石化11個","砂利11個"],
        partners: ["ダダ","ダダ","デマーガ"]
      },
      {
        stage: "311",
        wave: 1,
        obstacles: ["巨大植物8個"],
        partners: ["ババルウ","デマーガ"]
      },
      {
        stage: "313",
        wave: 1,
        obstacles: ["巨大植物12個"],
        partners: ["ババルウ","デマーガ"]
      },
      {
        stage: "332",
        wave: 2,
        obstacles: ["砂利10個"],
        partners: ["ダダ","ダダ","デマーガ"]
      },
      {
        stage: "334",
        wave: 2,
        obstacles: ["砂利14個"],
        partners: ["ダダ","ダダ","デマーガ"]
      },
      {
        stage: "335",
        wave: 2,
        obstacles: ["砂利16個"],
        partners: ["ダダ","モンスアーガー","スラン星人","デマーガ"]
      },
      {
        stage: "337",
        wave: 2,
        obstacles: ["砂利20個"],
        partners: ["ダダ","モンスアーガー","デマーガ"]
      },
      {
        stage: "338",
        wave: 2,
        obstacles: ["砂利22個"],
        partners: ["ダダ","デマーガ"]
      },
      {
        stage: "411",
        wave: 1,
        obstacles: ["ツル8個"],
        partners: ["ババルウ","デマーガ"]
      },
      {
        stage: "412",
        wave: 2,
        obstacles: ["ツル10個"],
        partners: ["ババルウ","タガヌラー","デマーガ"]
      },
      {
        stage: "413",
        wave: 1,
        obstacles: ["ツル12個"],
        partners: ["ババルウ","デマーガ"]
      },
      {
        stage: "432",
        wave: 2,
        obstacles: ["石化10個"],
        partners: ["ダダ","スラン星人","デマーガ"]
      },
      {
        stage: "434",
        wave: 2,
        obstacles: ["石化14個"],
        partners: ["ダダ","スラン星人","デマーガ"]
      },
      {
        stage: "435",
        wave: 2,
        obstacles: ["石化16個"],
        partners: ["ダダ","スラン星人","モンスアーガー","デマーガ"]
      },
      {
        stage: "437",
        wave: 2,
        obstacles: ["石化20個"],
        partners: ["ダダ","ダダ","デマーガ"]
      },
      {
        stage: "438",
        wave: 2,
        obstacles: ["石化22個"],
        partners: ["ダダ","モンスアーガー","デマーガ"]
      },
      {
        stage: "511",
        wave: 1,
        obstacles: ["ツル4個","巨大植物4個"],
        partners: ["ババルウ","デマーガ"]
      },
      {
        stage: "513",
        wave: 1,
        obstacles: ["ツル6個","巨大植物6個"],
        partners: ["ババルウ","デマーガ"]
      },
      {
        stage: "514",
        wave: 2,
        obstacles: ["ツル7個","巨大植物7個"],
        partners: ["ババルウ","タガヌラー","デマーガ"]
      },
      {
        stage: "518",
        wave: 2,
        obstacles: ["ツル11個","巨大植物11個"],
        partners: ["ババルウ","タガヌラー","デマーガ"]
      },
      {
        stage: "532",
        wave: 2,
        obstacles: ["石化5個","砂利5個"],
        partners: ["ダダ","スラン星人","デマーガ"]
      },
      {
        stage: "534",
        wave: 2,
        obstacles: ["石化7個","砂利7個"],
        partners: ["ダダ","スラン星人","デマーガ"]
      },
      {
        stage: "535",
        wave: 2,
        obstacles: ["石化8個","砂利8個"],
        partners: ["ダダ","モンスアーガー","スラン星人","デマーガ"]
      }
    ]
  },

  ババルウ: {
    name: "ババルウ",
    locations: [
      {
        stage: "555",
        wave: 2,
        obstacles: ["巨大植物"],
        partners: ["デマーガ"]
      }
    ]
  },

  タガヌラー: {
    name: "タガヌラー",
    locations: [
      {
        stage: "1",
        wave: 1,
        obstacles: [],
        partners: []
      },
      {
        stage: "11",
        wave: 1,
        obstacles: ["巨大植物8個"],
        partners: ["ババルウ","デマーガ"]
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
          link.href = "Enemy.html?id=" + partnerId;
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