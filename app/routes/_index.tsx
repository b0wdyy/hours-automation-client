import {
  redirect,
  type ActionFunctionArgs,
  type MetaFunction,
  LoaderFunctionArgs,
  json,
} from '@remix-run/node'
import { Form, useLoaderData } from '@remix-run/react'
import { useEffect } from 'react'

import { DatePicker } from '~/components/date-picker'
import { TokenForm } from '~/components/token-form'
import { useGlobalState } from '~/context/global-context'
import { userToken } from '~/utils/cookie.server'

export const meta: MetaFunction = () => {
  return [
    { title: 'Hours automation app' },
    { name: 'description', content: 'Welcome to Remix!' },
  ]
}

export const action = async ({ request }: ActionFunctionArgs) => {
  const form = await request.formData()
  const token = form.get('token') || ''
  const resetCookie = Boolean(form.get('resetCookie')) || false
  console.log(resetCookie)

  if (resetCookie) {
    return redirect('/', {
      headers: {
        'Set-Cookie': await userToken.serialize(''),
      },
    })
  }

  const cookieHeader = request.headers.get('Cookie')
  let cookie = (await userToken.parse(cookieHeader)) || ''

  if (token) {
    cookie = token
  }

  return redirect('/', {
    headers: {
      'Set-Cookie': await userToken.serialize(cookie),
    },
  })
}

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const cookieHeader = request.headers.get('Cookie')
  const cookie = (await userToken.parse(cookieHeader)) || ''

  return json({ cookieToken: cookie })
}

export default function Index() {
  const { dispatch } = useGlobalState()
  const { cookieToken } = useLoaderData<typeof loader>()

  function dispatchToken() {
    if (!cookieToken) return

    dispatch({
      type: 'add_token',
      value: cookieToken,
    })
  }

  useEffect(() => {
    dispatchToken()
  }, [])

  return (
    <div className="h-screen w-screen dark:bg-slate-800 bg-slate-100 grid place-items-center">
      <div className="w-1/2 p-8 rounded-lg shadow-md dark:bg-slate-600 bg-slate-50">
        <Form method="post">
          <input type="hidden" name="resetCookie" value="true" />
          <button
            className="px-4 py-2 bg-slate-900 text-white rounded-lg mb-4 cursor-pointer disabled:bg-slate-300 disabled:cursor-not-allowed"
            onClick={() =>
              dispatch({
                type: 'reset',
              })
            }
            disabled={!cookieToken}
          >
            Reset
          </button>
        </Form>
        {!cookieToken ? <TokenForm token={cookieToken} /> : null}
        {cookieToken ? <DatePicker /> : null}
      </div>
    </div>
  )
}
