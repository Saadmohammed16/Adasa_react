import { useEffect, useMemo, useState } from 'react'
import { Link, useSearchParams, useNavigate } from 'react-router-dom'
import { data, formatDate } from '../data'

const PER_PAGE = 6

function PostCard({ post }) {
  return (
    <article className="group card overflow-hidden" style={{ animationDelay: '0ms' }}>
      <Link className="block" to={'/blog/' + post.slug}>
        <div className="relative h-52 overflow-hidden">
          <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out" alt={post.title} src={post.image} />
          <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="absolute top-4 right-4">
            <span className="px-3 py-1 bg-[#0a0a0a]/80 backdrop-blur-sm text-white text-xs font-semibold rounded-full border border-[#333333]">{post.category}</span>
          </div>
        </div>
        <div className="p-6">
          <div className="flex items-center gap-3 text-sm text-neutral-500 mb-3">
            <span className="flex items-center gap-1">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {post.readTime}
            </span>
            <span className="w-1 h-1 bg-neutral-600 rounded-full" />
            <span>{formatDate(post.date)}</span>
          </div>
          <h3 className="text-xl font-bold text-white mb-3 group-hover:text-orange-500 transition-colors duration-300 line-clamp-2 leading-tight">{post.title}</h3>
          <p className="text-neutral-400 mb-5 line-clamp-2 text-sm leading-relaxed">{post.excerpt}</p>
          <div className="flex items-center justify-between pt-4 border-t border-[#262626]">
            <div className="flex items-center gap-3">
              <img className="w-9 h-9 rounded-full object-cover ring-2 ring-[#262626]" alt={post.author.name} src={post.author.avatar} />
              <div>
                <p className="text-sm font-medium text-white">{post.author.name}</p>
                <p className="text-xs text-neutral-500">{post.author.role}</p>
              </div>
            </div>
            <div className="w-8 h-8 rounded-full bg-orange-500/10 flex items-center justify-center group-hover:bg-orange-500 transition-colors duration-300 border border-orange-500/20 group-hover:border-transparent">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-4 h-4 text-orange-500 group-hover:text-white transition-colors duration-300 rotate-180">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>
      </Link>
    </article>
  )
}

export default function Blog() {
  const [params] = useSearchParams()
  const navigate = useNavigate()
  const category = params.get('category') || 'all'
  const [search, setSearch] = useState('')
  const [view, setView] = useState('grid')
  const [page, setPage] = useState(1)

  const posts = useMemo(() => {
    let list = category === 'all' ? data.posts : data.posts.filter((p) => p.category === category)
    if (search.trim() !== '') list = list.filter((p) => p.title.includes(search))
    return list
  }, [category, search])

  const pages = Math.max(1, Math.ceil(posts.length / PER_PAGE))

  useEffect(() => {
    setPage(1)
  }, [category, search])

  const visible = posts.slice((page - 1) * PER_PAGE, page * PER_PAGE)
  const filterBtn = (active) =>
    'px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ' +
    (active
      ? 'bg-linear-to-r from-orange-500 to-orange-600 text-white'
      : 'bg-[#161616] text-neutral-400 border border-[#262626] hover:border-orange-500/30')
  const pageBtn = (active) =>
    'min-w-11 h-11 rounded-xl text-sm font-medium transition-all duration-300 ' +
    (active
      ? 'bg-linear-to-r from-orange-500 to-orange-600 text-white'
      : 'bg-[#161616] text-neutral-400 border border-[#262626] hover:border-orange-500/50 hover:text-white')
  const backDisabled = page <= 1
  const fwdDisabled = page >= pages

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <div className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[#0a0a0a]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(38,38,38,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(38,38,38,0.5)_1px,transparent_1px)] bg-size-[60px_60px]" />
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-yellow-500/5 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="section-label inline-flex items-center gap-2 mb-6">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
            مدونتنا
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            استكشف{' '}
            <span className="gradient-text">
              مقالاتنا
            </span>
          </h1>
          <p className="text-xl text-neutral-400 max-w-2xl mx-auto">
            اكتشف الدروس والرؤى وأفضل الممارسات للتطوير الحديث
          </p>
        </div>
      </div>
      <div className="sticky top-20 z-40 bg-[#0a0a0a]/90 backdrop-blur-xl border-b border-[#262626]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="relative w-full md:w-80">
              <input
                placeholder="ابحث في المقالات..."
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="input-dark w-full px-5 py-3 pr-12"
              />
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <div className="flex flex-wrap justify-center gap-2">
              <button className={filterBtn(category === 'all')} onClick={() => navigate('/blog')}>
                جميع المقالات
              </button>
              {data.categories.map((c) => (
                <button key={c.name} className={filterBtn(category === c.name)} onClick={() => navigate('/blog?category=' + encodeURIComponent(c.name))}>
                  {c.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 scroll-mt-36.5">
        <div className="mb-8 flex items-center justify-between">
          <p className="text-neutral-400">
            عرض <span className="font-bold text-white">{posts.length}</span> مقالات{' '}
            {category !== 'all' && (
              <span>
                {' '}في <span className="font-bold text-orange-500 capitalize">{category}</span>
              </span>
            )}
          </p>
          <div className="flex items-center gap-2">
            <div className="flex items-center bg-[#161616] border border-[#262626] rounded-xl p-1">
              <button title="عرض شبكي" onClick={() => setView('grid')} className={'p-2 rounded-lg transition-all duration-300 ' + (view === 'grid' ? 'bg-orange-500 text-white' : 'text-neutral-400 hover:text-white')}>
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </button>
              <button title="عرض قائمة" onClick={() => setView('list')} className={'p-2 rounded-lg transition-all duration-300 ' + (view === 'list' ? 'bg-orange-500 text-white' : 'text-neutral-400 hover:text-white')}>
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
            {category !== 'all' && (
              <button onClick={() => navigate('/blog')} className="text-sm text-neutral-500 hover:text-orange-500 flex items-center gap-1 transition-colors">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
                مسح الفلاتر
              </button>
            )}
          </div>
        </div>

        <div className={view === 'grid' ? 'grid md:grid-cols-2 lg:grid-cols-3 gap-8' : 'flex flex-col gap-6'}>
          {visible.map((p) => (
            <PostCard key={p.id} post={p} />
          ))}
        </div>

        {posts.length === 0 && <p className="text-center text-neutral-500 py-16">لا توجد مقالات مطابقة</p>}

        {posts.length > PER_PAGE && (
          <>
            <div className="flex justify-center items-center gap-2 mt-12">
              <button
                onClick={() => !backDisabled && setPage(page - 1)}
                disabled={backDisabled}
                className={'p-3 rounded-xl border transition-all duration-300 border-[#262626] ' + (backDisabled ? 'bg-[#0a0a0a] cursor-not-allowed text-neutral-600' : 'bg-[#161616] hover:bg-[#1a1a1a] hover:border-orange-500/50 text-white')}
              >
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-5 h-5 rotate-180">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <div className="flex items-center gap-1">
                {Array.from({ length: pages }, (_, i) => i + 1).map((n) => (
                  <button key={n} onClick={() => setPage(n)} className={pageBtn(n === page)}>
                    {n}
                  </button>
                ))}
              </div>
              <button
                onClick={() => !fwdDisabled && setPage(page + 1)}
                disabled={fwdDisabled}
                className={'p-3 rounded-xl border transition-all duration-300 border-[#262626] ' + (fwdDisabled ? 'bg-[#0a0a0a] cursor-not-allowed text-neutral-600' : 'bg-[#161616] hover:bg-[#1a1a1a] hover:border-orange-500/50 text-white')}
              >
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-5 h-5 rotate-180">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
            <p className="text-center text-neutral-500 mt-4 text-sm">
              صفحة {page} من {pages}
            </p>
          </>
        )}
      </div>
    </div>
  )
}
