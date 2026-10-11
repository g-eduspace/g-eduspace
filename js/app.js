/* ==========================================================================
   G-EDUSPACE: LOGIC ĐIỀU HÀNH CỔNG ỨNG DỤNG SỐ
   Xử lý tìm kiếm, lọc danh mục, hiển thị modal và tương tác
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  let currentCategory = 'all';
  let searchQuery = '';

  const appsGrid = document.getElementById('appsGrid');
  const searchInput = document.getElementById('searchInput');
  const categoryTabs = document.getElementById('categoryTabs');
  const totalAppsCount = document.getElementById('totalAppsCount');
  const filteredCount = document.getElementById('filteredCount');

  // Modal elements
  const appModal = document.getElementById('appModal');
  const modalTitle = document.getElementById('modalTitle');
  const modalIframe = document.getElementById('modalIframe');
  const btnCloseModal = document.getElementById('btnCloseModal');
  const btnOpenNewTab = document.getElementById('btnOpenNewTab');
  const btnFullscreen = document.getElementById('btnFullscreen');

  // Khởi tạo số lượng tổng
  if (totalAppsCount) {
    totalAppsCount.textContent = APPS_DATA.length;
  }

  // Khởi tạo tab danh mục
  function initCategoryTabs() {
    categoryTabs.innerHTML = '';
    CATEGORIES.forEach(cat => {
      const count = cat.id === 'all' 
        ? APPS_DATA.length 
        : APPS_DATA.filter(a => a.category === cat.id).length;

      const btn = document.createElement('button');
      btn.className = `category-tab-btn ${cat.id === currentCategory ? 'active' : ''}`;
      btn.dataset.category = cat.id;
      btn.innerHTML = `
        ${getCategoryIcon(cat.icon)}
        <span>${cat.name}</span>
        <span class="tab-badge">${count}</span>
      `;

      btn.addEventListener('click', () => {
        document.querySelectorAll('.category-tab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentCategory = cat.id;
        renderApps();
      });

      categoryTabs.appendChild(btn);
    });
  }

  // Lọc và hiển thị danh sách ứng dụng
  function renderApps() {
    const filtered = APPS_DATA.filter(app => {
      const matchCat = currentCategory === 'all' || app.category === currentCategory;
      const query = searchQuery.toLowerCase().trim();
      const matchSearch = !query || 
        app.title.toLowerCase().includes(query) ||
        app.description.toLowerCase().includes(query) ||
        app.tags.some(tag => tag.toLowerCase().includes(query)) ||
        app.subject.toLowerCase().includes(query);
      return matchCat && matchSearch;
    });

    if (filteredCount) {
      filteredCount.textContent = `(${filtered.length} ứng dụng)`;
    }

    if (filtered.length === 0) {
      appsGrid.innerHTML = `
        <div class="empty-state">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <h3>Không tìm thấy ứng dụng phù hợp</h3>
          <p>Thử tìm với từ khóa khác như "KHTN", "AI", "Nguyên tử", hoặc chọn danh mục "Tất cả".</p>
        </div>
      `;
      return;
    }

    appsGrid.innerHTML = filtered.map(app => createAppCardHTML(app)).join('');

    // Gắn sự kiện cho các nút hành động trên card
    document.querySelectorAll('.btn-preview-trigger').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const appId = btn.dataset.appId;
        openAppModal(appId);
      });
    });
  }

  // Tạo HTML cho từng App Card
  function createAppCardHTML(app) {
    const iconSvg = getAppIcon(app.thumbnailIcon);
    const iconClass = app.category === 'khtn' ? 'app-icon-khtn' : (app.category === 'ai' ? 'app-icon-ai' : 'app-icon-tools');
    const badgeClass = `badge-${app.badgeType || 'primary'}`;

    const tagsHtml = app.tags.map(t => `<span class="app-tag">#${t}</span>`).join('');

    return `
      <div class="app-card">
        <div>
          <div class="app-card-top">
            <div class="app-icon-box ${iconClass}">
              ${iconSvg}
            </div>
            <div class="app-meta-header">
              <span class="app-badge-pill ${badgeClass}">${app.badge}</span>
              <h3 class="app-title">${app.title}</h3>
            </div>
          </div>
          <p class="app-desc">${app.description}</p>
          <div class="app-tags">
            ${tagsHtml}
          </div>
        </div>

        <div class="app-actions">
          <a href="${app.url}" class="btn-launch" target="_blank" rel="noopener">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <polygon points="5 3 19 12 5 21 5 3"></polygon>
            </svg>
            Mở tab mới
          </a>
          <button class="btn-preview btn-preview-trigger" data-app-id="${app.id}" title="Xem thử trực tiếp trong trang">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
              <circle cx="12" cy="12" r="3"></circle>
            </svg>
          </button>
        </div>
      </div>
    `;
  }

  // Mở modal xem trực tiếp app
  function openAppModal(appId) {
    const app = APPS_DATA.find(a => a.id === appId);
    if (!app) return;

    modalTitle.textContent = `${app.title} (${app.grade})`;
    modalIframe.src = app.url;
    btnOpenNewTab.href = app.url;
    appModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  // Đóng modal
  function closeModal() {
    appModal.classList.remove('active');
    modalIframe.src = 'about:blank';
    document.body.style.overflow = '';
  }

  if (btnCloseModal) {
    btnCloseModal.addEventListener('click', closeModal);
  }

  if (appModal) {
    appModal.addEventListener('click', (e) => {
      if (e.target === appModal) closeModal();
    });
  }

  // Nút toàn màn hình
  if (btnFullscreen) {
    btnFullscreen.addEventListener('click', () => {
      if (!document.fullscreenElement) {
        modalIframe.requestFullscreen().catch(err => {
          alert(`Không thể mở toàn màn hình: ${err.message}`);
        });
      } else {
        document.exitFullscreen();
      }
    });
  }

  // Lắng nghe tìm kiếm
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value;
      renderApps();
    });
  }

  // Bộ biểu tượng SVG chuẩn
  function getAppIcon(type) {
    switch (type) {
      case 'atom':
        return `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="2.5"></circle>
          <ellipse cx="12" cy="12" rx="9" ry="3.5" transform="rotate(30 12 12)"></ellipse>
          <ellipse cx="12" cy="12" rx="9" ry="3.5" transform="rotate(-30 12 12)"></ellipse>
        </svg>`;
      case 'sparkles':
        return `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"></path>
        </svg>`;
      case 'users':
        return `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
          <circle cx="9" cy="7" r="4"></circle>
          <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
        </svg>`;
      default:
        return `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
          <line x1="8" y1="21" x2="16" y2="21"></line>
          <line x1="12" y1="17" x2="12" y2="21"></line>
        </svg>`;
    }
  }

  function getCategoryIcon(type) {
    switch (type) {
      case 'grid':
        return `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>`;
      case 'flask':
        return `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 2v7.527a2 2 0 0 1-.211.896L4.72 20.55a1 1 0 0 0 .9 1.45h12.76a1 1 0 0 0 .9-1.45l-5.069-10.127A2 2 0 0 1 14 9.527V2"></path><path d="M8.5 2h7"></path></svg>`;
      case 'cpu':
        return `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="4" width="16" height="16" rx="2"></rect><rect x="9" y="9" width="6" height="6"></rect><path d="M15 2v2"></path><path d="M9 2v2"></path><path d="M20 15h2"></path><path d="M20 9h2"></path><path d="M9 20v2"></path><path d="M15 20v2"></path><path d="M2 9h2"></path><path d="M2 15h2"></path></svg>`;
      case 'wrench':
        return `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path></svg>`;
      default:
        return '';
    }
  }

  // Khởi chạy ban đầu
  initCategoryTabs();
  renderApps();
});
