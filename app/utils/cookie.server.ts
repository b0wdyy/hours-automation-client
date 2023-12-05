import { createCookie } from '@remix-run/node'

export const userToken = createCookie('userToken')
