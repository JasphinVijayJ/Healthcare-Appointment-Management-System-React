import React from 'react'
import './SlotSelector.css'

const SlotSelector = React.memo(function SlotSelector({ title, items, selectedItem, onSelect }) {
    return (
        <section className="slot-selection">
            <p className="gradient-highlight">{title}</p>
            <div className="slot-grid">
                {items.map((item) => (
                    <button
                        key={item}
                        type="button"
                        className={`slot-btn ${selectedItem === item ? 'selected' : ''}`}
                        onClick={() => onSelect(item)}
                    >
                        {item ? item : "No slots available"}
                    </button>
                ))}
            </div>
        </section>
    )
})

export default SlotSelector