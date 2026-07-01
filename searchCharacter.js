const characterSearchCharacters=[
{name:"ウルトラマンゼロ",
 rarity:"☆4",
 special:"・3列の敵に5460%のダメージを与える\n・ブーメランを3個生成する",
 ability:"・ブーメラン攻撃力+40%",
 rinkCard:"・『大怪獣バトル』\n-セブンの息子-\n・『大怪獣バトル』\n(ゼロVSベリアル)",
 tags:["ブーメラン生成","ブーメラン攻撃"]
 },
{name:"ウルトラマンゼロ\n(ウルトラゼロマント)",
 rarity:"☆4",
 special:"・3列の敵に5460%のダメージを与える\n・盤面のピースを12個消去する",
 ability:"・通常攻撃力+35%",
 rinkCard:"・『大怪獣バトル』\n-セブンの息子-\n・『大怪獣バトル』\n(ゼロVSベリアル)",
 tags:["ピース消去","通常攻撃"]
 },
{name:"ウルトラマン",
 rarity:"◇4",
 special:"・1列の敵に3150%ダメージ\n・1ターン味方の通常攻撃45%アップ",
 ability:"・基本攻撃力+23%",
 rinkCard:"・ウルトラヒーローズ\n・『ウルトラマン』\n(ウルトラマンVSゼットン)\n・ウルトラヒーローズ\n-星を超えた出会い-",
 tags:["基本攻撃","通常攻撃"]
 },
{name:"ババルウ",
 rarity:"◇1",
 special:"・青ピースを自属性ピースに変換\n・ロケットを1つ生成する",
 ability:"・最大LP+15%",
 rinkCard:"なし",
 tags:["属性(青)","ピース変換","ロケット生成","LP"]
 },
{name:"ウルトラマンティガ\n(マルチタイプ)",
 rarity:"☆4",
 special:"3列の敵に5460%のダメージを与える・\n・自身以外のランダムなキャラの必殺技ゲージを50%アップ",
 ability:"・味方の初期必殺技ゲージ+25%",
 rinkCard:"・ティガ&トリガー",
 tags:["必殺ゲージ"]
 },
{name:"ウルトラマンタロウ",
 rarity:"☆4",
 special:"・3列の敵に5460%のダメージを与える\n・ナパームを3個生成する",
 ability:"・ナパーム攻撃力+40%",
 rinkCard:"・タロウ&メビウス\n-光の国での教え-\n・ウルトラヒーローズ\n-星を超えた出会い-",
 tags:["ナパーム生成","ナパーム攻撃"]
 },
{name:"ジャグラス ジャグラー",
 rarity:"☆4",
 special:"3列の敵に5460%のダメージを与える・\n・1列のピースを消去する",
 ability:"・自身の初期必殺技ゲージ+25%",
 rinkCard:"なし",
 tags:["必殺ゲージ","ピース消去"]
 },
{name:"ゼットン",
 rarity:"☆4",
 special:"・1列の敵に6825%のダメージを与える\n・ナパームを3個生成する",
 ability:"・赤属性攻撃力+40%",
 rinkCard:"・『宇宙恐竜-ゼットン-に恋して』\n・『ウルトラマン』\n(ウルトラマンVSゼットン)",
 tags:["属性(赤)","ナパーム生成"]
 },
{name:"ウルトラマンオメガ\nヴァルジュネスアーマー",
 rarity:"☆4",
 special:"・3列の敵に5460%のダメージを与える\n・盤面の赤、青、緑、黄ピースを3個ずつ消去する",
 ability:"・自身の初期必殺技ゲージ+25%",
 rinkCard:"・『ウルトラマンオメガ』\n(オメガ-赤き光の巨人-)",
 tags:["属性(赤)","属性(青)","属性(緑)","属性(黄)","必殺ゲージ"]
 },
{name:"ウルトラマンブレーザー\nチルソナイトソード",
 rarity:"☆4",
 special:"・1列の敵に6825%のダメージを与える\n・1列のピースを緑属性に4個変化させる",
 ability:"・クリティカル攻撃力+40%\n・自身の初期必殺技ゲージ+10%",
 rinkCard:"・『ウルトラマンブレーザー』\n(ブレーザー&アースガロン)",
 tags:["属性(緑)","必殺ゲージ","クリティカル攻撃"]
 },
{name:"カルミラ",
 rarity:"☆4",
 special:"・3列の敵に5460%のダメージを与える\n・盤面のボムを5個発動させる",
 ability:"・ロケット攻撃力+40%",
 rinkCard:"なし",
 tags:["ボム発動","ロケット攻撃"]
 },
{name:"ウルトラマンネクサス\nジュネッス",
 rarity:"☆4",
 special:"・3列の敵に5460%のダメージを与える\n・2ターンの間、敵のクリティカル防御力を25%減少させる",
 ability:"・クリティカル発生率+1100",
 rinkCard:"・『ウルトラマンネクサス』\n(ネクサスVSダークメフィスト)",
 tags:["クリ発生率","クリ防御減少"]
 },
{name:"ウルトラマンメビウス\nメビウスバーニングブレイブ",
 rarity:"☆4",
 special:"・3列の敵に5460%のダメージを与える\n・3ターンの間、味方の赤属性攻撃力が60%アップ",
 ability:"・すべての属性攻撃力に赤属性攻撃力の150%を追加",
 rinkCard:"・『ウルトラマンメビウス』\n(メビウスVSインペライザー)\n・タロウ&メビウス\n-光の国での教え-",
 tags:["属性(赤)"]
 },
{name:"ウルトラマントレギア",
 rarity:"☆4",
 special:"・1列の敵に5460%のダメージを与える\n・1ターンの間、敵の赤属性の防御力を50%減少させる",
 ability:"・赤属性の攻撃力+40%\n・ピース操作でサークル単体発動時、ターン終了時にサークルを1個生成(1回まで発動)",
 rinkCard:"なし",
 tags:["属性(赤)","赤防御減少","サークル生成"]
 },
{name:"ウルトラマンタロウ\n(ウルトラダイナマイト)",
 rarity:"☆4",
 special:"・1列のピースにダメージを与え、\n敵に5460%のダメージを与える\n・ナパームを3個生成する",
 ability:"・ピース操作でナパーム単体発動時、ターン終了時にナパームを1個生成(10回まで発動)",
 rinkCard:"・タロウ&メビウス\n-光の国での教え-\n・ウルトラヒーローズ\n-星を超えた出会い-"",
 tags:["ピースダメージ","ナパーム生成"]
 },
{name:"ウルトラマンゼロ\n(ゼロツインソード)",
 rarity:"☆4",
 special:"・1列の敵に5460%のダメージを与える\n・ブーメランを最大5個生成する",
 ability:"・ターン終了時、ブーメランを1個生成",
 rinkCard:"・『大怪獣バトル』\n-セブンの息子-\n・『大怪獣バトル』\n(ゼロVSベリアル)",
 tags:["ブーメラン生成"]
 },
{name:"ウルトラマンベリアル\n(ギガバトルナイザー)",
 rarity:"☆4",
 special:"・1列の敵に7644%のダメージを与える\n・1ターンの間、味方の通常攻撃力が75%アップする",
 ability:"・通常攻撃力+35%",
 rinkCard:"・『大怪獣バトル』\n-セブンの息子-\n・『大怪獣バトル』\n(ゼロVSベリアル)\n・ジードVSベリアル\n-運命を変える戦い-",
 tags:["通常攻撃"]
 },
{name:"ウルトラマンギンガストリウム",
 rarity:"☆4",
 special:"・1列の敵に5460%のダメージを与える\n・盤面の赤、青、緑、黄、紫ピースを2個ずつ消去する",
 ability:"・ターン終了時、ナパームを1個生成(最大6回まで発動)",
 rinkCard:"『ウルトラマンギンガS』\n(ギンガ&ビクトリー)",
 tags:["属性(赤)","属性(青)","属性(緑)","属性(黄)","属性(紫)","ナパーム生成"]
 },
{name:"ウルトラマンビクトリー\n(シェパードンセイバー)",
 rarity:"☆4",
 special:"・1列の敵に5460%のダメージを与える\n・盤面のV字型の範囲に対して、ギミックにはダメージを与え、ピースは消去する",
 ability:"・青属性攻撃力+40%",
 rinkCard:"なし",
 tags:["属性(青)","ギミックダメージ","ピース消去"]
 }
 ];

const characterSearchSelectedTags=new Set();

const tagArea=document.getElementById("characterSearchTagArea"); const
tbody=document.getElementById("characterSearchTableBody"); const
resultCount=document.getElementById("characterSearchResultCount"); const
noResult=document.getElementById("characterSearchNoResult");

document.getElementById("characterSearchClearButton").addEventListener("click",()=>{
characterSearchSelectedTags.clear(); renderTags(); renderTable(); });

function sortJa(arr){return arr.sort((a,b)=>a.localeCompare(b,"ja"));}

function renderTags(){ tagArea.innerHTML=""; const tags = [...new Set(characterSearchCharacters.flatMap(c => c.tags))];
sortJa(tags).forEach(tag=>{ const b=document.createElement("button");
b.type="button";
b.className = "characterSearchTagButton" + (characterSearchSelectedTags.has(tag) ? " characterSearchTagSelected" : "");
b.textContent=tag; b.onclick=()=>{
if(characterSearchSelectedTags.has(tag))
characterSearchSelectedTags.delete(tag); else
characterSearchSelectedTags.add(tag); renderTags(); renderTable(); };
tagArea.appendChild(b); }); }

function renderTable(){ tbody.innerHTML=""; let
list=[...characterSearchCharacters].sort((a,b)=>a.name.localeCompare(b.name,"ja"));
if(characterSearchSelectedTags.size){
list=list.filter(c=>[...characterSearchSelectedTags].every(t=>c.tags.includes(t)));
} resultCount.textContent="検索結果："+list.length+"件";
noResult.style.display=list.length?"none":"block"; list.forEach(c=>{
const tr=document.createElement("tr");
[c.name,c.rarity,c.special,c.ability,c.rinkCard].forEach((v,index)=>{
    const td = document.createElement("td");
    td.textContent = v;

    if(index===0 || index===2 || index===3 || index===4){
        td.className = "characterSearchTableText";
    }

    tr.appendChild(td); }); tbody.appendChild(tr); }); }

renderTags(); renderTable();
