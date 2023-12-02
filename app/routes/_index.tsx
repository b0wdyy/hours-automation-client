import type { MetaFunction } from '@remix-run/node'
import { Form } from '@remix-run/react'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

import { useGlobalState } from '~/context/global-context'

export const meta: MetaFunction = () => {
  return [
    { title: 'Hours automation app' },
    { name: 'description', content: 'Welcome to Remix!' },
  ]
}

export default function Index() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [userToken, setUserToken] = useState('')
  const {
    dispatch,
    state: { token },
  } = useGlobalState()

  const titles = [
    'Hi there!',
    'You want to automate your hours in teamleader?',
    'We first need a token',
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      if (activeIndex >= titles.length - 1) {
        clearInterval(interval)
        return
      }

      setActiveIndex(activeIndex + 1)
    }, 3000)

    return () => clearInterval(interval)
  }, [activeIndex])

  function dispatchToken() {
    if (!userToken) return

    dispatch({
      type: 'add_token',
      value: userToken,
    })
  }

  function startOver(): void {
    dispatch({
      type: 'add_token',
      value: '',
    })
  }

  return (
    <div className="h-screen w-screen dark:bg-slate-800 bg-slate-100 grid place-items-center">
      <div className="w-1/2 p-8 rounded-lg shadow-md dark:bg-slate-600 bg-slate-50">
        <h2 className="font-bold mb-4 text-slate-900 dark:text-white text-xl">
          {titles[activeIndex]}
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
          transition={{ ease: 'easeOut', duration: 0.5 }}
        >
          {token ? (
            <div>
              <p>{token}</p>
              <button
                onClick={startOver}
                className="bg-slate-900 text-white px-4 py-2 rounded-lg mt-2"
              >
                Start over
              </button>
            </div>
          ) : (
            <Form>
              <fieldset className="flex flex-col w-1/2">
                <label
                  htmlFor="token"
                  className="dark:text-white text-slate-900"
                >
                  Token
                </label>
                <input
                  onChange={(e) => setUserToken(e.target.value)}
                  type="text"
                  name="token"
                  id="token"
                  className="p-2 rounded-lg border-slate-300 border"
                />
              </fieldset>
              <button
                onClick={dispatchToken}
                className="bg-slate-900 text-white px-4 py-2 rounded-lg mt-2"
              >
                Set token
              </button>
            </Form>
          )}
        </motion.div>
      </div>
    </div>
  )
}
