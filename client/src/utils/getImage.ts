export default function getImage (path) {
    if (process.env.NODE_ENV === 'development') return path
    else return `${process.env.REACT_APP_SERVER_URL}${path}`
}