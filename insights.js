/**
 * Insights Module - Analytics and Streaks
 */

export function calculateInsights(dates) {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayCounts = new Array(7).fill(0);
    
    dates.forEach(d => {
        dayCounts[d.getDay()]++;
    });

    const peakDayIndex = dayCounts.indexOf(Math.max(...dayCounts));
    
    return {
        peakDay: days[peakDayIndex],
        streak: calculateStreak(dates)
    };
}

function calculateStreak(dates) {
    if (dates.length === 0) return 0;
    const sorted = [...new Set(dates.map(d => d.toISOString().split('T')[0]))].sort().reverse();
    
    let streak = 0;
    let curr = new Date();
    
    for (const dateStr of sorted) {
        const d = new Date(dateStr);
        const diff = Math.floor((curr - d) / (1000 * 60 * 60 * 24));
        if (diff <= 1) {
            streak++;
            curr = d;
        } else {
            break;
        }
    }
    return streak;
}

export function renderInsights(containerId, insights) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = `
        <div class="insight-card glass">
            <span class="stat-label">Current Streak</span>
            <span class="stat-value" style="color: var(--accent);">${insights.streak} Days</span>
        </div>
        <div class="insight-card glass">
            <span class="stat-label">Peak Activity</span>
            <span class="stat-value">${insights.peakDay}s</span>
        </div>
    `;
}
