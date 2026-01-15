const body = document.body
const toggle = document.getElementById('themeToggle')
const icon = toggle.querySelector('i')
const systemTheme = window.matchMedia('(prefers-color-scheme: dark)')

function setIcon(theme) {
  icon.classList.remove('fa-sun', 'fa-moon')
  icon.classList.add(theme === 'dark' ? 'fa-sun' : 'fa-moon')
}

function applyTheme(theme, animate = true) {
  if (animate) {
    body.classList.add('theme-fade')
    setTimeout(() => {
      body.classList.remove('light', 'dark')
      body.classList.add(theme)
      setIcon(theme)
      body.classList.remove('theme-fade')
    }, 200)
  } else {
    body.classList.remove('light', 'dark')
    body.classList.add(theme)
    setIcon(theme)
  }
}

const savedTheme = localStorage.getItem('theme')

if (savedTheme) {
  applyTheme(savedTheme, false)
} else {
  applyTheme(systemTheme.matches ? 'dark' : 'light', false)
}

toggle.addEventListener('click', () => {
  const newTheme = body.classList.contains('dark') ? 'light' : 'dark'
  toggle.classList.add('icon-animate')
  applyTheme(newTheme)
  localStorage.setItem('theme', newTheme)

  setTimeout(() => {
    toggle.classList.remove('icon-animate')
  }, 400)
})

systemTheme.addEventListener('change', e => {
  if (!localStorage.getItem('theme')) {
    applyTheme(e.matches ? 'dark' : 'light')
  }
})
