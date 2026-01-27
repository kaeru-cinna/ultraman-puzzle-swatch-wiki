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
    introduction: "M78星雲・光の国出身のウルトラヒーロー。\nウルトラセブンを父に持ち、ウルトラマンレオ・アストラ兄弟に師事している。\n頭部の宇宙ブーメラン・ゼロスラッガーや父譲りの光線技、レオに鍛えられた格闘技で戦う。\n盟友、グレンファイヤー・ミラーナイト・ジャンボット・ジャンナインらと「ウルティメイトフォースゼロ」というチームを結成している。"
  },
  ULTRAMAN_TIGA_MULTI: {
    name: "ウルトラマンティガ マルチタイプ",
    worksPerformed: "ウルトラマンティガ",
    height: "53m",
    weight: "44,000t",
    introduction: "3000万年の時を経て復活した超古代の光の巨人で、地球平和連合「TPC」の特捜チーム「GUTS」のマドカ・ダイゴ隊員が変身する。\nタイプチェンジ能力を持ち、マルチタイプはパワーとスピードのバランスに優れている。\nまた、必殺技の「ゼペリオン光線」をはじめ多彩な光線技を撃つことが可能。"
  },
  ULTRAMAN_TARO: {
    name: "ウルトラマンタロウ",
    worksPerformed: "ウルトラマンタロウ",
    height: "53m",
    weight: "55,000t",
    introduction: "M78星雲・光の国出身。\nウルトラの父とウルトラの母の実子であると同時に、ウルトラ兄弟6番目の弟でもある。宇宙科学警備隊「ZAT」隊員の東 光太郎がウルトラバッジで変身する。\nウルトラ兄弟の中でも特にポテンシャルが高く、「ストリウム光線」や「ウルトラダイナマイト」といった強力な必殺技を持つ。\n光の国へ帰還した後は「宇宙警備隊」の筆頭教官となり、ウルトラマンメビウスを鍛え上げた。"
  },
  ULTRAMAN_: {
    name: "",
    worksPerformed: "",
    height: "m",
    weight: "",
    introduction: ""
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