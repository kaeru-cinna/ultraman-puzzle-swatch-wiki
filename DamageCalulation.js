document.getElementById("scoreForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const base = Number(document.getElementById("baseScore").value) || 0;
  const maxHp = Number(document.getElementById("maxHp").value) || 0;
  const currentHp = Number(document.getElementById("currentHp").value) || 0;

  // 固定係数（ゲーム仕様に合わせて変更）
  const coefficients = {
    bonus1: 0.01,
    bonus2: 0.02,
    bonus4: 0.03,
    bonus5: 0.01
  };

  let finalScore = base;

  // 通常ボーナス
  const v1 = Number(document.getElementById("v1").value) || 0;
  const v2 = Number(document.getElementById("v2").value) || 0;
  const v4 = Number(document.getElementById("v4").value) || 0;
  const v5 = Number(document.getElementById("v5").value) || 0;

  finalScore *= (1 + v1 * coefficients.bonus1);
  finalScore *= (1 + v2 * coefficients.bonus2);
  finalScore *= (1 + v4 * coefficients.bonus4);
  finalScore *= (1 + v5 * coefficients.bonus5);

  //HP依存ボーナス（最大50%）
  if (maxHp > 0) {
    let hpRate = currentHp / maxHp;
    hpRate = Math.max(0, Math.min(1, hpRate)); // 0〜1制限

    const maxBonus = 0.5; // 最大50%
    const hpBonus = hpRate * maxBonus;

    finalScore *= (1 + hpBonus);
  }

  document.getElementById("result").textContent =
    "最終スコア: " + Math.floor(finalScore);
});