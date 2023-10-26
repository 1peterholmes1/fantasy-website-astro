import type { APIRoute } from 'astro'
import { getNewestPost } from '@/lib/sanity'

export const GET: APIRoute = async () => {
  const post = await getNewestPost().catch((e: Error) => {
    console.error(e)
    return null
  })

  return new Response(JSON.stringify(post))
}
