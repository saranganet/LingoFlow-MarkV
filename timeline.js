/**
 * Timeline Module - Renders the historical feed
 */

export function renderTimeline(containerId, dates) {
    const container = document.getElementById(containerId);
    if (!container) return;

    // Group by month
    const timelineByMonth = {};
    dates.slice().reverse().forEach(d => {
        const month = d.toLocaleString('default', { month: 'long', year: 'numeric' });
        if (!timelineByMonth[month]) timelineByMonth[month] = [];
        timelineByMonth[month].push(d);
    });

    let html = '';
    for (const [month, entries] of Object.entries(timelineByMonth)) {
        html += `
            <div class="timeline-month">
                <h4 class="month-title">${month}</h4>
                <div class="month-entries">
                    ${entries.map(e => `
                        <div class="timeline-entry">
                            <span class="entry-time">${e.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                            <span class="entry-date">${e.toLocaleDateString()}</span>
                            <div class="entry-dot"></div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    container.innerHTML = html;
}
