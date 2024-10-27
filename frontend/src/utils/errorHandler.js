export function handleError(error, setError) {
  if (error.response && error.response.data) {
    const errorMessages = Object.values(error.response.data)
      .flat()
      .join('. ')
    setError(errorMessages)
  } else {
    setError('An error occurred. Please try again later.')
  }
}
