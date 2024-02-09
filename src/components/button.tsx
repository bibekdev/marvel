type ButtonProps = {
  onClick: () => void
  disabled: boolean
  title: string
}

export const Button: React.FC<ButtonProps> = ({ onClick, disabled, title }) => {
  return (
    <button type='button' className='button' onClick={onClick} disabled={disabled}>
      {title}
    </button>
  )
}
