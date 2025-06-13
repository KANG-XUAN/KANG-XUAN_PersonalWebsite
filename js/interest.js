const songs = [
  {
    type: '古風',
    name: '長安不問',
    singer: '貳萬＆吾恩',
    link: 'https://www.youtube.com/watch?v=hyZVsBA9Kj0'
  },
  {
    type: '古風',
    name: '小僧無名',
    singer: '黃麒Eros',
    link: 'https://www.youtube.com/watch?v=yqkWEW9an3I'
  },
  {
    type: '古風',
    name: '煙籠長安',
    singer: '少司命',
    link: 'https://www.youtube.com/watch?v=12ODcJ3MjvQ'
  },
  {
    type: '古風',
    name: '黑月光',
    singer: '罗云熙＆白鹿',
    link: 'https://www.youtube.com/watch?v=ndJ-DkvxSZs'
  },
  {
    type: '',
    name: '人間朝暮',
    singer: '少司命',
    link: 'https://www.youtube.com/watch?v=ddSkv82TZPA'
  },
  {
    type: '古風',
    name: '入畫江南',
    singer: '黃齡',
    link: 'https://www.youtube.com/watch?v=cSDi70KX8e0'
  },
  {
    type: '古風',
    name: '傾盡天下',
    singer: '河圖',
    link: 'https://www.youtube.com/watch?v=lfHrJOr8WoM'
  },
  {
    type: '古風',
    name: '東流',
    singer: '緋村柯北＆灰老板',
    link: 'https://www.youtube.com/watch?v=RfVUUGxdi_A'
  },
  {
    type: '古風',
    name: '風物志與江湖詩',
    singer: '池年＆鬼冢虫虫',
    link: 'https://www.bilibili.com/video/BV17t411p7oV/?spm_id_from=333.337.search-card.all.click'
  },
  {
    type: '古風',
    name: '吹夢到西洲',
    singer: '黃詩扶＆妖揚',
    link: 'https://www.youtube.com/watch?v=xsTm-WGd3yA'
  },
  {
    type: '古風',
    name: '千年',
    singer: '少司命',
    link: 'https://www.youtube.com/watch?v=BptNT5GZ4HM'
  },
  {
    type: '古風',
    name: '不老夢',
    singer: '銀臨',
    link: 'https://www.youtube.com/watch?v=oV766nQt-F4'
  },
  {
    type: '古風',
    name: '山鬼',
    singer: '清秋秋',
    link: 'https://www.youtube.com/watch?v=KXjNUrVP8bo'
  },
  {
    type: '古風',
    name: '畫詩',
    singer: '玄觴＆執素兮',
    link: 'https://www.youtube.com/watch?v=u1qvv3BVOtY'
  },
  {
    type: '古風',
    name: '一花一劍',
    singer: '李鑫一',
    link: 'https://www.youtube.com/watch?v=c2jmFFsGCYs'
  },
  {
    type: '古風',
    name: '瀘沽尋夢',
    singer: '銀臨',
    link: 'https://www.youtube.com/watch?v=GObLh4NRoqw'
  },
  {
    type: '古風',
    name: '咫尺相思',
    singer: '小曲兒＆音頻怪物＆淩之軒＆完美仙劍＆Walker＆HITA＆Aki阿傑＆小愛的媽＆富貴哥＆夢嵐＆煙花Show',
    link: 'https://www.youtube.com/watch?v=t60ex5MqbKI'
  },
  {
    type: '古風',
    name: '北風行',
    singer: '少司命',
    link: 'https://www.youtube.com/watch?v=JepGG9Urbc8'
  },
  {
    type: '古風',
    name: '緣生意轉',
    singer: '河圖＆西國海妖',
    link: 'https://www.youtube.com/watch?v=hOqwnq0n2FM'
  },
  {
    type: '古風',
    name: '百戀歌',
    singer: '夢璟SAYA',
    link: 'https://www.youtube.com/watch?v=lVTXNa4UMHs'
  },
  {
    type: '古風',
    name: '生死劫',
    singer: '五音Jw＆銀臨',
    link: 'https://www.youtube.com/watch?v=roJ30EutMYc'
  },
  {
    type: '現代',
    name: '滿天星辰不及你',
    singer: 'ycccc',
    link: 'https://www.youtube.com/watch?v=tbVGxrt2rR0'
  },
  {
    type: '現代',
    name: '消愁',
    singer: '毛不易',
    link: 'https://www.youtube.com/watch?v=c8I74C-GXLk'
  },
  {
    type: '現代',
    name: '若某日我封筆',
    singer: '河圖',
    link: 'https://www.youtube.com/watch?v=fveeiGOO7KI'
  },
];

let currentPage = 1;
const itemsPerPage = 10; // 每頁幾筆資料
const totalItems = songs.length;
const totalPages = Math.ceil(totalItems / itemsPerPage);

function renderTable() {
  const tbody = document.getElementById('song-table-body');
  tbody.innerHTML = ''; // 清空現有的資料

  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const pageData = songs.slice(start, end);

  // 渲染實際資料
  pageData.forEach((song, index) => {
    const tr = document.createElement('tr');
    // tr.addEventListener("text-center");
    const dynamicId = start + index + 1;

    tr.innerHTML = `
  <td><div class="text-truncate truncate-cell">${dynamicId}</div></td>
  <td><div class="text-truncate truncate-cell">${song.type}</div></td>
  <td><div class="text-truncate truncate-cell">${song.name}</div></td>
  <td><div class="text-truncate truncate-cell">${song.singer}</div></td>
  <td><div class="text-truncate truncate-cell">
    ${song.link.includes('http') ? `<a href="${song.link}" target="_blank">點我</a>` : song.link}
  </div></td>
`;
    tbody.appendChild(tr);
  });

  // 補空白列（如果不足 itemsPerPage 筆）
  const remainingRows = itemsPerPage - pageData.length;
  for (let i = 0; i < remainingRows; i++) {
    const tr = document.createElement('tr');
    const emptyId = start + pageData.length + i + 1;

    tr.innerHTML = `
      <td>${emptyId}</td>
      <td>-</td>
      <td>-</td>
      <td>-</td>
      <td>-</td>
    `;
    tbody.appendChild(tr);
  }
}

function renderPaginationInfo() {
  const section = document.getElementById('pagination-section');

  // 分頁範圍控制
  const maxVisiblePages = 5;
  let pages = [];

  if (totalPages <= maxVisiblePages + 2) {
    // 總頁數少，全部顯示
    for (let i = 1; i <= totalPages; i++) pages.push(i);
  } else {
    if (currentPage <= maxVisiblePages - 2) {
      // 靠近開頭
      pages = [1, 2, 3, 4, 5, '...', totalPages];
    } else if (currentPage >= totalPages - (maxVisiblePages - 3)) {
      // 靠近結尾
      pages = [1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    } else {
      // 中間
      pages = [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages];
    }
  }

  // 產生頁碼 HTML
  const pageButtonsHTML = pages.map(p => {
    if (p === '...') {
      return `<li class="page-item disabled"><span class="page-link">…</span></li>`;
    } else {
      return `
        <li class="page-item ${p === currentPage ? 'active' : ''}">
          <a class="page-link" href="#" onclick="goToPage(${p})">${p}</a>
        </li>`;
    }
  }).join('');

  // 組合整體 HTML
  section.innerHTML = `
    <div class="col-md-5 d-flex align-items-center">
      <p class="mb-0">第 <strong>${currentPage}</strong> 頁，共 <strong>${totalPages}</strong> 頁，總筆數 <strong>${totalItems}</strong> 筆</p>
    </div>
    <div class="col-md-7">
      <nav aria-label="Page navigation">
        <ul class="pagination justify-content-end mb-0">
          <li class="page-item ${currentPage === 1 ? 'disabled' : ''}">
            <a class="page-link" href="#" onclick="goToPage(${currentPage - 1})">上一頁</a>
          </li>
          ${pageButtonsHTML}
          <li class="page-item ${currentPage === totalPages ? 'disabled' : ''}">
            <a class="page-link" href="#" onclick="goToPage(${currentPage + 1})">下一頁</a>
          </li>
        </ul>
      </nav>
    </div>
  `;
}

function goToPage(page) {
  if (page < 1 || page > totalPages) return;
  currentPage = page;
  renderTable();
  renderPaginationInfo();
}




// 初始化畫面
renderTable();
renderPaginationInfo();
