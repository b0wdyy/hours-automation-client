import {
  redirect,
  type ActionFunctionArgs,
  type MetaFunction,
  LoaderFunctionArgs,
  json,
} from '@remix-run/node'
import { Form, useLoaderData } from '@remix-run/react'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

import { DatePicker } from '~/components/date-picker'
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
  const {
    dispatch,
    state: { dates },
  } = useGlobalState()
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
        {!cookieToken ? <TokenForm token={cookieToken} /> : null}
        {cookieToken && !dates.length ? (
          <DatePicker onDateClick={console.log} />
        ) : null}
      </div>
    </div>
  )
}

function TokenForm({ token }: { token: string }) {
  const [userToken, setUserToken] = useState('')

  useEffect(() => {
    if (token) {
      setUserToken(token)
    }
  }, [])

  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{ ease: 'easeOut', duration: 0.75 }}
    >
      <h2 className="font-bold mb-4 text-slate-900 dark:text-white text-xl">
        Provide token
      </h2>
      <motion.div
        initial={{
          opacity: 0,
          y: 25,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{ ease: 'easeOut', duration: 0.5, delay: 0.75 }}
      >
        <Form method="post">
          <fieldset className="flex flex-col w-1/2">
            <label htmlFor="token" className="dark:text-white text-slate-900">
              Token
            </label>
            <input
              defaultValue={userToken}
              onChange={(e) => setUserToken(e.target.value)}
              type="text"
              name="token"
              id="token"
              className="p-2 rounded-lg border-slate-300 border"
            />
          </fieldset>

          <button
            type="submit"
            className="bg-slate-900 text-white px-4 py-2 rounded-lg mt-2"
          >
            Set token
          </button>
        </Form>
      </motion.div>
    </motion.div>
  )
}
