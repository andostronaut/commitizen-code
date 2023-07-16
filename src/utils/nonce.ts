function generateNonce(length: number = 16): string {
  const chars = 'AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz1234567890'

  const randomArray = Array.from(
    { length },
    (v, k) => chars[Math.floor(Math.random() * chars.length)]
  )

  const randomString = randomArray.join('')

  return randomString
}

export { generateNonce }
