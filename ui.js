export function initUI() {
    const app = document.getElementById('app');
    app.innerHTML = `
        <div class="layout">
            <header class="main-header">
                <div class="logo">WAYSTAR PULSE</div>
                <div style="display: flex; align-items: center; gap: 16px;">
                    <button id="refresh-btn" class="glass" style="padding: 6px 12px; cursor: pointer; color: var(--text-muted); font-size: 0.8rem;">Refresh</button>
                    <div id="last-updated" style="font-size: 0.7rem; color: var(--text-dim);"></div>
                </div>
            </header>
            <aside class="sidebar">
                <a href="#" class="nav-link active">Dashboard</a>
                <a href="#" class="nav-link">Timeline</a>
                <a href="#" class="nav-link">Analytics</a>
                <a href="#" class="nav-link">Settings</a>
            </aside>
            <main class="content">
                <div id="dashboard" class="dashboard-container">
                    <div class="stats-grid" id="stats-grid"></div>
                    <div class="heatmap-section glass" id="heatmap-section">
                        <div class="section-header">
                            <h3>Activity Heatmap</h3>
                            <div id="heatmap-legend"></div>
                        </div>
                        <div id="heatmap-container" class="heatmap-container"></div>
                    </div>
                    <div class="analytics-grid" id="analytics-grid"></div>
                    <div id="timeline-view" class="timeline-container glass">
                        <h3>Timeline</h3>
                        <div id="timeline-content"></div>
                    </div>
                </div>
            </main>
            <footer class="main-footer">
                <div style="display: flex; gap: 24px;">
                    <span>&copy; 2026 Waystar Royco</span>
                    <span id="source-indicator" style="color: var(--primary);">SOURCE: LOCAL_FS (data.txt)</span>
                </div>
                <span>v1.0.0-alpha.81</span>
            </footer>
        </div>
    `;
}

export function showErrorMessage(message) {
    const main = document.querySelector('.content');
    main.innerHTML = `
        <div class="glass" style="padding: var(--spacing-main); border-color: var(--accent);">
            <h3 style="color: var(--accent); margin-bottom: 8px;">Pulse Error</h3>
            <p style="color: var(--text-muted);">${message}</p>
        </div>
    `;
}

export function updateSourceIndicator(isMock) {
    const el = document.getElementById('source-indicator');
    if (el) {
        el.textContent = isMock ? 'SOURCE: MOCK_ENGINE (memory)' : 'SOURCE: LOCAL_FS (data.txt)';
        el.style.color = isMock ? 'var(--accent)' : 'var(--primary)';
    }
}

export function renderStats(stats) {
    const grid = document.getElementById('stats-grid');
    if (!grid) return;
    
    grid.innerHTML = `
        ${createStatCard('Total Pulses', stats.total, 'Total events recorded')}
        ${createStatCard('Day Span', stats.spanDays, 'Active monitoring period')}
        ${createStatCard('Pulse Frequency', (stats.total / stats.spanDays).toFixed(2), 'Average events per day')}
    `;
}

function createStatCard(label, value, desc) {
    return `
        <div class="stat-card glass">
            <span class="stat-label">${label}</span>
            <span class="stat-value">${value}</span>
            <span class="stat-desc">${desc}</span>
        </div>
    `;
}
