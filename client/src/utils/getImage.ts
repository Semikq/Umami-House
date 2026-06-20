const CLIENT_STATIC_PREFIXES = [
    "/uploads/company/",
    "/uploads/photoCompany/",
    "/uploads/banners/",
    "/uploads/action/",
];

function isClientStaticAsset(path: string): boolean {
    return CLIENT_STATIC_PREFIXES.some((prefix) => path.startsWith(prefix));
}

export default function getImage(path: string): string {
    if (!path) return path;
    if (path.startsWith("http://") || path.startsWith("https://")) return path;
    if (isClientStaticAsset(path)) return path;
    if (process.env.NODE_ENV === "development") return path;
    return `${process.env.REACT_APP_SERVER_URL}${path}`;
}
