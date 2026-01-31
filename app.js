/**
 * Waystar Pulse v1.0
 * Performance & Activity Dashboard
 */

import { initUI, showErrorMessage, updateLastUpdated, renderStats, updateSourceIndicator } from './ui.js';
import { DataProvider } from './data-provider.js';
import { Store } from './store.js';
import { renderHeatmap, renderHeatmapLegend } from './heatmap.js';
import { calculateInsights, renderInsights } from './insights.js';
import { renderTimeline } from './timeline.js';

document.addEventListener('DOMContentLoaded', async () => {
    console.log('Waystar Pulse Initialized');
    initUI();
    
    try {
        const rawData = await DataProvider.fetchRawData();
        const dates = DataProvider.parseTimestamps(rawData);
        
        updateSourceIndicator(rawData === 'MOCK_READY');

        Store.setState({
            rawData,
            dates,
            groupedData: DataProvider.groupByDate(dates),
            stats: DataProvider.getStatistics(dates),
            isLoading: false,
            lastUpdated: new Date()
        });
        
        updateLastUpdated(Store.state.lastUpdated);
        renderStats(Store.state.stats);
        
        renderHeatmapLegend('heatmap-legend');
        renderHeatmap('heatmap-container', Store.state.groupedData, Store.state.stats);

        const insights = calculateInsights(Store.state.dates);
        renderInsights('analytics-grid', insights);
        
        renderTimeline('timeline-content', Store.state.dates);

        const { stats } = Store.state;
        console.table({
            'Total Pulses': stats.total,
            'Recording Since': stats.first.toLocaleDateString(),
            'Latest Entry': stats.last.toLocaleDateString(),
            'Day Span': stats.spanDays
        });
    } catch (err) {
        showErrorMessage('Could not connect to the Pulse data source.');
        console.error('Initialization failed:', err);
    }
});
