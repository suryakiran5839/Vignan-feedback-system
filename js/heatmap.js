/* ===== CAMPUS COMPLAINT HEATMAP (Leaflet.js) ===== */
const Heatmap = (() => {
    let map = null;
    let markers = [];

    // Campus locations with lat/lng (simulated campus coordinates)
    const campusLocations = {
        'Hostel Block A': { lat: 16.2335, lng: 80.6480, zone: 'Hostel Zone' },
        'Hostel Block B': { lat: 16.2340, lng: 80.6485, zone: 'Hostel Zone' },
        'Hostel Block B - Room 204': { lat: 16.2342, lng: 80.6487, zone: 'Hostel Zone' },
        'Block A': { lat: 16.2320, lng: 80.6470, zone: 'Academic Zone' },
        'Block A - 2nd Floor': { lat: 16.2321, lng: 80.6471, zone: 'Academic Zone' },
        'Block B': { lat: 16.2325, lng: 80.6465, zone: 'Academic Zone' },
        'Block B - Room 105': { lat: 16.2326, lng: 80.6466, zone: 'Academic Zone' },
        'Block C': { lat: 16.2315, lng: 80.6460, zone: 'Academic Zone' },
        'Block C - Room 201': { lat: 16.2316, lng: 80.6461, zone: 'Academic Zone' },
        'Lab 3': { lat: 16.2310, lng: 80.6475, zone: 'Lab Zone' },
        'Lab 3 - Workstation 12': { lat: 16.2311, lng: 80.6476, zone: 'Lab Zone' },
        'Physics Lab': { lat: 16.2308, lng: 80.6478, zone: 'Lab Zone' },
        'Computer Lab': { lat: 16.2312, lng: 80.6473, zone: 'Lab Zone' },
        'Library': { lat: 16.2330, lng: 80.6455, zone: 'Central Zone' },
        'Canteen': { lat: 16.2345, lng: 80.6450, zone: 'Central Zone' },
        'Sports Ground': { lat: 16.2350, lng: 80.6490, zone: 'Sports Zone' },
        'Main Gate': { lat: 16.2300, lng: 80.6450, zone: 'Entry Zone' },
        'Back Gate Area': { lat: 16.2355, lng: 80.6495, zone: 'Entry Zone' },
        'Parking Area': { lat: 16.2305, lng: 80.6445, zone: 'Entry Zone' },
        'Admin Building': { lat: 16.2328, lng: 80.6458, zone: 'Central Zone' }
    };

    function getLocationCoords(locationStr) {
        if (!locationStr) return null;
        // Exact match first
        if (campusLocations[locationStr]) return campusLocations[locationStr];
        // Partial match
        const lower = locationStr.toLowerCase();
        for (const [key, val] of Object.entries(campusLocations)) {
            if (lower.includes(key.toLowerCase()) || key.toLowerCase().includes(lower)) return val;
        }
        // keyword match
        for (const [key, val] of Object.entries(campusLocations)) {
            const words = key.toLowerCase().split(/[\s\-]+/);
            if (words.some(w => w.length > 2 && lower.includes(w))) return val;
        }
        // Default center with offset
        return { lat: 16.2325 + (Math.random() - 0.5) * 0.005, lng: 80.6468 + (Math.random() - 0.5) * 0.005, zone: 'Unknown' };
    }

    function init(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        if (map) { map.remove(); map = null; }

        map = L.map(containerId, { scrollWheelZoom: true }).setView([16.2325, 80.6468], 16);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors',
            maxZoom: 19
        }).addTo(map);

        renderComplaints();

        setTimeout(() => { map.invalidateSize(); }, 300);
    }

    function renderComplaints() {
        if (!map) return;
        markers.forEach(m => map.removeLayer(m));
        markers = [];

        const complaints = DataStore.getComplaints();
        const locationCounts = {};
        const heatData = [];

        complaints.forEach(c => {
            const coords = getLocationCoords(c.location);
            if (!coords) return;
            const key = `${coords.lat},${coords.lng}`;
            if (!locationCounts[key]) locationCounts[key] = { ...coords, count: 0, complaints: [], location: c.location };
            locationCounts[key].count++;
            locationCounts[key].complaints.push(c);
            heatData.push([coords.lat, coords.lng, 1]);
        });

        // Add heat layer
        if (heatData.length > 0 && typeof L.heatLayer === 'function') {
            L.heatLayer(heatData, { radius: 35, blur: 25, maxZoom: 17, gradient: { 0.2: '#22c55e', 0.5: '#f59e0b', 0.8: '#ef4444', 1: '#dc2626' } }).addTo(map);
        }

        // Add markers
        Object.values(locationCounts).forEach(loc => {
            const severity = loc.count >= 3 ? 'high' : loc.count >= 2 ? 'medium' : 'low';
            const colors = { high: '#ef4444', medium: '#f59e0b', low: '#22c55e' };
            const color = colors[severity];

            const icon = L.divIcon({
                className: 'custom-marker',
                html: `<div style="background:${color};color:#fff;width:30px;height:30px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:0.8rem;border:2px solid #fff;box-shadow:0 2px 8px rgba(0,0,0,0.3)">${loc.count}</div>`,
                iconSize: [30, 30],
                iconAnchor: [15, 15]
            });

            const statusSummary = loc.complaints.map(c => `<b>${c.id}</b> – ${Components.escapeHTML(c.title)} <span class="status-badge ${c.status === 'Pending' ? 'pending' : c.status === 'In Progress' ? 'in-progress' : c.status === 'Resolved' ? 'resolved' : 'rejected'}" style="font-size:0.65rem">${c.status}</span>`).join('<br>');

            const marker = L.marker([loc.lat, loc.lng], { icon })
                .bindPopup(`<div style="min-width:220px;font-family:Inter,sans-serif"><b style="font-size:0.9rem">${Components.escapeHTML(loc.location)}</b><br><span style="color:#888;font-size:0.75rem">${loc.count} complaint(s) – ${severity.toUpperCase()} zone</span><hr style="border-color:#333;margin:0.5rem 0">${statusSummary}</div>`, { maxWidth: 320 })
                .addTo(map);
            markers.push(marker);
        });
    }

    function destroy() {
        if (map) { map.remove(); map = null; markers = []; }
    }

    return { init, renderComplaints, destroy, campusLocations };
})();
