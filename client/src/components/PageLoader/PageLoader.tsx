import "./pageLoader.css";

export default function PageLoader() {
    return (
        <div className="pageLoader" role="status" aria-live="polite" aria-label="Завантаження">
            <div className="pageLoader__bowl" aria-hidden="true">
                <span className="pageLoader__ring"/>
                <img className="pageLoader__icon" src="/soup.png" alt=""/>
            </div>
            <p className="pageLoader__text">Завантаження...</p>
        </div>
    );
}
