/* ▼ ヘッダー読み込み（キャッシュ活用） */
fetch("header.html", { cache: "force-cache" })
  .then(res => res.text())
  .then(html => {
    document.getElementById("header").innerHTML = html;
  });

/* ▼ 目次折りたたみ制御 */
const toc = document.getElementById("toc");

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    toc.classList.add("collapsed");
  } else {
    toc.classList.remove("collapsed");
  }
});
