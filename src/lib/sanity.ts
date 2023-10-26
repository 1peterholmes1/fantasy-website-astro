import type { Image } from '@sanity/types'
import type { Person, BlogPost } from '@/lib/types'
import { sanityClient } from 'sanity:client'
import imageUrlBuilder from '@sanity/image-url'

export const getNewestPost = async (): Promise<BlogPost> => {
  const query = '*[_type == "fantasyWriteup"]{..., author->} | order(date desc)[0]'
  const post = sanityClient.fetch(query)
  return post
}

export const getAllManagers = async (): Promise<Person[]> => {
  const query = '*[_type == "person" && playsFantasy == true]{..., fantasyTeamRival->}'
  const managers = sanityClient.fetch(query)
  return managers
}

export const buildImage = (image: Image, width: number = 960) => {
  const builder = imageUrlBuilder(sanityClient)

  return builder.image(image).width(width)
}
