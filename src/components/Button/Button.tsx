import Spinner from '../Spinner/Spinner'

export default function Button({
    label,
    type = 'button',
    disabled = false,
    loading = false,
    className = '',
    onClick
}: {
    label: string
    type?: 'button' | 'submit'
    disabled?: boolean
    loading?: boolean
    className?: string
    onClick?: () => void
}) {
    return (
        <button
            type={type}
            className={`button ${className}`}
            onClick={onClick}
            disabled={loading || disabled}
            style={{ transition: 'background-color 0.25s' }}
        >
            {loading && <Spinner />}
            {label}
        </button>
    )
}
