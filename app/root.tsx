import type { LinksFunction } from '@remix-run/node'
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from '@remix-run/react'

import stylesheet from '~/tailwind.css'

import { GlobalStateProvider } from './context/global-context'

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: stylesheet },
]

export const loader = async () => {
  return {
    ENV: {
      API_URL: process.env.API_URL,
    },
  }
}

export default function App() {
  const data = useLoaderData<typeof loader>()

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <GlobalStateProvider>
          <Outlet />
        </GlobalStateProvider>
        <ScrollRestoration />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.ENV = ${JSON.stringify(data.ENV)}`,
          }}
        />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  )
}
