import { Form } from '@remix-run/react'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

export function TokenForm({ token }: { token: string }) {
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
