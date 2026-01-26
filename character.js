// URLから ?id=xxx を取得
const params = new URLSearchParams(location.search);
const id = params.get("id");

// キャラデータ（ここ増やすだけ）
const characters = {
  ULTRAMAN_ZERO: {
    name: "ウルトラマンゼロ",
    worksPerformed: "大怪獣バトル ウルトラ銀河伝説 THE MOVIE",
    height: "49m",
    weight: "35,000t",
    introduction: "M78星雲・光の国出身のウルトラヒーロー。
    ウルトラセブンを父に持ち、ウルトラマンレオ・アストラ兄弟に師事している。
    頭部の宇宙ブーメラン・ゼロスラッガーや父譲りの光線技、レオに鍛えられた格闘技で戦う。
    盟友、グレンファイヤー・ミラーナイト・ジャンボット・ジャンナインらと「ウルティメイトフォースゼロ」というチームを結成している。"
  },
  ULTRAMAN_TRO: {
    name: "ウルトラセブン",
    introduction: "テクニカルで上級者向け。"
  }
};

// 表示処理
if (characters[id]) {
  document.getElementById("name").textContent = characters[id].name;
  document.getElementById("worksPerformed").textContent = characters[id].worksPerformed;
  document.getElementById("height").textContent = characters[id].height;
  document.getElementById("weight").textContent = characters[id].weight;
  document.getElementById("introduction").textContent = characters[id].introduction;
} else {
  document.getElementById("name").textContent = "キャラが見つかりません";
}