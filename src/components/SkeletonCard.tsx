export default function SkeletonCard() {
    return (
        <div className="bg-white dark:bg-[#1a1d24] border border-[#E4D9C7] dark:border-gray-800 rounded-2xl overflow-hidden animate-pulse">
            <div className="aspect-square bg-[#F5EFE6] dark:bg-gray-800" />
            <div className="p-4 space-y-2">
                <div className="h-4 w-3/4 bg-[#F5EFE6] dark:bg-gray-800 rounded" />
                <div className="h-3 w-full bg-[#F5EFE6] dark:bg-gray-800 rounded" />
                <div className="h-3 w-2/3 bg-[#F5EFE6] dark:bg-gray-800 rounded" />
                <div className="h-5 w-1/3 bg-[#F5EFE6] dark:bg-gray-800 rounded mt-3" />
            </div>
        </div>
    );
}