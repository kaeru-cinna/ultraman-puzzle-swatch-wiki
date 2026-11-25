
const basicFields = [
  "基本攻撃",
  "キャラ1",
  "キャラ2",
  "キャラ3",
  "キャラ4",
  "キャラ5",
  "リンクカード合計値",
  "ウルトラメカ"
];

const coreFields = [
  "コア1",
  "コア2",
  "コア3",
  "コア4",
  "コア5",
  "コア6",
  "コア7",
  "コア8"
];

const otherFields = [
  "上限補正",
  "敵防御力",
  "ステージバフ"
];

const damageFields = [
  "ダメージアップ1",
  "ダメージアップ2",
  "ダメージアップ3",
  "ダメージアップ4",
  "ダメージアップ5"
];

const allFields = [
  ...basicFields,
  ...coreFields,
  ...otherFields,
  ...damageFields
];

// 入力欄作成
function createInputs(fields, targetId) {
  const target = document.getElementById(targetId);

  fields.forEach(name => {
    const div = document.createElement("div");
    div.className = "damage-field";

    const label = document.createElement("label");
    label.textContent = name;
    label.htmlFor = "damage-" + name;

    const input = document.createElement("input");
    input.type = "number";
    input.step = "any";
    input.id = "damage-" + name;
    input.placeholder = "0";

    if (
      coreFields.includes(name) ||
      name === "ステージバフ" ||
      damageFields.includes(name)
    ) {
      input.value = "1";
    } else {
      input.value = "0";
    }

    input.addEventListener("input", calculate);

    div.appendChild(label);
    div.appendChild(input);
    target.appendChild(div);
  });
}

// 入力欄生成
createInputs(basicFields, "basicInputs");
createInputs(coreFields, "coreInputs");
createInputs(otherFields, "otherInputs");
createInputs(damageFields, "damageInputs");

// 入力値取得
function getValue(name) {
  const input = document.getElementById("damage-" + name);

  if (input.value.trim() === "") {
    return 0;
  }

  return Number(input.value);
}

// 敵防御力変換
function getEnemyDefense() {
  const defense = getValue("敵防御力");

  const defenseTable = {
    10: 0.9091,
    30: 0.7692,
    85: 0.5405,
    215: 0.3175,
    1000: 0.909
  };

  if (
    !Object.prototype.hasOwnProperty.call(
      defenseTable,
      defense
    )
  ) {
    return null;
  }

  return defenseTable[defense];
}

// 数値表示
function formatNumber(value) {
  if (!Number.isFinite(value)) {
    return "計算不能";
  }

  return value.toLocaleString("ja-JP", {
    maximumFractionDigits: 10
  });
}

// 計算処理
function calculate() {

  const resultsElement = document.getElementById("results");

  // 敵防御力チェック
  const enemyDefense = getEnemyDefense();

  if (enemyDefense === null) {
    resultsElement.innerHTML = `
      <div class="damage-error">
        エラー：敵防御力は10、30、85、215、1000
        のいずれかを入力してください。
      </div>
    `;
    return;
  }

  // 基本攻撃・加算項目
  const baseSum = basicFields.reduce(
    (sum, name) => sum + getValue(name),
    0
  );

  // コア倍率
  const coreMultiplier = coreFields.reduce(
    (result, name) => result * getValue(name),
    1
  );

  // 値A
  const A = baseSum * coreMultiplier;

  // ステージバフ（入力値÷100）
  const stageBuff = getValue("ステージバフ") / 100;

  // 値B
  const B = A * stageBuff * enemyDefense;

  // 値C
  const C = getValue("上限補正") * 0.7535;

  // 値D
  const D = B - C;

  // 値E
  const E = D * 0.01;

  // 値F
  const F = D + E;

  // ダメージアップ倍率
  const damageMultiplier = damageFields.reduce(
    (result, name) => result * getValue(name),
    1
  );

  // 値G
  const G = F * damageMultiplier;

  // 計算結果
  const results = [
    ["値A", A],
    ["値B", B],
    ["値C", C],
    ["値D", D],
    ["値E", E],
    ["値F", F],
    ["値G（最終ダメージ）", G]
  ];

  resultsElement.innerHTML = results.map(
    ([name, value], index) => `
      <div class="damage-result-row ${
        index === 6 ? "damage-final" : ""
      }">
        <span>${name}</span>
        <strong>${formatNumber(value)}</strong>
      </div>
    `
  ).join("");
}

// リセット
function resetAll() {

  allFields.forEach(name => {

    const input = document.getElementById(
      "damage-" + name
    );

    if (
      coreFields.includes(name) ||
      name === "ステージバフ" ||
      damageFields.includes(name)
    ) {
      input.value = 1;
    } else {
      input.value = 0;
    }

  });

  calculate();
}

// リセットボタン
document.getElementById("resetButton").addEventListener(
  "click",
  resetAll
);

// 初回計算
calculate();
