import type { MetaFunction } from '@remix-run/node'
import { Form } from '@remix-run/react'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export const meta: MetaFunction = () => {
  return [
    { title: 'Hours automation app' },
    { name: 'description', content: 'Welcome to Remix!' },
  ]
}

export default function Index() {
  const titles = [
    'Hi there!',
    'You want to automate your hours in teamleader?',
    'We first need a token',
  ]
  const [activeIndex, setActiveIndex] = useState(0)

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
          <Form>
            <fieldset className="flex flex-col w-1/2">
              <label htmlFor="token" className="dark:text-white text-slate-900">
                Token
              </label>
              <input
                type="text"
                name="token"
                id="token"
                className="p-2 rounded-lg border-slate-300 border"
              />
            </fieldset>
          </Form>
        </motion.div>
      </div>
    </div>
  )
}
