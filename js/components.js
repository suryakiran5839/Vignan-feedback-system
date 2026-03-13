/* ===== REUSABLE UI COMPONENTS ===== */
const Components = (() => {
    function renderNavbar() {
        const menu = document.getElementById('navMenu');
        const session = DataStore.getSession();
        let links = '';

        if (!session) {
            links = `
                <li><a href="#home" data-page="home"><i class="fas fa-home"></i> Home</a></li>
                <li><a href="#about" data-page="about"><i class="fas fa-info-circle"></i> About</a></li>
                <li><a href="#track-complaint" data-page="track-complaint"><i class="fas fa-search"></i> Track</a></li>
                <li><a href="#student-login" data-page="student-login"><i class="fas fa-user"></i> Student Login</a></li>
                <li><a href="#admin-login" data-page="admin-login"><i class="fas fa-user-shield"></i> Admin</a></li>
                <li><a href="#student-register" data-page="student-register" class="nav-btn"><i class="fas fa-user-plus"></i> Register</a></li>
            `;
        } else if (session.role === 'student') {
            links = `
                <li><a href="#home" data-page="home"><i class="fas fa-home"></i> Home</a></li>
                <li><a href="#student-dashboard" data-page="student-dashboard"><i class="fas fa-tachometer-alt"></i> Dashboard</a></li>
                <li><a href="#submit-complaint" data-page="submit-complaint"><i class="fas fa-plus-circle"></i> Submit</a></li>
                <li><a href="#track-complaint" data-page="track-complaint"><i class="fas fa-search"></i> Track</a></li>
                <li><a href="#" onclick="App.logout()" class="nav-btn"><i class="fas fa-sign-out-alt"></i> Logout</a></li>
            `;
        } else if (session.role === 'admin') {
            links = `
                <li><a href="#admin-dashboard" data-page="admin-dashboard"><i class="fas fa-tachometer-alt"></i> Dashboard</a></li>
                <li><a href="#complaint-management" data-page="complaint-management"><i class="fas fa-tasks"></i> Complaints</a></li>
                <li><a href="#analytics" data-page="analytics"><i class="fas fa-chart-bar"></i> Analytics</a></li>
                <li><a href="#" onclick="App.logout()" class="nav-btn"><i class="fas fa-sign-out-alt"></i> Logout</a></li>
            `;
        }
        menu.innerHTML = links;
        highlightActiveNav();
    }

    function highlightActiveNav() {
        const hash = window.location.hash || '#home';
        document.querySelectorAll('.nav-menu a').forEach(a => {
            a.classList.toggle('active', a.getAttribute('href') === hash);
        });
    }

    function setupMobileNav() {
        const toggle = document.getElementById('navToggle');
        const menu = document.getElementById('navMenu');
        toggle.addEventListener('click', () => {
            toggle.classList.toggle('active');
            menu.classList.toggle('active');
        });
        menu.addEventListener('click', (e) => {
            if (e.target.closest('a')) {
                toggle.classList.remove('active');
                menu.classList.remove('active');
            }
        });
    }

    function statusBadge(status) {
        const cls = status === 'Pending' ? 'pending' : status === 'In Progress' ? 'in-progress' : status === 'Resolved' ? 'resolved' : 'rejected';
        return `<span class="status-badge ${cls}">${status}</span>`;
    }

    function priorityBadge(priority) {
        const cls = priority === 'High' ? 'priority-high' : priority === 'Medium' ? 'priority-medium' : 'priority-low';
        return `<span class="ai-tag ${cls}"><i class="fas fa-flag"></i> ${priority}</span>`;
    }

    function showToast(msg, type = 'info') {
        const container = document.getElementById('toastContainer');
        const icons = { success: 'fa-check-circle', error: 'fa-times-circle', info: 'fa-info-circle', warning: 'fa-exclamation-triangle' };
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.innerHTML = `<i class="fas ${icons[type] || icons.info}"></i><span>${msg}</span>`;
        container.appendChild(toast);
        setTimeout(() => { toast.style.opacity = '0'; toast.style.transform = 'translateX(100%)'; setTimeout(() => toast.remove(), 300); }, 4000);
    }

    function showModal(title, bodyHTML) {
        const overlay = document.getElementById('modalOverlay');
        const content = document.getElementById('modalContent');
        content.innerHTML = `
            <div class="modal-header">
                <h3>${title}</h3>
                <button class="btn-icon" onclick="Components.closeModal()"><i class="fas fa-times"></i></button>
            </div>
            <div class="modal-body">${bodyHTML}</div>
        `;
        overlay.classList.add('active');
    }
    function closeModal() { document.getElementById('modalOverlay').classList.remove('active'); }

    function showLightbox(src) {
        const overlay = document.getElementById('lightboxOverlay');
        document.getElementById('lightboxImage').src = src;
        overlay.classList.add('active');
    }
    function closeLightbox() { document.getElementById('lightboxOverlay').classList.remove('active'); }

    function setupLightbox() {
        document.getElementById('lightboxOverlay').addEventListener('click', (e) => {
            if (e.target === e.currentTarget || e.target.id === 'lightboxClose' || e.target.closest('#lightboxClose')) closeLightbox();
        });
        document.getElementById('modalOverlay').addEventListener('click', (e) => {
            if (e.target === e.currentTarget) closeModal();
        });
    }

    function spinner() { return '<div class="spinner"></div>'; }

    function emptyState(icon, title, desc) {
        return `<div class="empty-state"><i class="fas ${icon}"></i><h3>${title}</h3><p>${desc}</p></div>`;
    }

    function complaintCard(c) {
        const dateStr = new Date(c.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
        return `
        <div class="complaint-card" onclick="window.location.hash='track-complaint?id=${c.id}'" data-aos="fade-up">
            <div class="complaint-card-header">
                <span class="complaint-card-id">${c.id}</span>
                ${statusBadge(c.status)}
            </div>
            <h3>${escapeHTML(c.title)}</h3>
            <p>${escapeHTML(c.description)}</p>
            <div class="complaint-card-footer">
                <span class="complaint-card-meta"><i class="fas fa-map-marker-alt"></i> ${escapeHTML(c.location || 'N/A')}</span>
                <span class="complaint-card-meta"><i class="fas fa-calendar"></i> ${dateStr}</span>
            </div>
            <div style="margin-top:0.5rem;display:flex;gap:0.5rem;align-items:center;">
                ${priorityBadge(c.priority)}
                <span class="ai-tag category"><i class="fas fa-tag"></i> ${c.category}</span>
            </div>
        </div>`;
    }

    function pagination(currentPage, totalPages, onPageChange) {
        if (totalPages <= 1) return '';
        let html = '<div class="pagination">';
        for (let i = 1; i <= totalPages; i++) {
            html += `<button class="${i === currentPage ? 'active' : ''}" onclick="${onPageChange}(${i})">${i}</button>`;
        }
        html += '</div>';
        return html;
    }

    function formatDate(iso) {
        return new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
    }

    function escapeHTML(str) {
        if (!str) return '';
        return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
    }

    return { renderNavbar, highlightActiveNav, setupMobileNav, statusBadge, priorityBadge, showToast, showModal, closeModal, showLightbox, closeLightbox, setupLightbox, spinner, emptyState, complaintCard, pagination, formatDate, escapeHTML };
})();
