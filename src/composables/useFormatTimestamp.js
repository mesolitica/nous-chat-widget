export function useFormatTimestamp() {
  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp)
    const today = new Date()
    
    if (date.toDateString() === today.toDateString()) {
      return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })
    }
    
    return date.toLocaleString('en-US', { month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: true })
  }

  return { formatTimestamp }
}