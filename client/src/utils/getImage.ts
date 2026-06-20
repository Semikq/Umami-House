export default function getImage(path: string): string {
    if (!path) return path;
    if (path.startsWith("http://") || path.startsWith("https://")) return path;
    if (process.env.NODE_ENV === "development") return path;
    return `${process.env.REACT_APP_SERVER_URL}${path}`;
}
