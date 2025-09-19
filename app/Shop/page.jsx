import { ShopClient } from '@/src/components/ShopClient.jsx';

export default function Shop({ searchParams }) {
    const initialSearch = searchParams?.search || '';

    return <ShopClient initialSearch={initialSearch} />;
}
