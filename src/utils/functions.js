export const timeFormat = (time) => {
  const years = String(time.getFullYear()).padStart(2, '0')
  const months = String(time.getMonth() + 1).padStart(2, '0')
  const days = String(time.getDate()).padStart(2, '0')
  return `${years}-${months}-${days}`
}
