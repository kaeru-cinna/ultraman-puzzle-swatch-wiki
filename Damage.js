
document.getElementById("scoreForm").addEventListener("submit", function(e) {
  e.preventDefault();

  // 基本入力値
  const upperLimit = Number(document.getElementById("upperLimit").value) || 0;
  const bombAttack = Number(document.getElementById("bombAttack").value) || 0;
  const stageGimmick = Number(document.getElementById("stageGimmick").value) || 0;

  // 敵防御力（計算ボタンを押すたびに最新の選択値を取得）
  const enemyDefenseElement = document.querySelector(
    'input[name="enemyDefense"]:checked'
  );

  const enemyDefense = enemyDefenseElement
    ? Number(enemyDefenseElement.value)
    : 1;

  // 変数
  let limitDamage = 0;
  let finalDamage = 0;
  let damageNotation = "";

  // ステージバフ
  let stageSupport = 1;

  if (document.getElementById("damage6Enable").checked) {
    stageSupport = stageGimmick / 100;
  }

  // ダメージ上限補正
  limitDamage = upperLimit * 0.7535;

  // 基本ダメージ計算
  finalDamage = bombAttack * stageSupport * enemyDefense;
  
  if (finalDamage > limitDamage) {
    finalDamage = limitDamage + ((finalDamage - limitDamage) * 0.01);
  }

  // ダメージアップ入力値
  const v1 = Number(document.getElementById("v1").value) || 0;
  const v2 = Number(document.getElementById("v2").value) || 0;
  const v3 = Number(document.getElementById("v3").value) || 0;
  const v4 = Number(document.getElementById("v4").value) || 0;
  const v5 = Number(document.getElementById("v5").value) || 0;

  // ダメージアップ1～5
  if (document.getElementById("damage1Enable").checked) {
    finalDamage *= (1 + v1 / 100);
  }

  if (document.getElementById("damage2Enable").checked) {
    finalDamage *= (1 + v2 / 100);
  }

  if (document.getElementById("damage3Enable").checked) {
    finalDamage *= (1 + v3 / 100);
  }

  if (document.getElementById("damage4Enable").checked) {
    finalDamage *= (1 + v4 / 100);
  }

  if (document.getElementById("damage5Enable").checked) {
    finalDamage *= (1 + v5 / 100);
  }

  // 小数点以下切り捨て
  finalDamage = Math.floor(finalDamage);

  // K・M・B表記
  if (finalDamage >= 100000000000) {
    damageNotation = (finalDamage / 1000000000).toFixed(1) + "B";
  } else if (finalDamage >= 100000000) {
    damageNotation = (finalDamage / 1000000).toFixed(1) + "M";
  } else if (finalDamage >= 100000) {
    damageNotation = (finalDamage / 1000).toFixed(1) + "K";
  }

  // 計算結果表示
  document.getElementById("damage-result").textContent =
    "最終スコア: " + finalDamage.toLocaleString() +
    "( " + damageNotation + " )";

});
