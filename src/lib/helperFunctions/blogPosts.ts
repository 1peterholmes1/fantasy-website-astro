

export const getNewestPost = async () => {
  const res = await fetch('/api/getNewestPost')

  if (!res.ok) {
    const errs = await res.text()
    console.error(errs)
    return null
  }

  const newPost = await res.json()

  return newPost
}
