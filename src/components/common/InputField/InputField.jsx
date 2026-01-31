import './InputField.css'

export default function InputField({ label, type, name, value, placeholder, onChange, error }) {
    return (
        <div className='inputField-group'>
            <label className='inputField-label'>
                {label}
            </label>

            <input
                className='inputField-box'
                type={type}
                name={name}
                value={value}
                placeholder={placeholder}
                onChange={onChange}
                required
            />

            <small className='error-msg'>{error}</small>
        </div>
    )
}
