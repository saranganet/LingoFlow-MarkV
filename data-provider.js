/**
 * DataProvider - Manages fetching and parsing of raw data
 */

export const DataProvider = {
    async fetchRawData() {
        try {
            const response = await fetch('data.txt');
            if (!response.ok) throw new Error('data.txt not found');
            return await response.text();
        } catch (error) {
            console.warn('data.txt missing or inaccessible, falling back to mock data.');
            return 'MOCK_READY'; // Sentinel value
        }
    },

    parseTimestamps(rawText) {
        if (rawText === 'MOCK_READY') return this.getMockData();
        
        console.time('PulseParser');
        const result = rawText.split('\n')
            .map(line => line.trim())
            .filter(line => line.length > 0)
            .map(dateStr => new Date(dateStr))
            .filter(date => !isNaN(date.getTime()));
        console.timeEnd('PulseParser');
        return result;
    },

    groupByDate(dates) {
        const groups = {};
        dates.forEach(date => {
            const key = date.toISOString().split('T')[0];
            groups[key] = (groups[key] || 0) + 1;
        });
        return groups;
    },

    getStatistics(dates) {
        if (dates.length === 0) return null;
        const sorted = [...dates].sort((a, b) => a - b);
        return {
            total: dates.length,
            first: sorted[0],
            last: sorted[sorted.length - 1],
            spanDays: Math.ceil((sorted[sorted.length - 1] - sorted[0]) / (1000 * 60 * 60 * 24))
        };
    },

    getMockData() {
        const mock = [];
        const today = new Date();
        for (let i = 0; i < 100; i++) {
            const d = new Date();
            d.setDate(today.getDate() - Math.floor(Math.random() * 90));
            mock.push(d);
        }
        return mock;
    }
};
