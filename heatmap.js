/**
 * Heatmap Module - Renders the activity grid
 */

export function renderHeatmap(containerId, groupedData, stats) {
    const container = document.getElementById(containerId);
    if (!container) return;

    // Build the grid
    const startDate = new Date(stats.first);
    startDate.setDate(startDate.getDate() - startDate.getDay()); // Align to Sunday

    const endDate = new Date(stats.last);
    endDate.setDate(endDate.getDate() + (6 - endDate.getDay())); // Align to Saturday

    let html = '';
    const tempDate = new Date(startDate);

    while (tempDate <= endDate) {
        const key = tempDate.toISOString().split('T')[0];
        const count = groupedData[key] || 0;
        const level = getIntensityLevel(count);
        
        html += `
            <div class="heatmap-cell level-${level}" 
                 data-date="${key}" 
                 title="${key}: ${count} pulses">
            </div>
        `;
        tempDate.setDate(tempDate.getDate() + 1);
    }

    container.innerHTML = html;
}

function getIntensityLevel(count) {
    if (count === 0) return 0;
    if (count <= 2) return 1;
    if (count <= 4) return 2;
    if (count <= 6) return 3;
    return 4;
}

export function renderHeatmapLegend(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = `
        <div class="legend-content">
            <span>Less</span>
            <div class="heatmap-cell level-0"></div>
            <div class="heatmap-cell level-1"></div>
            <div class="heatmap-cell level-2"></div>
            <div class="heatmap-cell level-3"></div>
            <div class="heatmap-cell level-4"></div>
            <span>More</span>
        </div>
    `;
}
