// 切換分頁
document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll("#tab-menu button");
  const panes = document.querySelectorAll("#tab-content .tab-pane");

  buttons.forEach(button => {
    button.addEventListener("click", () => {
      const tab = button.getAttribute("data-tab");

      // 切換按鈕樣式
      buttons.forEach(btn => btn.classList.remove("active"));
      button.classList.add("active");

      // 顯示對應內容
      panes.forEach(pane => {
        if (pane.getAttribute("data-tab") === tab) {
          pane.classList.remove("d-none");
        } else {
          pane.classList.add("d-none");
        }
      });
    });
  });
});