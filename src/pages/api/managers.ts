import type { APIRoute } from 'astro'
import { getAllManagers } from '@/lib/sanity'

export const GET: APIRoute = async () => {
  console.log('here')
  const managers = await getAllManagers().catch((e: Error) => {
    console.error(e)
    return null
  })

  return new Response(JSON.stringify(managers))
}
