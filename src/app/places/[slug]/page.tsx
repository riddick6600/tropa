import { PLACE_CONTENT } from '@/lib/data';
import PlaceClient from './PlaceClient';

export function generateStaticParams() {
    return Object.values(PLACE_CONTENT).map((place) => ({
        slug: place.id,
    }));
}

export default function PlacePage() {
    return <PlaceClient />
}
