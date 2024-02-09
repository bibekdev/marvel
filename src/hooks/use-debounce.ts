import { useState, useEffect } from 'react'

// custom react hook for debounce feature
export function useDebounce(value: string) {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, 500)

    return () => {
      clearTimeout(handler)
    }
  }, [value])

  return debouncedValue
}
