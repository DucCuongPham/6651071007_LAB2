
export function formatCurrency(
  amount: number,
  currency: string = 'VND'
): string {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency,
  }).format(amount)
}

export function truncateText(
  text: string,
  maxLength: number
): string {
  if (text.length <= maxLength) {
    return text
  }

  return text.slice(0, maxLength) + '...'
}

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export function debounce<T extends (...args: never[]) => void>(
  fn: T,
  delay: number
): T {
  let timer: ReturnType<typeof setTimeout>

  const debounced = ((...args: Parameters<T>) => {
    clearTimeout(timer)

    timer = setTimeout(() => {
      fn(...args)
    }, delay)
  }) as T

  return debounced
}
