import { useMap } from "react-leaflet";

export const BARBERSHOP = {
	lat: -23.1832584,
	lng: -46.8773774,
	name: "Khalid Barbearia",
	address: "Av. Antônio Frederico Ozanan - Pte. São João, Jundiaí - SP",
	mapsUrl: "https://maps.app.goo.gl/PCY45SLCCCDyCULQ6",
};

export function DisableInteraction() {
	const map = useMap();
	map.dragging.disable();
	map.scrollWheelZoom.disable();
	map.doubleClickZoom.disable();
	return null;
}
