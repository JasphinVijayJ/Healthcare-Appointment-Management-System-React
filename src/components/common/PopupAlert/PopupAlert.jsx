import './PopupAlert.css'

function PopupAlert({ show, message, type }) {
    if (!show) return null;

    return (
        <section className='popup-overlay'>
            <div className={`popup-alert ${type}`}>
                <div className='popup-icon'>
                    {type === "success" ? "✓" : "!"}
                </div>
                <div className='popup-message'>{message}</div>
            </div>
        </section>
    )
}

export default PopupAlert