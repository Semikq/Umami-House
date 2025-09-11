export default function getApiUrl(path: string) {
    if (process.env.NODE_ENV === 'development') return path
    else return `${process.env.REACT_APP_SERVER_URL}${path}`
}