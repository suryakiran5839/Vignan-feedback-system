/* ===== APP – Router, Auth, Init ===== */
const App = (() => {
    const routes = {
        'home': Pages.home,
        'about': Pages.about,
        'student-register': Pages.studentRegister,
        'student-login': Pages.studentLogin,
        'submit-complaint': Pages.submitComplaint,
        'track-complaint': Pages.trackComplaint,
        'student-dashboard': Pages.studentDashboard,
        'admin-login': Pages.adminLogin,
        'admin-dashboard': Pages.adminDashboard,
        'complaint-management': Pages.complaintManagement,
        'analytics': Pages.analytics
    };

    function navigate() {
        const rawHash = window.location.hash.slice(1) || 'home';
        const page = rawHash.split('?')[0];
        DashboardCharts.destroyAll();
        Heatmap.destroy();
        const renderFn = routes[page];
        if (renderFn) renderFn();
        else Pages.home();
        Components.highlightActiveNav();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function logout() {
        DataStore.logout();
        Components.renderNavbar();
        Components.showToast('Logged out successfully!', 'info');
        window.location.hash = '#home';
    }

    function init() {
        // Seed demo data
        DataStore.seed();

        // Render navbar
        Components.renderNavbar();
        Components.setupMobileNav();
        Components.setupLightbox();

        // Router
        window.addEventListener('hashchange', navigate);
        navigate();

        // Navbar scroll effect
        window.addEventListener('scroll', () => {
            document.getElementById('mainNavbar').classList.toggle('scrolled', window.scrollY > 20);
        });

        // Init AOS animations
        if (typeof AOS !== 'undefined') {
            AOS.init({ duration: 600, easing: 'ease-out', once: true, offset: 50 });
        }

        // Footer visibility - hide on auth pages
        window.addEventListener('hashchange', updateFooter);
        updateFooter();
    }

    function updateFooter() {
        const hash = window.location.hash || '#home';
        const hideOn = ['student-login', 'student-register', 'admin-login'];
        const footer = document.getElementById('mainFooter');
        if (footer) footer.style.display = hideOn.some(p => hash.includes(p)) ? 'none' : 'block';
    }

    // Boot
    document.addEventListener('DOMContentLoaded', init);

    return { navigate, logout, init };
})();
