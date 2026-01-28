/**
 * Simple State Store for Waystar Pulse
 */

export const Store = {
    state: {
        rawData: null,
        dates: [],
        groupedData: {},
        stats: null,
        isLoading: true,
        lastUpdated: null
    },

    setState(newState) {
        this.state = { ...this.state, ...newState };
        console.log('Store Updated:', this.state);
        // In a real app, we might trigger UI updates here
    }
};
