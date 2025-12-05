import { ROUTE_CONTENT } from '@/lib/data';
import RouteClient from './RouteClient';

export function generateStaticParams() {
    const params: { slug: string; direction: string }[] = [];
    Object.values(ROUTE_CONTENT).forEach((group) => {
        Object.keys(group.routes).forEach((direction) => {
            params.push({
                slug: group.id,
                direction: direction,
            });
        });
    });
    return params;
}

export default function RoutePage() {
    return <RouteClient />;
}
