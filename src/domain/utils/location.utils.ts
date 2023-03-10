export interface LatLng {
    lat: number;
    lng: number;
  }

export function calculateDistance(point1: LatLng, point2: LatLng): number {
    const earthRadius = 6371; // in kilometers

    const latDiff = (point2.lat - point1.lat) * (Math.PI / 180);
    const lngDiff = (point2.lng - point1.lng) * (Math.PI / 180);

    const a =
        Math.sin(latDiff / 2) * Math.sin(latDiff / 2) +
        Math.cos(point1.lat * (Math.PI / 180)) *
        Math.cos(point2.lat * (Math.PI / 180)) *
        Math.sin(lngDiff / 2) *
        Math.sin(lngDiff / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = earthRadius * c;
    return distance;
}