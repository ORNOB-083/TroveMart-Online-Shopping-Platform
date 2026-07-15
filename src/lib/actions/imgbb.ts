export async function uploadToImgbb(file: File): Promise<string> {
    const key = process.env.NEXT_PUBLIC_IMGBB_KEY;
    if (!key) throw new Error('Image upload is not configured.');

    const formData = new FormData();
    formData.append('image', file);

    const res = await fetch(`https://api.imgbb.com/1/upload?key=${key}`, {
        method: 'POST',
        body: formData,
    });

    const data = await res.json();
    if (!data.success) {
        throw new Error(data.error?.message || 'Image upload failed.');
    }

    return data.data.url as string;
}