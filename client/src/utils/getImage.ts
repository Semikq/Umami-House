const BUCKET_ROOT_FOLDERS = new Set([
    "company",
    "partners",
    "dishes",
    "menu",
    "sales",
]);

function toSupabaseObjectPath(relativePath: string): string {
    const firstSegment = relativePath.split("/")[0] ?? "";
    if (BUCKET_ROOT_FOLDERS.has(firstSegment)) {
        return relativePath;
    }
    return `uploads/${relativePath}`;
}

export default function getImage(path: string): string {
    if (!path) return path;
    if (path.startsWith("http://") || path.startsWith("https://")) return path;

    if (process.env.NODE_ENV === "development") {
        return path;
    }

    const supabaseBase = process.env.REACT_APP_SUPABASE_STORAGE_URL?.replace(/\/$/, "");
    if (supabaseBase && path.startsWith("/uploads/")) {
        const relativePath = path.slice("/uploads/".length);
        return `${supabaseBase}/${toSupabaseObjectPath(relativePath)}`;
    }

    return `${process.env.REACT_APP_SERVER_URL}${path}`;
}
