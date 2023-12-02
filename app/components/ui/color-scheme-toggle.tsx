import { MoonIcon, SunIcon } from '@heroicons/react/20/solid'
import { useEffect } from 'react'

export function ColorSchemeToggle() {
  useEffect(() => {
    if (
      localStorage.theme === 'dark' ||
      (!('theme' in localStorage) &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      addDarkMode()
    } else {
      removeDarkMode()
    }
  })

  function removeDarkMode() {
    document.documentElement.classList.remove('dark')
    localStorage.removeItem('theme')
  }

  function addDarkMode() {
    document.documentElement.classList.add('dark')
    localStorage.setItem('theme', 'dark')
  }

  function onSchemeSwitch() {
    const isDark = localStorage.theme === 'dark'

    if (isDark) {
      removeDarkMode()
    } else {
      addDarkMode()
    }
  }

  return (
    <button
      onClick={onSchemeSwitch}
      className="w-8 h-8 fixed top-12 right-12 rounded-full grid place-items-center dark:bg-slate-100 bg-slate-800"
    >
      {true ? (
        <SunIcon className="w-4 h-4" />
      ) : (
        <MoonIcon className="w-4 h-4 text-white" />
      )}
    </button>
  )
}
