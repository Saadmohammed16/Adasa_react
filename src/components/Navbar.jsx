import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { data } from '../data'

const links = [
  { to: '/home', label: 'الرئيسية' },
  { to: '/blog', label: 'المدونة' },
  { to: '/about', label: 'من نحن' },
]

export default function Navbar() {
  const [showMenu, setShowMenu] = useState(false)
  const toggle = () => setShowMenu((s) => !s)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-500 bg-[#0a0a0a]/95 backdrop-blur-xl border-b border-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/home" className="flex items-center gap-3 group">
            <div className="relative w-12 h-12 rounded-xl overflow-hidden group-hover:scale-105 transition-all duration-300">
              <img alt="Photography Logo" src={`${import.meta.env.BASE_URL}images/logo-GdqARQRt.png`} className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold bg-linear-to-r from-white to-neutral-300 bg-clip-text text-transparent">
                {data.siteInfo.name}
              </span>
              <span className="text-xs text-orange-400/80 hidden sm:block tracking-wide">{data.siteInfo.tagline}</span>
            </div>
          </Link>

          <div className="hidden md:flex items-center">
            <div className="flex items-center bg-[#161616] rounded-full p-1.5 border border-[#262626]">
              {links.map((l) => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  className={({ isActive }) =>
                    'px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 text-neutral-400 hover:text-white' +
                    (isActive ? ' bg-linear-to-r from-orange-500 to-orange-600 text-white' : '')
                  }
                >
                  {l.label}
                </NavLink>
              ))}
            </div>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <button className="p-3 text-neutral-500 hover:text-orange-500 hover:bg-[#161616] rounded-xl transition-all duration-300 border border-transparent hover:border-[#262626]">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            <Link to="/blog" className="btn-primary text-sm transition-transform duration-300 hover:translate-y-[-10%] text-white">
              ابدأ القراءة
            </Link>
          </div>

          <button
            onClick={toggle}
            className="md:hidden p-3 text-neutral-400 hover:text-white hover:bg-[#161616] rounded-xl transition-all duration-300 border border-transparent hover:border-[#262626]"
          >
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-6 h-6">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={showMenu ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
              />
            </svg>
          </button>
        </div>

        <div className={'md:hidden overflow-hidden transition-all duration-300 ' + (showMenu ? 'max-h-80 pb-6' : 'max-h-0')}>
          <div className="bg-[#161616] backdrop-blur-xl rounded-2xl p-4 border border-[#262626]">
            <div className="flex flex-col space-y-1">
              {links.map((l) => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  onClick={toggle}
                  className={({ isActive }) =>
                    'px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 text-neutral-400 hover:bg-[#1a1a1a] hover:text-white' +
                    (isActive ? ' bg-orange-500/10 text-orange-500 border border-orange-500/30' : '')
                  }
                >
                  {l.label}
                </NavLink>
              ))}
              <Link to="/blog" onClick={toggle} className="btn-primary text-sm text-center mt-2">
                ابدأ القراءة
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
