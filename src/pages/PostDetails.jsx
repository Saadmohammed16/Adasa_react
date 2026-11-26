import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { data, formatDate } from '../data'
import NotFound from './NotFound'

function parseContent(content) {
  const blocks = content.split(/\n\s*\n/).map((b) => b.trim()).filter(Boolean)
  let section = -1
  return blocks.map((b) => {
    if (b.startsWith('## ')) {
      section += 1
      return { type: 'h2', text: b.slice(3), id: 'section-' + section }
    }
    return { type: 'p', text: b }
  })
}

const iconBox = 'w-10 h-10 bg-orange-500/10 rounded-xl flex items-center justify-center border border-orange-500/30'
const shareBtn = 'w-11 h-11 bg-[#1a1a1a] border border-[#262626] rounded-xl flex items-center justify-center text-neutral-400 hover:text-white hover:border-transparent transition-all duration-300 '

export default function PostDetails() {
  const { name } = useParams()
  const [copied, setCopied] = useState(false)
  const post = data.posts.find((p) => p.slug === name)
  if (!post) return <NotFound />

  const blocks = parseContent(post.content)
  const headings = blocks.filter((b) => b.type === 'h2')
  const related = [
    ...data.posts.filter((p) => p.category === post.category && p.id !== post.id),
    ...data.posts.filter((p) => p.category !== post.category),
  ].slice(0, 3)

  const url = typeof window !== 'undefined' ? window.location.href : ''
  const open = (u) => window.open(u, '_blank', 'noopener,noreferrer')
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
     
    }
  }

  return (
    <article className="bg-[#0a0a0a] min-h-screen">
      <div className="relative h-[60vh] min-h-125 overflow-hidden">
        <img className="absolute inset-0 w-full h-full object-cover" alt={post.title} src={post.image} />
        <div className="absolute inset-0 bg-linear-to-t from-[#0a0a0a] via-[#0a0a0a]/50 to-transparent" />
        <div className="absolute inset-0 bg-linear-to-r from-[#0a0a0a]/30 to-transparent" />
        <div className="absolute top-8 right-8 left-8">
          <nav className="inline-flex items-center gap-2 px-4 py-2 bg-black/30 backdrop-blur-md rounded-full text-sm border border-white/10">
            <Link className="text-white/70 hover:text-white transition-colors" to="/home">
              <i className="fa-solid fa-home" />
            </Link>
            <i className="fa-solid fa-chevron-left text-white/30 text-xs" />
            <Link className="text-white/70 hover:text-white transition-colors" to="/blog">
              المدونة
            </Link>
            <i className="fa-solid fa-chevron-left text-white/30 text-xs" />
            <span className="text-orange-400 font-medium truncate max-w-50">{post.category}</span>
          </nav>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <Link className="px-4 py-2 bg-orange-500 text-white text-sm font-bold rounded-full hover:bg-orange-600 transition-colors" to={'/blog?category=' + encodeURIComponent(post.category)}>
                {post.category}
              </Link>
              <div className="flex items-center gap-4 text-white/70 text-sm">
                <span className="flex items-center gap-2">
                  <i className="fa-regular fa-calendar" />
                  {formatDate(post.date)}
                </span>
                <span className="flex items-center gap-2">
                  <i className="fa-regular fa-clock" />
                  {post.readTime}
                </span>
              </div>
            </div>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight max-w-4xl">{post.title}</h1>
            <div className="flex items-center gap-4 p-4 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 w-fit">
              <img className="w-14 h-14 rounded-full object-cover ring-2 ring-orange-500/50" alt={post.author.name} src={post.author.avatar} />
              <div>
                <p className="font-bold text-white">{post.author.name}</p>
                <p className="text-sm text-white/60">{post.author.role}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-[1fr_300px] gap-12">
          <div className="order-2 lg:order-1">
            <div className="p-6 bg-linear-to-r from-orange-500/10 to-yellow-500/5 rounded-2xl border border-orange-500/20 mb-10">
              <p className="text-lg text-neutral-200 leading-relaxed italic">{post.excerpt}</p>
            </div>

            <div className="prose-custom">
              {blocks.map((b, i) =>
                b.type === 'h2' ? (
                  <h2 key={i} id={b.id} className="text-2xl md:text-3xl font-bold text-white mt-14 mb-6 flex items-center gap-4 scroll-mt-24">
                    <span className="flex items-center justify-center w-10 h-10 bg-orange-500/10 rounded-xl border border-orange-500/30">
                      <i className="fa-solid fa-camera text-orange-500" />
                    </span>
                    {b.text}
                  </h2>
                ) : (
                  <p key={i} className="text-neutral-300 leading-relaxed mb-6 text-lg">{b.text}</p>
                )
              )}
            </div>

            <div className="mt-14 p-6 bg-[#111111] rounded-2xl border border-[#262626]">
              <div className="flex items-center gap-3 mb-4">
                <div className={iconBox}>
                  <i className="fa-solid fa-tags text-orange-500" />
                </div>
                <h3 className="font-bold text-white">الوسوم</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((t) => (
                  <span key={t} className="px-4 py-2 bg-[#1a1a1a] text-neutral-400 text-sm rounded-full border border-[#262626] hover:border-orange-500/50 hover:text-orange-500 transition-colors cursor-pointer">
                    #{t}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-6 p-6 bg-[#111111] rounded-2xl border border-[#262626]">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-3">
                  <div className={iconBox}>
                    <i className="fa-solid fa-share-nodes text-orange-500" />
                  </div>
                  <h3 className="font-bold text-white">شارك المقال</h3>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => open('https://twitter.com/intent/tweet?url=' + encodeURIComponent(url) + '&text=' + encodeURIComponent(post.title))} className={shareBtn + 'hover:bg-[#1da1f2]'}>
                    <i className="fa-brands fa-x-twitter" />
                  </button>
                  <button onClick={() => open('https://www.linkedin.com/sharing/share-offsite/?url=' + encodeURIComponent(url))} className={shareBtn + 'hover:bg-[#0077b5]'}>
                    <i className="fa-brands fa-linkedin-in" />
                  </button>
                  <button onClick={() => open('https://wa.me/?text=' + encodeURIComponent(post.title + ' ' + url))} className={shareBtn + 'hover:bg-[#25d366]'}>
                    <i className="fa-brands fa-whatsapp" />
                  </button>
                  <button onClick={copy} title={copied ? 'تم النسخ' : 'نسخ الرابط'} className={shareBtn + 'hover:bg-orange-500'}>
                    <i className={copied ? 'fa-solid fa-check' : 'fa-solid fa-link'} />
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-6 p-8 bg-linear-to-br from-[#161616] to-[#111111] rounded-2xl border border-[#262626]">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                <img className="w-24 h-24 rounded-2xl object-cover ring-4 ring-orange-500/20" alt={post.author.name} src={post.author.avatar} />
                <div className="text-center sm:text-right flex-1">
                  <span className="text-xs text-orange-500 font-semibold uppercase tracking-wider">كاتب المقال</span>
                  <h3 className="text-xl font-bold text-white mt-1">{post.author.name}</h3>
                  <p className="text-neutral-500 text-sm mb-3">{post.author.role}</p>
                  <p className="text-neutral-400 text-sm leading-relaxed">
                    {post.author.role} شغوف بمشاركة المعرفة والخبرات في عالم التصوير الفوتوغرافي.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <aside className="order-1 lg:order-2">
            <div className="lg:sticky lg:top-24 space-y-6">
              {headings.length > 0 && (
                <div className="p-6 bg-[#111111] rounded-2xl border border-[#262626]">
                  <div className="flex items-center gap-3 mb-5">
                    <div className={iconBox}>
                      <i className="fa-solid fa-list text-orange-500" />
                    </div>
                    <h3 className="font-bold text-white">محتويات المقال</h3>
                  </div>
                  <nav className="space-y-2">
                    {headings.map((h, i) => (
                      <a
                        key={h.id}
                        href={'#' + h.id}
                        onClick={(e) => {
                          e.preventDefault()
                          document.getElementById(h.id)?.scrollIntoView({ behavior: 'smooth' })
                        }}
                        className="flex items-center gap-3 p-3 rounded-xl text-neutral-400 hover:text-orange-500 hover:bg-orange-500/5 transition-all duration-300 group"
                      >
                        <span className="flex items-center justify-center w-6 h-6 bg-[#1a1a1a] rounded-lg text-xs font-bold text-neutral-500 group-hover:bg-orange-500/10 group-hover:text-orange-500 transition-colors">
                          {i + 1}
                        </span>
                        <span className="text-sm">{h.text}</span>
                      </a>
                    ))}
                  </nav>
                </div>
              )}

              <div className="p-6 bg-[#111111] rounded-2xl border border-[#262626]">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-[#0a0a0a] rounded-xl">
                    <i className="fa-regular fa-clock text-orange-500 text-xl mb-2" />
                    <p className="text-white font-bold">{post.readTime}</p>
                    <p className="text-neutral-500 text-xs">وقت القراءة</p>
                  </div>
                  <div className="text-center p-4 bg-[#0a0a0a] rounded-xl">
                    <i className="fa-regular fa-calendar text-orange-500 text-xl mb-2" />
                    <p className="text-white font-bold text-sm">{formatDate(post.date, { day: 'numeric', month: 'long' })}</p>
                    <p className="text-neutral-500 text-xs">تاريخ النشر</p>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-linear-to-br from-orange-500/10 to-yellow-500/5 rounded-2xl border border-orange-500/20">
                <div className="text-center">
                  <div className="w-14 h-14 bg-orange-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <i className="fa-solid fa-envelope text-orange-500 text-xl" />
                  </div>
                  <h3 className="font-bold text-white mb-2">لا تفوّت جديدنا</h3>
                  <p className="text-neutral-400 text-sm mb-4">اشترك للحصول على أحدث المقالات</p>
                  <Link className="block w-full py-3 bg-orange-500 text-white font-semibold rounded-xl hover:bg-orange-600 transition-colors text-center" to="/blog">
                    تصفح المزيد
                  </Link>
                </div>
              </div>
            </div>
          </aside>
        </div>

        <div className="mt-20 pt-12 border-t border-[#262626]">
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-4">
              <span className="w-12 h-12 bg-orange-500/10 rounded-2xl flex items-center justify-center border border-orange-500/30">
                <i className="fa-solid fa-images text-orange-500 text-xl" />
              </span>
              <div>
                <h2 className="text-2xl font-bold text-white">مقالات قد تعجبك</h2>
                <p className="text-neutral-500 text-sm">استكشف المزيد من المحتوى المميز</p>
              </div>
            </div>
            <Link className="hidden sm:flex items-center gap-2 text-orange-500 hover:text-orange-400 transition-colors group" to="/blog">
              عرض الكل
              <i className="fa-solid fa-arrow-left group-hover:-translate-x-1 transition-transform" />
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {related.map((r) => (
              <Link key={r.id} className="group relative bg-[#111111] rounded-2xl overflow-hidden border border-[#262626] hover:border-orange-500/30 transition-all duration-500" to={'/blog/' + r.slug}>
                <div className="relative h-48 overflow-hidden">
                  <img alt={r.title} src={r.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-linear-to-t from-[#111111] to-transparent" />
                  <span className="absolute top-4 right-4 px-3 py-1 bg-orange-500 text-white text-xs font-bold rounded-full">{r.category}</span>
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-white group-hover:text-orange-500 transition-colors line-clamp-2 mb-3">{r.title}</h3>
                  <div className="flex items-center justify-between text-sm text-neutral-500">
                    <span className="flex items-center gap-2">
                      <img alt={r.author.name} src={r.author.avatar} className="w-6 h-6 rounded-full" />
                      {r.author.name}
                    </span>
                    <span>{r.readTime}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </article>
  )
}
