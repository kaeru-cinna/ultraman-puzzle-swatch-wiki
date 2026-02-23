document.getElementById("damageForm").addEventListener("submit", function(e) {
  e.preventDefault(); // リロード防止

  let total = 0;

  for (let i = 1; i <= 5; i++) {
    const checked = document.getElementById("c" + i).checked;

    if (checked) {
      const value = Number(document.getElementById("v" + i).value) || 0;
      const multi = Number(document.getElementById("m" + i).value) || 0;
      total += value * multi;
    }
  }

  document.getElementById("result").textContent =
    "合計ダメージ: " + Math.floor(total);
});