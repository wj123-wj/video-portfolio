import { useEffect, useRef, useState } from 'react'
import { works, profile, stats, experience, education } from './works.js'

const CATEGORIES = ['全部', ...new Set(works.map((w) => w.category))]

/* 背景：缓慢漂移的柔光色块 + 全局颗粒（颗粒在 styles.css 的 body::after） */
function AuroraBg() {
  return (
    <div className="aurora" aria-hidden="true">
      <span className="aurora__blob aurora__blob--red" />
      <span className="aurora__blob aurora__blob--blue" />
      <span className="aurora__blob aurora__blob--amber" />
    </div>
  )
}

/* 全页竖向细线网格 */
function GridLines() {
  return (
    <div className="gridlines" aria-hidden="true">
      {Array.from({ length: 7 }).map((_, i) => (
        <span key={i} />
      ))}
    </div>
  )
}

function Nav() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return (
    <nav className={`nav ${scrolled ? 'nav--scrolled' : ''}`}>
      <a className="nav__logo" href="#top">
        <strong>{profile.name}</strong>
        <span>AIGC FILM WORKS</span>
      </a>
      <div className="nav__pills">
        <a className="pill" href="#works">作品</a>
        <a className="pill" href="#about">关于</a>
        <a className="pill pill--accent" href="#contact">联系</a>
      </div>
    </nav>
  )
}

/* 顶部悬挂标签，仿参考图的 SHOP 挂签 */
function HangTab() {
  return (
    <a className="hangtab" href="#works">
      SHOWREEL
    </a>
  )
}

function Hero() {
  return (
    <header className="hero" id="top">
      <HangTab />
      <div className="hero__meta">
        <p>WU WENJIAN</p>
        <p>AI FILM EDITOR</p>
        <p>AIGC DIRECTOR</p>
        <p>BASED IN FOSHAN, CN</p>
      </div>
      <img className="hero__img hero__img--a" src={works[0].poster} alt={works[0].title} />
      <img className="hero__img hero__img--b" src="posters-duo/hero-b.jpg" alt="999 AIGC 短片" />
      <img className="hero__img hero__img--c" src={works[1].poster} alt={works[1].title} />
      <h1 className="hero__giant" aria-label="影像作品集">
        <span className="hero__giant-cn">影像</span>
        <span className="hero__giant-en">AIGC&nbsp;WORKS</span>
      </h1>
      <p className="hero__sub">{profile.title}</p>
    </header>
  )
}

/* 跑马灯技能条 */
function Marquee() {
  const items = ['AI 剪辑 AI EDITING', '分镜 STORYBOARD', 'AIGC 生成 GENERATIVE', '调色 GRADING', '手绘 ILLUSTRATION', '账号运营 IP OPERATION']
  const row = [...items, ...items]
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee__track">
        {row.map((t, i) => (
          <span key={i}>{t}<em>✳</em></span>
        ))}
      </div>
    </div>
  )
}

/* 数据亮点 */
function Stats() {
  return (
    <section className="stats" aria-label="数据亮点">
      {stats.map((s) => (
        <div className="stats__item" key={s.label}>
          <strong className="stats__value">{s.value}</strong>
          <span className="stats__label">{s.label}</span>
        </div>
      ))}
      <p className="stats__note">* 数据为任职广州心趣文化用品有限公司期间（2023—2026 年 1 月）主导项目成绩，含小红书、抖音等平台运营数据。</p>
    </section>
  )
}

function WorkCard({ work, onOpen, index }) {
  /* 光环跟随鼠标：把光标位置写成 CSS 变量，供描边渐变使用 */
  const trackGlow = (e) => {
    const media = e.currentTarget.querySelector('.card__media')
    if (!media) return
    const r = media.getBoundingClientRect()
    media.style.setProperty('--mx', `${e.clientX - r.left}px`)
    media.style.setProperty('--my', `${e.clientY - r.top}px`)
  }
  return (
    <article className={`card card--v${work.layout || (index % 3) + 1}${work.posTop ? ' card--top' : ''}`} onClick={() => onOpen(work)} onMouseMove={trackGlow}>
      <div className="card__media">
        <img src={work.poster} alt={work.title} loading="lazy" />
        <span className="card__duration">{work.duration}</span>
        <span className="card__play">▶</span>
      </div>
      <div className="card__body">
        <div className="card__meta">
          <span className="card__no">{String(index + 1).padStart(2, '0')}</span>
          <span>{work.category}</span>
          <span>{work.year}</span>
        </div>
        <h3 className="card__title">{work.title}</h3>
        <p className="card__role">{work.role}</p>
      </div>
    </article>
  )
}

function Works({ onOpen }) {
  const [filter, setFilter] = useState('全部')
  const list = filter === '全部' ? works : works.filter((w) => w.category === filter)
  return (
    <section className="section" id="works">
      <div className="section__head">
        <h2 className="section__title">
          精选作品
          <span className="section__title-en">SELECTED&nbsp;WORKS&nbsp;({String(list.length).padStart(2, '0')})</span>
        </h2>
        <div className="filters">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              className={`filter ${filter === c ? 'filter--active' : ''}`}
              onClick={() => setFilter(c)}
            >
              {c}
            </button>
          ))}
        </div>
      </div>
      <div className="grid">
        {list.map((w, i) => (
          <WorkCard key={w.id} work={w} index={i} onOpen={onOpen} />
        ))}
      </div>
    </section>
  )
}

/* 工作经历时间线 */
function Experience() {
  return (
    <section className="section" id="experience">
      <h2 className="section__title">
        工作经历
        <span className="section__title-en">EXPERIENCE</span>
      </h2>
      <ul className="timeline">
        {experience.map((e) => (
          <li className="timeline__item" key={e.company}>
            <span className="timeline__period">{e.period}</span>
            <div className="timeline__main">
              <h3>{e.company}<span className="timeline__role">{e.role}</span></h3>
              <ul className="timeline__points">
                {(e.points || [e.desc]).map((pt, i) => <li key={i}>{pt}</li>)}
              </ul>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}

function About() {
  return (
    <section className="section about" id="about">
      <h2 className="section__title">
        关于我
        <span className="section__title-en">ABOUT</span>
      </h2>
      <div className="about__grid">
        <div className="about__photo">
          <img src="posters-duo/avatar.jpg" alt={profile.name} />
        </div>
        <div className="about__text">
          <p className="about__bio">{profile.bio}</p>
          <div className="about__group">
            <h4>擅长</h4>
            <div className="tags">
              {profile.skills.map((s) => (
                <span key={s} className="tag">{s}</span>
              ))}
            </div>
          </div>
          <div className="about__group">
            <h4>工具</h4>
            <div className="tags">
              {profile.tools.map((t) => (
                <span key={t} className="tag tag--dim">{t}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* 教育背景 */}
      <div className="edu">
        {education.map((e) => (
          <div className="edu__item" key={e.school}>
            <span className="edu__period">{e.period}</span>
            <strong className="edu__school">{e.school}</strong>
            <span className="edu__degree">{e.degree}</span>
          </div>
        ))}
      </div>
      <ul className="awards">
        {profile.awards.map((a, i) => (
          <li key={a}>
            <span className="awards__no">{String(i + 1).padStart(2, '0')}</span>
            <span className="awards__name">{a}</span>
            <span className="awards__mark">✳</span>
          </li>
        ))}
      </ul>
    </section>
  )
}

function Contact() {
  return (
    <section className="section contact" id="contact">
      <p className="contact__kicker">( PORTFOLIO )</p>
      <h2 className="contact__giant">更多作品<br />持续更新。</h2>
      <a className="contact__mail" href={`mailto:${profile.email}`}>{profile.email}</a>
      <p className="contact__wechat">微信 · {profile.wechat}　/　电话 · {profile.phone}</p>
    </section>
  )
}

function Lightbox({ work, onClose }) {
  const videoRef = useRef(null)
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  if (!work) return null
  return (
    <div className="lightbox" onClick={onClose}>
      <div className="lightbox__panel" onClick={(e) => e.stopPropagation()}>
        <button className="lightbox__close" onClick={onClose} aria-label="关闭">✕</button>
        <div className="lightbox__media">
          {work.videoUrl ? (
            <video key={work.id} ref={videoRef} src={work.videoUrl} poster={work.poster} controls autoPlay />
          ) : (
            <div className="lightbox__placeholder">
              <img src={work.poster} alt={work.title} />
              <p>在 works.js 里填入 videoUrl，这里就能直接播放正片</p>
            </div>
          )}
        </div>
        <div className="lightbox__info">
          <div className="card__meta">
            <span className="card__no">{String(work.id).padStart(2, '0')}</span>
            <span>{work.category}</span>
            <span>{work.year} · {work.duration}</span>
          </div>
          <h3>{work.title}</h3>
          <dl className="lightbox__facts">
            <div><dt>客户</dt><dd>{work.client}</dd></div>
            <div><dt>职责</dt><dd>{work.role}</dd></div>
          </dl>
          <p className="lightbox__desc">{work.description}</p>
        </div>
      </div>
    </div>
  )
}

export default function App() {
  const [active, setActive] = useState(null)
  return (
    <>
      <AuroraBg />
      <GridLines />
      <Nav />
      <Hero />
      <Marquee />
      <main>
        <Stats />
        <Works onOpen={setActive} />
        <Experience />
        <About />
        <Contact />
      </main>
      <footer className="footer">
        <span>© 2026 {profile.name}</span>
        <span>AIGC WORKS · {profile.location}</span>
        <span>DESIGNED &amp; SHOT BY {profile.name}</span>
      </footer>
      {active && <Lightbox work={active} onClose={() => setActive(null)} />}
    </>
  )
}
