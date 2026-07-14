import ItemDetailsClient from './ItemDetailsClient';

export default async function ItemDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    return <ItemDetailsClient itemId={id} />;
}