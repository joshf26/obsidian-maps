import { Value, NumberValue, StringValue, ListValue } from 'obsidian';

/**
 * Converts a Value to a single coordinate tuple [lat, lng].
 */
export function singleCoordinateFromValue(value: Value | null): [number, number] | null {
	let lat: number | null = null;
	let lng: number | null = null;

	// Handle list values (e.g., ["34.1395597", "-118.3870991"] or [34.1395597, -118.3870991])
	if (value instanceof ListValue) {
		if (value.length() >= 2) {
			lat = parseCoordinate(value.get(0));
			lng = parseCoordinate(value.get(1));
		}
	}
	// Handle string values (e.g., "34.1395597,-118.3870991" or "34.1395597, -118.3870991")
	else if (value instanceof StringValue) {
		// Split by comma and handle various spacing
		const parts = value.toString().trim().split(',');
		if (parts.length >= 2) {
			lat = parseCoordinate(parts[0].trim());
			lng = parseCoordinate(parts[1].trim());
		}
	}

	if (lat && lng && verifyLatLng(lat, lng)) {
		return [lat, lng];
	}

	return null;
}

/**
 * Converts a Value to a list of coordinate tuples [lat, lng].
 * The expected format is a list of lists, e.g., [["lat1", "lng1"], ["lat2", "lng2"]].
 */
export function coordinatesFromValue(value: Value | null): [number, number][] {
	const coordinatesList: [number, number][] = [];

	if (!(value instanceof ListValue)) {
		return coordinatesList;
	}

	for (let i = 0; i < value.length(); i++) {
		const item = value.get(i);
		if (!(item instanceof ListValue) || item.length() < 2) {
			continue;
		}

		const lat = parseCoordinate(item.get(0));
		const lng = parseCoordinate(item.get(1));

		if (lat !== null && lng !== null && verifyLatLng(lat, lng)) {
			coordinatesList.push([lat, lng]);
		}
	}

	return coordinatesList;
}

/**
 * Verifies that lat/lng values are within valid ranges
 */
export function verifyLatLng(lat: number, lng: number): boolean {
	return !isNaN(lat) && !isNaN(lng) && lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180;
}

/**
 * Parses a coordinate value from various formats
 */
export function parseCoordinate(value: unknown): number | null {
	if (value instanceof NumberValue) {
		const numData = Number(value.toString());
		return isNaN(numData) ? null : numData;
	}
	if (value instanceof StringValue) {
		const num = parseFloat(value.toString());
		return isNaN(num) ? null : num;
	}
	if (typeof value === 'string') {
		const num = parseFloat(value);
		return isNaN(num) ? null : num;
	}
	if (typeof value === 'number') {
		return isNaN(value) ? null : value;
	}
	return null;
}

/**
 * Wrapper for Object.hasOwn which performs type narrowing
 */
export function hasOwnProperty<K extends PropertyKey>(o: unknown, v: K): o is Record<K, unknown> {
	return o != null && typeof o === 'object' && Object.hasOwn(o, v);
}
