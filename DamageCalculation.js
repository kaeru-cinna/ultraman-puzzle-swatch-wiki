document.getElementById("scoreForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const base = Number(document.getElementById("baseScore").value) || 0;
  const maxHp = Number(document.getElementById("maxHp").value) || 0;
  const currentHp = Number(document.getElementById("currentHp").value) || 0;

  const coefficients = {
    boomerang: 0.01,
    napalm: 0.03,
    special_move: 0.01,
    military_power: 0.50
  };

  let finalScore = base;

  const v1 = Number(document.getElementById("v1").value) || 0;
  const v2 = Number(document.getElementById("v2").value) || 0;
  const v3 = Number(document.getElementById("v3").value) || 0;
  const v4 = Number(document.getElementById("v4").value) || 0;

  finalScore *= (1 + v1 * coefficients.boomerang);
  finalScore *= (1 + v2 * coefficients.napalm);
  finalScore *= (1 + v3 * coefficients.special_move);

  if (maxHp > 0) {
    let hpRate = currentHp / maxHp;
    hpRate = Math.max(0, Math.min(1, hpRate));

    const maxBonus = 0.5;
    const hpBonus = hpRate * maxBonus;

    finalScore *= (1 + hpBonus);
  }
  finalScore += (1 + v4 * coefficients.military_power);

  document.getElementById("score-result").textContent =
    "最終スコア: " + Math.floor(finalScore);
});