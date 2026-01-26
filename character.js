// URLから ?id=xxx を取得
const params = new URLSearchParams(location.search);
const id = params.get("id");

// キャラデータ（ここ増やすだけ）
const characters = {
  ULTRAMAN_ZERO: {
    name: "ウルトラマンゼロ",
    introduction: "タロウの息子"
  },
  ULTRAMAN_TRO: {
    name: "ウルトラセブン",
    introduction: "テクニカルで上級者向け。"
  }
};

// 表示処理
if (characters[id]) {
  document.getElementById("name").textContent = characters[id].name;
  document.getElementById("introduction").textContent = characters[id].introduction;
} else {
  document.getElementById("name").textContent = "キャラが見つかりません";
}