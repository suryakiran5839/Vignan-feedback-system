/* ===== DASHBOARD CHARTS & ANALYTICS (Chart.js) ===== */
const DashboardCharts = (() => {
    const charts = {};
    const chartColors = {
        primary: '#6366f1', secondary: '#06b6d4', green: '#22c55e',
        amber: '#f59e0b', red: '#ef4444', purple: '#a855f7',
        pink: '#ec4899', blue: '#3b82f6'
    };

    Chart.defaults.color = '#94a3b8';
    Chart.defaults.borderColor = 'rgba(99,102,241,0.1)';
    Chart.defaults.font.family = "'Inter', sans-serif";

    function destroyAll() { Object.values(charts).forEach(c => c.destroy()); Object.keys(charts).forEach(k => delete charts[k]); }

    function animateCounter(el, target, duration = 1500) {
        let start = 0;
        const step = Math.ceil(target / (duration / 16));
        const timer = setInterval(() => { start += step; if (start >= target) { el.textContent = target; clearInterval(timer); } else { el.textContent = start; } }, 16);
    }

    function renderTrendChart(canvasId, data) {
        const ctx = document.getElementById(canvasId);
        if (!ctx) return;
        if (charts[canvasId]) charts[canvasId].destroy();
        charts[canvasId] = new Chart(ctx, {
            type: 'line',
            data: {
                labels: data.map(d => d.label),
                datasets: [{
                    label: 'Complaints',
                    data: data.map(d => d.count),
                    borderColor: chartColors.primary,
                    backgroundColor: 'rgba(99,102,241,0.1)',
                    borderWidth: 2, fill: true, tension: 0.4,
                    pointBackgroundColor: chartColors.primary,
                    pointBorderColor: '#fff', pointBorderWidth: 2, pointRadius: 4
                }]
            },
            options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } },
                scales: { y: { beginAtZero: true, ticks: { stepSize: 1 }, grid: { color: 'rgba(99,102,241,0.05)' } }, x: { grid: { display: false } } }
            }
        });
    }

    function renderCategoryPie(canvasId, catData) {
        const ctx = document.getElementById(canvasId);
        if (!ctx) return;
        if (charts[canvasId]) charts[canvasId].destroy();
        const labels = Object.keys(catData);
        const values = Object.values(catData);
        const colors = [chartColors.blue, chartColors.amber, chartColors.red, chartColors.green, chartColors.purple, chartColors.pink, chartColors.secondary, chartColors.primary];
        charts[canvasId] = new Chart(ctx, {
            type: 'doughnut',
            data: { labels, datasets: [{ data: values, backgroundColor: colors.slice(0, labels.length), borderWidth: 0 }] },
            options: { responsive: true, maintainAspectRatio: false, cutout: '65%', plugins: { legend: { position: 'bottom', labels: { padding: 15, usePointStyle: true, pointStyle: 'circle' } } } }
        });
    }

    function renderDeptBar(canvasId, deptData) {
        const ctx = document.getElementById(canvasId);
        if (!ctx) return;
        if (charts[canvasId]) charts[canvasId].destroy();
        charts[canvasId] = new Chart(ctx, {
            type: 'bar',
            data: { labels: Object.keys(deptData), datasets: [{ label: 'Complaints', data: Object.values(deptData), backgroundColor: 'rgba(99,102,241,0.6)', borderColor: chartColors.primary, borderWidth: 1, borderRadius: 6 }] },
            options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } },
                scales: { y: { beginAtZero: true, ticks: { stepSize: 1 }, grid: { color: 'rgba(99,102,241,0.05)' } }, x: { grid: { display: false } } }
            }
        });
    }

    function renderStatusDoughnut(canvasId, stats) {
        const ctx = document.getElementById(canvasId);
        if (!ctx) return;
        if (charts[canvasId]) charts[canvasId].destroy();
        charts[canvasId] = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Pending', 'In Progress', 'Resolved', 'Rejected'],
                datasets: [{ data: [stats.pending, stats.inProgress, stats.resolved, stats.rejected], backgroundColor: ['#f59e0b', '#3b82f6', '#22c55e', '#ef4444'], borderWidth: 0 }]
            },
            options: { responsive: true, maintainAspectRatio: false, cutout: '65%', plugins: { legend: { position: 'bottom', labels: { padding: 15, usePointStyle: true, pointStyle: 'circle' } } } }
        });
    }

    function renderPriorityBar(canvasId, complaints) {
        const ctx = document.getElementById(canvasId);
        if (!ctx) return;
        if (charts[canvasId]) charts[canvasId].destroy();
        const high = complaints.filter(c => c.priority === 'High').length;
        const med = complaints.filter(c => c.priority === 'Medium').length;
        const low = complaints.filter(c => c.priority === 'Low').length;
        charts[canvasId] = new Chart(ctx, {
            type: 'bar',
            data: { labels: ['High', 'Medium', 'Low'], datasets: [{ label: 'Count', data: [high, med, low], backgroundColor: ['rgba(239,68,68,0.7)', 'rgba(245,158,11,0.7)', 'rgba(34,197,94,0.7)'], borderRadius: 6, borderWidth: 0 }] },
            options: { responsive: true, maintainAspectRatio: false, indexAxis: 'y', plugins: { legend: { display: false } }, scales: { x: { beginAtZero: true, ticks: { stepSize: 1 }, grid: { color: 'rgba(99,102,241,0.05)' } }, y: { grid: { display: false } } } }
        });
    }

    return { destroyAll, animateCounter, renderTrendChart, renderCategoryPie, renderDeptBar, renderStatusDoughnut, renderPriorityBar, charts };
})();
