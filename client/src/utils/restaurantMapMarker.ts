const MARKER_COLORS = [
    "#B75F6D",
    "#C9A227",
    "#5B8C5A",
    "#4A7FB5",
    "#8B5CF6",
    "#D97757",
];

const INACTIVE_COLOR = "#A8A8A8";

export function getRestaurantMarkerColor(index: number, active = true): string {
    if (!active) return INACTIVE_COLOR;
    return MARKER_COLORS[index % MARKER_COLORS.length];
}

export function parseRestaurantCoords(
    latitude: string | number,
    longitude: string | number,
): { lat: number, lng: number } | null {
    const lat = typeof latitude === "string" ? parseFloat(latitude) : latitude;
    const lng = typeof longitude === "string" ? parseFloat(longitude) : longitude;

    if (!Number.isFinite(lat) || !Number.isFinite(lng)) return null;
    if (lat < -90 || lat > 90 || lng < -180 || lng > 180) return null;

    return { lat, lng };
}

export function createRestaurantMarkerIcon(color: string) {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="36" height="48" viewBox="0 0 36 48">
        <path fill="${color}" stroke="#FFF9F0" stroke-width="2" d="M18 0C8.06 0 0 8.06 0 18c0 13.5 18 30 18 30s18-16.5 18-30C36 8.06 27.94 0 18 0z"/>
        <circle cx="18" cy="18" r="6.5" fill="#FFF9F0"/>
    </svg>`;

    return {
        url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`,
        scaledSize: {width: 36, height: 48},
        anchor: {x: 18, y: 48},
    };
}
