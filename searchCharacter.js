const characterSearchCharacters=[
{name:"ウルトラマンゼロ",
 rarity:"☆4",
 special:"・3列の敵に5460%のダメージを与える\n・ブーメランを3個生成する",
 ability:"・ブーメラン攻撃力+40%",
 rinkCard:"・『大怪獣バトル』-セブンの息子-\n・『大怪獣バトル』(ゼロVSベリアル)",
 tags:["ブーメラン生成","ブーメラン攻撃"]
 },
{name:"ウルトラマンゼロ\n(ウルトラゼロマント)",
 rarity:"☆4",
 special:"・3列の敵に5460%のダメージを与える\n・盤面のピースを12個消去する",
 ability:"・通常攻撃力+35%",
 rinkCard:"・『大怪獣バトル』-セブンの息子-\n・『大怪獣バトル』(ゼロVSベリアル)",
 tags:["ピース消去","通常攻撃"]
 },
{name:"ウルトラマン",
 rarity:"◇4",
 special:"・1列の敵に3150%ダメージ\n・1ターン味方の通常攻撃45%アップ",
 ability:"・基本攻撃力+23%",
 rinkCard:"・ウルトラヒーローズ\n・『ウルトラマン』",
 tags:["基本攻撃","通常攻撃"]
 },
{name:"ババルウ",
 rarity:"◇1",
 special:"・青ピースを自属性ピースに変換。\n・ロケットを1つ生成する",
 ability:"・最大LP+15%",
 rinkCard:"なし",
 tags:["属性(青)","ピース変換","ロケット生成","LP"]
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
