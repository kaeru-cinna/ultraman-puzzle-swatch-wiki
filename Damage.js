document.getElementById("scoreForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const upperLimit = Number(document.getElementById("upperLimit").value) || 0;
  const bombAttack = Number(document.getElementById("bombAttack").value) || 0;
  const enemyDefense = Number(document.getElementById("enemyDefense").value) || 0;
  const stageGimmick = Number(document.getElementById("stageGimmick").value) || 0;

  let finalDamage = 0;
  let damageNotation;

  const v1 = Number(document.getElementById("v1").value) || 0;
  const v2 = Number(document.getElementById("v2").value) || 0;
  const v3 = Number(document.getElementById("v3").value) || 0;
  const v4 = Number(document.getElementById("v4").value) || 0;
  const v5 = Number(document.getElementById("v5").value) || 0;
  

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

  //ここからしたは残す
  finalDamage = Math.floor(finalDamage);
  
  if (finalDamage >= 100000000000) {
    damageNotation = (finalDamage / 1000000000).toFixed(1) + "B";
  }else if (finalDamage >= 100000000) {
    damageNotation = (finalDamage / 1000000).toFixed(1) + "M";
  } else if(finalDamage >= 100000){
    damageNotation = (finalDamage / 1000).toFixed(1) + "K";    
  }

  document.getElementById("damage-result").textContent =
    "最終スコア: " + finalDamage.toLocaleString()+"( " + damageNotation + " )";
});