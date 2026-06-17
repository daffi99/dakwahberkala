'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { 
  checkAdminPin, 
  checkSession, 
  logoutAction, 
  createArticleAction,
  updateArticleAction,
  deleteArticleAction,
  getArticlesAction
} from './actions'

const MINT = '#DFF0ED'
const AMBER = '#FEF3C7'
const BLUSH = '#FFE4E4'
const SAGE = '#DCFCE7'
const SKY_BLUE = '#DBEAFE'
const LAVENDER = '#EDE9FE'

const DEFAULT_GRADIENTS = [
  'linear-gradient(135deg, #0B4F49 0%, #0F766E 50%, #1a8a81 100%)',
  'linear-gradient(135deg, #92400e 0%, #d97706 60%, #fbbf24 100%)',
  'linear-gradient(135deg, #7f1d1d 0%, #dc2626 60%, #f87171 100%)',
  'linear-gradient(135deg, #064e3b 0%, #059669 60%, #34d399 100%)',
  'linear-gradient(135deg, #1e3a5f 0%, #2563eb 60%, #60a5fa 100%)',
  'linear-gradient(135deg, #4c1d95 0%, #7c3aed 60%, #a78bfa 100%)',
]

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)
  const [pin, setPin] = useState('')
  const [pinError, setPinError] = useState('')

  // CRUD & Tab state
  const [activeTab, setActiveTab] = useState('write') // 'write' or 'manage'
  const [articles, setArticles] = useState([])
  const [listLoading, setListLoading] = useState(false)
  const [editingSlug, setEditingSlug] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [previewMode, setPreviewMode] = useState('card') // 'card' or 'content'
  const [deleteConfirmSlug, setDeleteConfirmSlug] = useState(null)
  const [deleteConfirmTitle, setDeleteConfirmTitle] = useState('')
  const [isImportModalOpen, setIsImportModalOpen] = useState(false)
  const [jsonInput, setJsonInput] = useState('')
  const [importError, setImportError] = useState('')

  // Form State
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('Fiqih')
  const [badge, setBadge] = useState('Khilafiyah')
  const [badgeStyle, setBadgeStyle] = useState('badge--gold')
  const [tldr, setTldr] = useState('')
  const [coverEmoji, setCoverEmoji] = useState('🌙')
  const [cardBg, setCardBg] = useState(MINT)
  const [coverGradient, setCoverGradient] = useState(DEFAULT_GRADIENTS[0])
  const [updatedAt, setUpdatedAt] = useState(() => {
    const d = new Date()
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Ags', 'Sep', 'Okt', 'Nov', 'Des']
    return `${months[d.getMonth()]} ${d.getFullYear()}`
  })

  // List arrays
  const [kesimpulan, setKesimpulan] = useState([''])
  const [pendapat, setPendapat] = useState([{ bar: 'khilaf', school: '', view: '', detail: '' }])
  const [dalil, setDalil] = useState([{ label: '', arabic: '', source: '', terjemahan: '' }])
  const [sikapPraktis, setSikapPraktis] = useState([''])
  const [sumber, setSumber] = useState([{ title: '', author: '' }])

  const [formSubmitLoading, setFormSubmitLoading] = useState(false)
  const [formError, setFormError] = useState('')
  const [formSuccess, setFormSuccess] = useState('')

  useEffect(() => {
    document.body.classList.add('admin-body')
    async function initSession() {
      const isAuth = await checkSession()
      setIsAuthenticated(isAuth)
      setLoading(false)
      if (isAuth) {
        loadArticles()
      }
    }
    initSession()
    return () => {
      document.body.classList.remove('admin-body')
    }
  }, [])

  // Auto set gradient and badgeStyle based on input matches to keep things sleek
  useEffect(() => {
    if (category === 'Fiqih' || badge === 'Khilafiyah') {
      setCardBg(MINT)
      setCoverEmoji('🌙')
      setCoverGradient(DEFAULT_GRADIENTS[0])
      setBadgeStyle('badge--gold')
    } else if (category === 'Shalat' || badge === 'Sunnah') {
      setCardBg(AMBER)
      setCoverEmoji('☀️')
      setCoverGradient(DEFAULT_GRADIENTS[1])
      setBadgeStyle('badge--blue')
    } else if (badge === 'Wajib') {
      setCardBg(SAGE)
      setCoverEmoji('💰')
      setCoverGradient(DEFAULT_GRADIENTS[3])
      setBadgeStyle('badge--green')
    } else if (badge === 'Kontroversial' || badgeStyle === 'badge--red') {
      setCardBg(BLUSH)
      setCoverEmoji('💳')
      setCoverGradient(DEFAULT_GRADIENTS[2])
      setBadgeStyle('badge--red')
    }
  }, [category, badge])

  const loadArticles = async () => {
    setListLoading(true)
    const res = await getArticlesAction()
    setListLoading(false)
    if (res.success) {
      setArticles(res.articles)
    }
  }

  const handlePinSubmit = async (e) => {
    e?.preventDefault()
    setPinError('')
    if (pin.length !== 4) {
      setPinError('PIN harus berupa 4 angka.')
      return
    }

    const res = await checkAdminPin(pin)
    if (res.success) {
      setIsAuthenticated(true)
      setPin('')
      loadArticles()
    } else {
      setPinError(res.error)
      setPin('')
    }
  }

  const handleNumberClick = (num) => {
    if (pin.length < 4) {
      setPin((prev) => prev + num)
    }
  }

  const handlePinClear = () => {
    setPin('')
  }

  const handleLogout = async () => {
    await logoutAction()
    setIsAuthenticated(false)
  }

  // Helpers for lists
  const handleAddKesimpulan = () => setKesimpulan([...kesimpulan, ''])
  const handleRemoveKesimpulan = (index) => {
    if (kesimpulan.length > 1) {
      setKesimpulan(kesimpulan.filter((_, i) => i !== index))
    }
  }
  const handleKesimpulanChange = (index, value) => {
    const updated = [...kesimpulan]
    updated[index] = value
    setKesimpulan(updated)
  }

  const handleAddPendapat = () => setPendapat([...pendapat, { bar: 'khilaf', school: '', view: '', detail: '' }])
  const handleRemovePendapat = (index) => {
    if (pendapat.length > 1) {
      setPendapat(pendapat.filter((_, i) => i !== index))
    }
  }
  const handlePendapatChange = (index, field, value) => {
    const updated = [...pendapat]
    updated[index][field] = value
    setPendapat(updated)
  }

  const handleAddDalil = () => setDalil([...dalil, { label: '', arabic: '', source: '', terjemahan: '' }])
  const handleRemoveDalil = (index) => {
    if (dalil.length > 1) {
      setDalil(dalil.filter((_, i) => i !== index))
    }
  }
  const handleDalilChange = (index, field, value) => {
    const updated = [...dalil]
    updated[index][field] = value
    setDalil(updated)
  }

  const handleAddSikapPraktis = () => setSikapPraktis([...sikapPraktis, ''])
  const handleRemoveSikapPraktis = (index) => {
    if (sikapPraktis.length > 1) {
      setSikapPraktis(sikapPraktis.filter((_, i) => i !== index))
    }
  }
  const handleSikapPraktisChange = (index, value) => {
    const updated = [...sikapPraktis]
    updated[index] = value
    setSikapPraktis(updated)
  }

  const handleAddSumber = () => setSumber([...sumber, { title: '', author: '' }])
  const handleRemoveSumber = (index) => {
    if (sumber.length > 1) {
      setSumber(sumber.filter((_, i) => i !== index))
    }
  }
  const handleSumberChange = (index, field, value) => {
    const updated = [...sumber]
    updated[index][field] = value
    setSumber(updated)
  }

  const handleSelectArticle = (art) => {
    setEditingSlug(art.slug)
    setTitle(art.title)
    setCategory(art.category)
    setBadge(art.badge)
    setBadgeStyle(art.badgeStyle || 'badge--gold')
    setTldr(art.tldr)
    setCoverEmoji(art.coverEmoji || '🌙')
    setCardBg(art.cardBg)
    setCoverGradient(art.coverGradient || DEFAULT_GRADIENTS[0])
    setUpdatedAt(art.updatedAt)
    setKesimpulan(Array.isArray(art.kesimpulan) && art.kesimpulan.length > 0 ? art.kesimpulan : [''])
    setPendapat(Array.isArray(art.pendapat) && art.pendapat.length > 0 ? art.pendapat.map(p => ({ ...p })) : [{ bar: 'khilaf', school: '', view: '', detail: '' }])
    setDalil(Array.isArray(art.dalil) && art.dalil.length > 0 ? art.dalil.map(d => ({ ...d })) : [{ label: '', arabic: '', source: '', terjemahan: '' }])
    setSikapPraktis(Array.isArray(art.sikapPraktis) && art.sikapPraktis.length > 0 ? art.sikapPraktis : [''])
    setSumber(Array.isArray(art.sumber) && art.sumber.length > 0 ? art.sumber.map(s => ({ ...s })) : [{ title: '', author: '' }])
    
    setFormError('')
    setFormSuccess('')
    setActiveTab('write')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleResetForm = () => {
    setEditingSlug(null)
    setTitle('')
    setCategory('Fiqih')
    setBadge('Khilafiyah')
    setBadgeStyle('badge--gold')
    setTldr('')
    setCoverEmoji('🌙')
    setCardBg(MINT)
    setCoverGradient(DEFAULT_GRADIENTS[0])
    const d = new Date()
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Ags', 'Sep', 'Okt', 'Nov', 'Des']
    setUpdatedAt(`${months[d.getMonth()]} ${d.getFullYear()}`)
    setKesimpulan([''])
    setPendapat([{ bar: 'khilaf', school: '', view: '', detail: '' }])
    setDalil([{ label: '', arabic: '', source: '', terjemahan: '' }])
    setSikapPraktis([''])
    setSumber([{ title: '', author: '' }])
    setFormError('')
    setFormSuccess('')
  }

  const handleImportJson = () => {
    setImportError('')
    try {
      if (!jsonInput.trim()) {
        throw new Error('Kolom JSON tidak boleh kosong.')
      }
      
      const data = JSON.parse(jsonInput)
      if (!data.title) {
        throw new Error("Objek JSON tidak memiliki properti wajib 'title'.")
      }

      setTitle(data.title || '')
      setCategory(data.category || 'Fiqih')
      setBadge(data.badge || 'Khilafiyah')
      setBadgeStyle(data.badgeStyle || 'badge--gold')
      setTldr(data.tldr || '')
      setCoverEmoji(data.coverEmoji || '🌙')
      setCardBg(data.cardBg || MINT)
      setCoverGradient(data.coverGradient || DEFAULT_GRADIENTS[0])
      setUpdatedAt(data.updatedAt || updatedAt)
      
      setKesimpulan(Array.isArray(data.kesimpulan) && data.kesimpulan.length > 0 ? data.kesimpulan : [''])
      setPendapat(Array.isArray(data.pendapat) && data.pendapat.length > 0 ? data.pendapat.map(p => ({ ...p })) : [{ bar: 'khilaf', school: '', view: '', detail: '' }])
      setDalil(Array.isArray(data.dalil) && data.dalil.length > 0 ? data.dalil.map(d => ({ ...d })) : [{ label: '', arabic: '', source: '', terjemahan: '' }])
      setSikapPraktis(Array.isArray(data.sikapPraktis) && data.sikapPraktis.length > 0 ? data.sikapPraktis : [''])
      setSumber(Array.isArray(data.sumber) && data.sumber.length > 0 ? data.sumber.map(s => ({ ...s })) : [{ title: '', author: '' }])

      setFormError('')
      setFormSuccess('JSON berhasil diimpor! Silakan tinjau form dan klik Publikasikan.')
      setIsImportModalOpen(false)
      setJsonInput('')
    } catch (err) {
      setImportError('Gagal mengurai JSON: ' + err.message)
    }
  }

  const handleDeleteArticle = (slug, articleTitle) => {
    setDeleteConfirmSlug(slug)
    setDeleteConfirmTitle(articleTitle)
  }

  const handleConfirmDelete = async () => {
    if (!deleteConfirmSlug) return
    const slug = deleteConfirmSlug
    const title = deleteConfirmTitle
    
    setDeleteConfirmSlug(null)
    setDeleteConfirmTitle('')
    
    setFormSubmitLoading(true)
    setFormError('')
    setFormSuccess('')
    
    const res = await deleteArticleAction(slug)
    setFormSubmitLoading(false)
    
    if (res.success) {
      setFormSuccess(`Catatan "${title}" berhasil dihapus.`)
      if (editingSlug === slug) {
        handleResetForm()
      }
      loadArticles()
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      setFormError(res.error)
    }
  }

  const handleSubmitForm = async (e) => {
    e.preventDefault()
    setFormError('')
    setFormSuccess('')

    // Basic Validations
    if (!title.trim()) return setFormError('Judul wajib diisi.')
    if (!tldr.trim()) return setFormError('TLDR wajib diisi.')

    const cleanedKesimpulan = kesimpulan.filter((k) => k.trim() !== '')
    const cleanedPendapat = pendapat.filter((p) => p.school.trim() !== '')
    const cleanedDalil = dalil.filter((d) => d.arabic.trim() !== '')
    const cleanedSikapPraktis = sikapPraktis.filter((s) => s.trim() !== '')
    const cleanedSumber = sumber.filter((s) => s.title.trim() !== '')

    if (cleanedKesimpulan.length === 0) {
      return setFormError('Harap isi minimal 1 Poin Kesimpulan Cepat.')
    }

    setFormSubmitLoading(true)

    const payload = {
      title,
      category,
      badge,
      badgeStyle,
      tldr,
      coverGradient,
      coverEmoji,
      cardBg,
      sources: cleanedSumber.length,
      updatedAt,
      kesimpulan: cleanedKesimpulan,
      pendapat: cleanedPendapat,
      dalil: cleanedDalil,
      sikapPraktis: cleanedSikapPraktis,
      sumber: cleanedSumber,
    }

    let res
    if (editingSlug) {
      res = await updateArticleAction(editingSlug, payload)
    } else {
      res = await createArticleAction(payload)
    }
    
    setFormSubmitLoading(false)

    if (res.success) {
      setFormSuccess(editingSlug ? 'Catatan berhasil diperbarui!' : 'Catatan berhasil dipublikasikan!')
      handleResetForm()
      loadArticles()
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      setFormError(res.error)
    }
  }

  const filteredArticles = articles.filter(art => 
    art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    art.category.toLowerCase().includes(searchQuery.toLowerCase())
  )

  if (loading) {
    return (
      <div className="admin-loading">
        <div className="spinner"></div>
        <p>Memuat sesi...</p>
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className="lock-screen-wrapper">
        <div className="lock-screen-card">
          <div className="lock-screen-header">
            <span className="lock-icon">🔒</span>
            <h2>Masukkan PIN</h2>
            <p>Akses khusus penulis untuk membuat catatan</p>
          </div>
          <form onSubmit={handlePinSubmit}>
            <div className="pin-dots">
              <span className={`dot ${pin.length >= 1 ? 'dot--active' : ''}`} />
              <span className={`dot ${pin.length >= 2 ? 'dot--active' : ''}`} />
              <span className={`dot ${pin.length >= 3 ? 'dot--active' : ''}`} />
              <span className={`dot ${pin.length >= 4 ? 'dot--active' : ''}`} />
            </div>

            {pinError && <p className="pin-error-msg">{pinError}</p>}

            <div className="pin-grid">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
                <button
                  type="button"
                  key={n}
                  className="pin-btn"
                  onClick={() => handleNumberClick(n)}
                >
                  {n}
                </button>
              ))}
              <button type="button" className="pin-btn pin-btn--clear" onClick={handlePinClear}>
                C
              </button>
              <button
                type="button"
                className="pin-btn"
                onClick={() => handleNumberClick(0)}
              >
                0
              </button>
              <button type="submit" className="pin-btn pin-btn--submit">
                ✓
              </button>
            </div>
          </form>
          <div className="lock-screen-footer">
            <Link href="/" className="back-link">
              Kembali ke Beranda
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="admin-container">
      <header className="admin-header">
        <div>
          <h1>Dashboard Penulis</h1>
          <p>Kelola dan publikasikan catatan fiqih terstruktur</p>
        </div>
        <div className="admin-header__actions">
          <button onClick={handleLogout} className="admin-btn-logout">
            Keluar
          </button>
          <Link href="/" className="admin-btn-home">
            Beranda
          </Link>
        </div>
      </header>

      {/* TABS FOR CRUD */}
      <div className="admin-tabs" style={{
        display: 'flex',
        borderBottom: '1px solid var(--border)',
        marginBottom: '24px',
        gap: '20px'
      }}>
        <button
          onClick={() => setActiveTab('write')}
          style={{
            padding: '12px 4px',
            background: 'none',
            border: 'none',
            borderBottom: activeTab === 'write' ? '3px solid var(--primary)' : '3px solid transparent',
            color: activeTab === 'write' ? 'var(--primary)' : 'var(--muted)',
            fontWeight: 700,
            fontSize: '15px',
            cursor: 'pointer',
            fontFamily: 'var(--font-main)'
          }}
        >
          {editingSlug ? '📝 Edit Catatan' : '✍️ Tulis Catatan Baru'}
        </button>
        <button
          onClick={() => setActiveTab('manage')}
          style={{
            padding: '12px 4px',
            background: 'none',
            border: 'none',
            borderBottom: activeTab === 'manage' ? '3px solid var(--primary)' : '3px solid transparent',
            color: activeTab === 'manage' ? 'var(--primary)' : 'var(--muted)',
            fontWeight: 700,
            fontSize: '15px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontFamily: 'var(--font-main)'
          }}
        >
          📚 Kelola Catatan
          <span style={{
            fontSize: '11px',
            background: 'var(--soft-green)',
            color: 'var(--primary)',
            padding: '2px 6px',
            borderRadius: '10px',
            fontWeight: 600
          }}>
            {articles.length}
          </span>
        </button>
      </div>

      {formSuccess && (
        <div className="form-alert form-alert--success">
          <span>🎉 {formSuccess}</span>
          <Link href="/" style={{ color: 'inherit', fontWeight: 'bold', marginLeft: 8 }}>
            Lihat Feed →
          </Link>
        </div>
      )}

      {formError && (
        <div className="form-alert form-alert--danger">
          <span>⚠️ {formError}</span>
        </div>
      )}

      {activeTab === 'write' ? (
        <div className="admin-grid-layout">
          {/* FORM */}
          <form onSubmit={handleSubmitForm} className="admin-form">
            {editingSlug ? (
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
                marginBottom: '12px',
                borderBottom: '1px solid var(--border)',
                paddingBottom: '12px'
              }}>
                <span style={{ color: '#b45309', background: '#fef3c7', padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 600 }}>
                  ⚠️ Sedang mengedit catatan
                </span>
                <button type="button" onClick={handleResetForm} style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--muted)',
                  fontWeight: 600,
                  fontSize: '13px',
                  cursor: 'pointer',
                  textDecoration: 'underline',
                  fontFamily: 'var(--font-main)'
                }}>
                  Batal / Tulis Baru
                </button>
              </div>
            ) : (
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
                marginBottom: '12px',
                borderBottom: '1px solid var(--border)',
                paddingBottom: '12px'
              }}>
                <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--dark-green)' }}>
                  ✍️ Formulir Catatan Baru
                </span>
                <button type="button" onClick={() => { setIsImportModalOpen(true); setImportError(''); }} style={{
                  background: 'var(--soft-green)',
                  border: '1.5px solid var(--primary)',
                  color: 'var(--primary)',
                  padding: '6px 12px',
                  borderRadius: '8px',
                  fontSize: '12px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  fontFamily: 'var(--font-main)'
                }}>
                  📥 Impor dari ChatGPT (JSON)
                </button>
              </div>
            )}

            {/* BAGIAN UTAMA */}
            <fieldset className="form-section">
              <legend>Informasi Utama Kartu</legend>

              <div className="form-group">
                <label htmlFor="title">Judul Catatan *</label>
                <input
                  type="text"
                  id="title"
                  placeholder="Hukum Mendengarkan Musik..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="category">Kategori *</label>
                  <select id="category" value={category} onChange={(e) => setCategory(e.target.value)}>
                    <option value="Fiqih">Fiqih</option>
                    <option value="Shalat">Shalat</option>
                    <option value="Adab">Adab</option>
                    <option value="Aqidah">Aqidah</option>
                    <option value="Keluarga">Keluarga</option>
                    <option value="Puasa">Puasa</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="badge">Badge Status *</label>
                  <select id="badge" value={badge} onChange={(e) => setBadge(e.target.value)}>
                    <option value="Khilafiyah">Khilafiyah</option>
                    <option value="Sunnah">Sunnah</option>
                    <option value="Wajib">Wajib</option>
                    <option value="Kontroversial">Kontroversial</option>
                    <option value="Mubah">Mubah</option>
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="badgeStyle">Style Warna Badge</label>
                  <select
                    id="badgeStyle"
                    value={badgeStyle}
                    onChange={(e) => setBadgeStyle(e.target.value)}
                  >
                    <option value="badge--gold">Gold (Khilafiyah)</option>
                    <option value="badge--blue">Blue (Sunnah)</option>
                    <option value="badge--green">Green (Wajib)</option>
                    <option value="badge--red">Red (Kontroversial)</option>
                    <option value="badge--gray">Gray (Umum)</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="updatedAt">Diperbarui Pada *</label>
                  <input
                    type="text"
                    id="updatedAt"
                    value={updatedAt}
                    onChange={(e) => setUpdatedAt(e.target.value)}
                    placeholder="Jun 2026"
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="coverEmoji">Emoji Kartu (Emoji Cover) *</label>
                  <input
                    type="text"
                    id="coverEmoji"
                    value={coverEmoji}
                    onChange={(e) => setCoverEmoji(e.target.value)}
                    placeholder="🌙"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="cardBg">Warna Latar Belakang Kartu (HEX) *</label>
                  <select id="cardBg" value={cardBg} onChange={(e) => setCardBg(e.target.value)}>
                    <option value={MINT}>Mint (#DFF0ED - Fiqih)</option>
                    <option value={AMBER}>Amber (#FEF3C7 - Shalat/Dhuha)</option>
                    <option value={BLUSH}>Blush (#FFE4E4 - Riba/Haram)</option>
                    <option value={SAGE}>Sage (#DCFCE7 - Zakat/Wajib)</option>
                    <option value={SKY_BLUE}>Sky Blue (#DBEAFE - Adab)</option>
                    <option value={LAVENDER}>Lavender (#EDE9FE - Musik/Khilaf)</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="tldr">Ringkasan Singkat (TLDR) *</label>
                <textarea
                  id="tldr"
                  rows="4"
                  placeholder="Satu paragraf singkat sebagai kesimpulan utama yang muncul di kartu bento..."
                  value={tldr}
                  onChange={(e) => setTldr(e.target.value)}
                  maxLength={200}
                  required
                />
                <span className="field-hint">Max 200 karakter agar pas di grid.</span>
              </div>
            </fieldset>

            {/* KESIMPULAN CEPAT */}
            <fieldset className="form-section">
              <legend>⚡ Kesimpulan Cepat</legend>
              <p className="section-hint">Tulis 3-4 poin ringkasan cepat yang akan muncul di paling atas artikel detail.</p>
              {kesimpulan.map((item, idx) => (
                <div key={idx} className="array-item">
                  <span className="array-item__num">{idx + 1}</span>
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => handleKesimpulanChange(idx, e.target.value)}
                    placeholder="Poin kesimpulan cepat..."
                    required
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveKesimpulan(idx)}
                    className="btn-remove-item"
                    title="Hapus"
                  >
                    ✕
                  </button>
                </div>
              ))}
              <button type="button" onClick={handleAddKesimpulan} className="btn-add-item">
                + Tambah Poin Kesimpulan
              </button>
            </fieldset>

            {/* RINGKASAN PENDAPAT */}
            <fieldset className="form-section">
              <legend>⚖️ Ringkasan Pendapat Ulama</legend>
              <p className="section-hint">Tulis argumen/pandangan mazhab yang berbeda.</p>
              {pendapat.map((item, idx) => (
                <div key={idx} className="block-item">
                  <div className="block-item__header">
                    <span>Pendapat #{idx + 1}</span>
                    <button
                      type="button"
                      onClick={() => handleRemovePendapat(idx)}
                      className="btn-remove-item"
                    >
                      ✕ Hapus
                    </button>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Warna Bar Status</label>
                      <select
                        value={item.bar}
                        onChange={(e) => handlePendapatChange(idx, 'bar', e.target.value)}
                      >
                        <option value="khilaf">Gold (Khilafiyah)</option>
                        <option value="halal">Hijau (Membolehkan)</option>
                        <option value="haram">Merah (Melarang/Haram)</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Nama Mazhab / Kalangan</label>
                      <input
                        type="text"
                        value={item.school}
                        onChange={(e) => handlePendapatChange(idx, 'school', e.target.value)}
                        placeholder="Pendapat 1 - Mayoritas Ulama"
                        required
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Ringkasan Sikap</label>
                    <input
                      type="text"
                      value={item.view}
                      onChange={(e) => handlePendapatChange(idx, 'view', e.target.value)}
                      placeholder="Hukumnya Makruh / Tidak Diperbolehkan"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Detail Argumen</label>
                    <textarea
                      rows="3"
                      value={item.detail}
                      onChange={(e) => handlePendapatChange(idx, 'detail', e.target.value)}
                      placeholder="Penjelasan lengkap mengenai pendapat ini..."
                      required
                    />
                  </div>
                </div>
              ))}
              <button type="button" onClick={handleAddPendapat} className="btn-add-item">
                + Tambah Pendapat
              </button>
            </fieldset>

            {/* DALIL & REFERENSI */}
            <fieldset className="form-section">
              <legend>📖 Dalil &amp; Referensi</legend>
              <p className="section-hint">Tulis kutipan Al-Qur'an atau Hadits.</p>
              {dalil.map((item, idx) => (
                <div key={idx} className="block-item">
                  <div className="block-item__header">
                    <span>Dalil #{idx + 1}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveDalil(idx)}
                      className="btn-remove-item"
                    >
                      ✕ Hapus
                    </button>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Label Dalil</label>
                      <input
                        type="text"
                        value={item.label}
                        onChange={(e) => handleDalilChange(idx, 'label', e.target.value)}
                        placeholder="Hadits - Bukhari & Muslim"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Sumber / Sanad</label>
                      <input
                        type="text"
                        value={item.source}
                        onChange={(e) => handleDalilChange(idx, 'source', e.target.value)}
                        placeholder="HR. Muslim no. 2020"
                        required
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Teks Arab</label>
                    <textarea
                      rows="3"
                      className="arabic-input"
                      dir="rtl"
                      value={item.arabic}
                      onChange={(e) => handleDalilChange(idx, 'arabic', e.target.value)}
                      placeholder="مَنْ أَحْدَثَ فِي أَمْرِنَا هَذَا..."
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Terjemahan Bahasa Indonesia</label>
                    <textarea
                      rows="3"
                      value={item.terjemahan}
                      onChange={(e) => handleDalilChange(idx, 'terjemahan', e.target.value)}
                      placeholder="Barangsiapa mengada-adakan dalam urusan..."
                      required
                    />
                  </div>
                </div>
              ))}
              <button type="button" onClick={handleAddDalil} className="btn-add-item">
                + Tambah Dalil
              </button>
            </fieldset>

            {/* SIKAP PRAKTIS */}
            <fieldset className="form-section">
              <legend>🧭 Sikap Praktis yang Dianjurkan</legend>
              <p className="section-hint">Poin-poin praktis untuk penutup catatan.</p>
              {sikapPraktis.map((item, idx) => (
                <div key={idx} className="array-item">
                  <span className="array-item__num">✓</span>
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => handleSikapPraktisChange(idx, e.target.value)}
                    placeholder="Latih sikap ini dalam kehidupan sehari-hari..."
                    required
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveSikapPraktis(idx)}
                    className="btn-remove-item"
                    title="Hapus"
                  >
                    ✕
                  </button>
                </div>
              ))}
              <button type="button" onClick={handleAddSikapPraktis} className="btn-add-item">
                + Tambah Sikap Praktis
              </button>
            </fieldset>

            {/* SUMBER RUJUKAN */}
            <fieldset className="form-section">
              <legend>🔗 Sumber Rujukan</legend>
              <p className="section-hint">Artikel/buku referensi yang dibaca untuk rangkuman ini.</p>
              {sumber.map((item, idx) => (
                <div key={idx} className="block-item">
                  <div className="block-item__header">
                    <span>Rujukan #{idx + 1}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveSumber(idx)}
                      className="btn-remove-item"
                    >
                      ✕ Hapus
                    </button>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Judul Artikel / Kitab</label>
                      <input
                        type="text"
                        value={item.title}
                        onChange={(e) => handleSumberChange(idx, 'title', e.target.value)}
                        placeholder="Fatwa MUI tentang Musik"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Penulis / Media (Keterangan)</label>
                      <input
                        type="text"
                        value={item.author}
                        onChange={(e) => handleSumberChange(idx, 'author', e.target.value)}
                        placeholder="MUI Pusat · Keputusan Fatwa"
                        required
                      />
                    </div>
                  </div>
                </div>
              ))}
              <button type="button" onClick={handleAddSumber} className="btn-add-item">
                + Tambah Rujukan
              </button>
            </fieldset>

            <button type="submit" className="form-btn-submit" disabled={formSubmitLoading}>
              {formSubmitLoading ? 'Menyimpan...' : (editingSlug ? 'Simpan Perubahan' : 'Publikasikan Catatan')}
            </button>
          </form>

          {/* LIVE PREVIEW PANEL */}
          <div className="admin-preview-panel">
            <div className="admin-preview-sticky">
              <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
                <button
                  type="button"
                  onClick={() => setPreviewMode('card')}
                  style={{
                    flex: 1,
                    padding: '8px 12px',
                    borderRadius: '8px',
                    border: previewMode === 'card' ? '1.5px solid var(--primary)' : '1.5px solid var(--border)',
                    background: previewMode === 'card' ? 'var(--soft-green)' : '#fff',
                    color: previewMode === 'card' ? 'var(--primary)' : 'var(--muted)',
                    fontWeight: 600,
                    fontSize: '12px',
                    cursor: 'pointer',
                    fontFamily: 'var(--font-main)'
                  }}
                >
                  🎴 Kartu Bento
                </button>
                <button
                  type="button"
                  onClick={() => setPreviewMode('content')}
                  style={{
                    flex: 1,
                    padding: '8px 12px',
                    borderRadius: '8px',
                    border: previewMode === 'content' ? '1.5px solid var(--primary)' : '1.5px solid var(--border)',
                    background: previewMode === 'content' ? 'var(--soft-green)' : '#fff',
                    color: previewMode === 'content' ? 'var(--primary)' : 'var(--muted)',
                    fontWeight: 600,
                    fontSize: '12px',
                    cursor: 'pointer',
                    fontFamily: 'var(--font-main)'
                  }}
                >
                  📄 Isi Konten
                </button>
              </div>

              {previewMode === 'card' ? (
                <>
                  <h3>Preview Kartu Bento</h3>
                  <p className="preview-hint">Tampilan kartu kamu saat muncul di grid beranda</p>

                  <div
                    className="article-card"
                    style={{ backgroundColor: cardBg, minHeight: 'auto', pointerEvents: 'none' }}
                  >
                    <div className="article-card__top">
                      <div className="article-card__badges">
                        <span className="badge badge--dark">{category}</span>
                      </div>
                      <div className="card-arrow-btn">
                        <svg fill="none" viewBox="0 0 24 24" strokeWidth="2.5">
                          <line x1="5" y1="12" x2="19" y2="12" />
                          <polyline points="12 5 19 12 12 19" />
                        </svg>
                      </div>
                    </div>

                    <h2 className="article-card__title">{title || 'Judul Catatan Anda'}</h2>

                    <div className="article-card__meta-row">
                      <span className="article-card__sources">
                        {sumber.filter((s) => s.title.trim() !== '').length} sumber
                      </span>
                      <span className={`badge badge--sm ${badgeStyle}`}>{badge}</span>
                    </div>

                    <p className="article-card__tldr-label">TLDR</p>
                    <p className="article-card__tldr">
                      {tldr || 'Ringkasan singkat atau kesimpulan utama akan muncul di bagian ini...'}
                    </p>

                    <div className="article-card__footer">
                      <span className="article-card__date">{updatedAt}</span>
                      <span className="article-card__emoji" aria-hidden="true">
                        {coverEmoji}
                      </span>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <h3>Preview Halaman Artikel</h3>
                  <p className="preview-hint">Tampilan detail artikel ketika dibaca pembaca</p>

                  <div className="article-content" style={{ 
                    padding: '20px', 
                    background: '#fff', 
                    border: '1px solid var(--border)', 
                    borderRadius: '12px', 
                    maxHeight: '70vh', 
                    overflowY: 'auto',
                    textAlign: 'left'
                  }}>
                    {/* TITLE & BADGES */}
                    <div className="article-meta-top" style={{ marginBottom: '20px' }}>
                      <div className="article-badges" style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '8px' }}>
                        <span className="badge badge--green">{category}</span>
                        <span className={`badge ${badgeStyle}`}>{badge}</span>
                        <span className="badge badge--gray">{sumber.filter(s => s.title.trim() !== '').length} Sumber</span>
                      </div>
                      <h1 className="article-title" style={{ fontSize: '20px', fontWeight: 800, color: 'var(--dark-green)', margin: '8px 0', fontFamily: 'var(--font-main)' }}>
                        {title || 'Judul Catatan Anda'}
                      </h1>
                      <p className="article-updated" style={{ fontSize: '11px', color: 'var(--muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        Diperbarui {updatedAt}
                      </p>
                    </div>

                    {/* KESIMPULAN CEPAT */}
                    <div className="quick-summary" id="kesimpulan-cepat" style={{ marginBottom: '20px' }}>
                      <div className="quick-summary__header" style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 700, color: 'var(--dark-green)', marginBottom: '8px', fontSize: '13px' }}>
                        <span>⚡ Kesimpulan Cepat</span>
                      </div>
                      <ul className="quick-summary__list" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                        {kesimpulan.filter(k => k.trim() !== '').map((item, i) => (
                          <li key={i} className="quick-summary__item" style={{ display: 'flex', gap: '8px', marginBottom: '6px', fontSize: '13px' }}>
                            <span className="quick-summary__bullet" style={{ 
                              width: '18px', height: '18px', borderRadius: '50%', background: 'var(--soft-green)', 
                              color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', 
                              fontSize: '10px', fontWeight: 700, flexShrink: 0
                            }}>{i + 1}</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div style={{ borderBottom: '1px solid var(--border)', margin: '16px 0' }} />

                    {/* RINGKASAN PENDAPAT */}
                    <h2 className="sub-heading" style={{ fontSize: '14px', fontWeight: 700, color: 'var(--dark-green)', marginBottom: '10px' }}>
                      Ringkasan Pendapat Ulama
                    </h2>
                    <div className="opinion-list" id="ringkasan-pendapat" style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
                      {pendapat.filter(p => p.school.trim() !== '').map((p, i) => (
                        <div key={i} className="opinion-item" style={{ borderLeft: `4px solid ${p.bar === 'halal' ? '#10b981' : p.bar === 'haram' ? '#ef4444' : '#f59e0b'}`, paddingLeft: '10px' }}>
                          <div className="opinion-item__school" style={{ fontWeight: 700, fontSize: '12px', color: 'var(--text)' }}>{p.school}</div>
                          <div className="opinion-item__view" style={{ fontWeight: 600, fontSize: '12px', color: 'var(--primary)', margin: '2px 0' }}>{p.view}</div>
                          <div className="opinion-item__detail" style={{ fontSize: '12px', color: 'var(--muted)', lineHeight: 1.4 }}>{p.detail}</div>
                        </div>
                      ))}
                    </div>

                    <div style={{ borderBottom: '1px solid var(--border)', margin: '16px 0' }} />

                    {/* DALIL & REFERENSI */}
                    <h2 className="sub-heading" style={{ fontSize: '14px', fontWeight: 700, color: 'var(--dark-green)', marginBottom: '10px' }}>
                      Dalil &amp; Referensi
                    </h2>
                    {dalil.filter(d => d.arabic.trim() !== '').map((d, i) => (
                      <div key={i} style={{ marginBottom: '16px' }}>
                        <div className="arabic-card" style={{ background: '#faf9f6', padding: '12px', borderRadius: '8px', border: '1px solid var(--border)', marginBottom: '6px' }}>
                          <div className="arabic-card__label" style={{ fontSize: '11px', color: 'var(--muted)', fontWeight: 600, marginBottom: '6px' }}>{d.label}</div>
                          <div className="arabic-card__text" lang="ar" dir="rtl" style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text)', textAlign: 'right', margin: '8px 0', fontFamily: 'var(--font-arabic)' }}>
                            {d.arabic}
                          </div>
                          <div className="arabic-card__source" style={{ fontSize: '11px', color: 'var(--muted)', textAlign: 'left' }}>{d.source}</div>
                        </div>
                        <div className="translation-box" style={{ background: '#f8fafc', padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '12px' }}>
                          <div className="translation-box__label" style={{ fontWeight: 600, color: 'var(--muted)', marginBottom: '2px' }}>🌐 Terjemahan</div>
                          <div className="translation-box__text" style={{ fontStyle: 'italic', color: 'var(--text)' }}>{d.terjemahan}</div>
                        </div>
                      </div>
                    ))}

                    <div style={{ borderBottom: '1px solid var(--border)', margin: '16px 0' }} />

                    {/* SIKAP PRAKTIS */}
                    <div className="practical-box" id="sikap-praktis" style={{ background: '#ecfdf5', padding: '12px', borderRadius: '10px', border: '1.5px dashed var(--primary)', marginBottom: '20px' }}>
                      <div className="practical-box__header" style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 700, color: 'var(--primary)', marginBottom: '8px', fontSize: '13px' }}>
                        <span>🧭 Sikap Praktis</span>
                      </div>
                      <ul className="practical-list" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                        {sikapPraktis.filter(s => s.trim() !== '').map((item, i) => (
                          <li key={i} className="practical-list__item" style={{ display: 'flex', gap: '8px', marginBottom: '6px', fontSize: '12px' }}>
                            <span style={{ color: 'var(--primary)', fontWeight: 'bold' }}>✓</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* SUMBER RUJUKAN */}
                    <h2 className="sub-heading" style={{ fontSize: '14px', fontWeight: 700, color: 'var(--dark-green)', marginBottom: '10px' }}>
                      Sumber Rujukan
                    </h2>
                    <div className="sources-list" id="sumber-rujukan" style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      {sumber.filter(s => s.title.trim() !== '').map((src, i) => (
                        <div key={i} className="source-item" style={{ display: 'flex', gap: '8px', fontSize: '12px', borderBottom: '1px solid #f1f5f9', paddingBottom: '4px' }}>
                          <div className="source-item__num" style={{ fontWeight: 'bold', color: 'var(--primary)' }}>{i + 1}</div>
                          <div>
                            <div className="source-item__title" style={{ fontWeight: 600 }}>{src.title}</div>
                            <div className="source-item__author" style={{ color: 'var(--muted)', fontSize: '11px' }}>{src.author}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: '12px', padding: '24px' }}>
          {/* SEARCH BAR */}
          <div style={{ marginBottom: '20px' }}>
            <input
              type="text"
              placeholder="Cari catatan berdasarkan judul atau kategori..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '8px',
                border: '1.5px solid var(--border)',
                fontFamily: 'var(--font-main)',
                fontSize: '14px',
                outline: 'none',
                background: '#fff'
              }}
            />
          </div>

          {listLoading ? (
            <div style={{ textAlign: 'center', padding: '40px 0' }}>
              <div className="spinner" style={{ margin: '0 auto 12px' }}></div>
              <p style={{ color: 'var(--muted)' }}>Memuat daftar catatan...</p>
            </div>
          ) : filteredArticles.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px 0', border: '2px dashed var(--border)', borderRadius: '12px' }}>
              <p style={{ color: 'var(--muted)', fontSize: '15px' }}>
                {searchQuery ? 'Tidak ada catatan yang cocok dengan pencarian Anda.' : 'Belum ada catatan yang diterbitkan.'}
              </p>
              {!searchQuery && (
                <button onClick={() => setActiveTab('write')} className="btn-add-item" style={{ marginTop: '12px' }}>
                  Mulai Tulis Sekarang
                </button>
              )}
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '12px' }}>
              {filteredArticles.map((art) => (
                <div 
                  key={art.slug} 
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '16px',
                    background: '#fff',
                    border: '1px solid var(--border)',
                    borderRadius: '12px',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <span style={{ fontSize: '28px' }}>{art.coverEmoji || '🌙'}</span>
                    <div>
                      <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: 'var(--dark-green)' }}>
                        {art.title}
                      </h3>
                      <div style={{ display: 'flex', gap: '8px', marginTop: '6px', alignItems: 'center', flexWrap: 'wrap' }}>
                        <span className="badge badge--green" style={{ fontSize: '11px', padding: '2px 6px' }}>
                          {art.category}
                        </span>
                        <span className={`badge ${art.badgeStyle || 'badge--gray'}`} style={{ fontSize: '11px', padding: '2px 6px' }}>
                          {art.badge}
                        </span>
                        <span style={{ fontSize: '12px', color: 'var(--muted)' }}>
                          Diperbarui {art.updatedAt}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button
                      onClick={() => handleSelectArticle(art)}
                      style={{
                        padding: '8px 14px',
                        border: '1.5px solid var(--primary)',
                        borderRadius: '8px',
                        background: 'transparent',
                        color: 'var(--primary)',
                        fontWeight: 600,
                        fontSize: '13px',
                        cursor: 'pointer',
                        fontFamily: 'var(--font-main)'
                      }}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteArticle(art.slug, art.title)}
                      style={{
                        padding: '8px 14px',
                        border: '1.5px solid #dc2626',
                        borderRadius: '8px',
                        background: 'transparent',
                        color: '#dc2626',
                        fontWeight: 600,
                        fontSize: '13px',
                        cursor: 'pointer',
                        fontFamily: 'var(--font-main)'
                      }}
                    >
                      Hapus
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* CUSTOM DELETE CONFIRMATION MODAL */}
      {deleteConfirmSlug && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'rgba(15, 23, 42, 0.6)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
          animation: 'fadeIn 0.2s ease-out'
        }}>
          <div style={{
            background: '#fff',
            padding: '28px',
            borderRadius: '16px',
            maxWidth: '440px',
            width: '90%',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
            textAlign: 'center',
            border: '1px solid var(--border)'
          }}>
            <div style={{
              width: '56px',
              height: '56px',
              background: '#fef2f2',
              color: '#ef4444',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '24px',
              margin: '0 auto 16px'
            }}>
              ⚠️
            </div>
            <h3 style={{
              fontSize: '18px',
              fontWeight: 700,
              color: 'var(--dark-green)',
              marginBottom: '8px',
              fontFamily: 'var(--font-main)'
            }}>
              Hapus Catatan?
            </h3>
            <p style={{
              fontSize: '14px',
              color: 'var(--muted)',
              lineHeight: 1.5,
              marginBottom: '24px',
              fontFamily: 'var(--font-main)'
            }}>
              Apakah Anda yakin ingin menghapus catatan <strong>"{deleteConfirmTitle}"</strong>? Tindakan ini tidak dapat dibatalkan.
            </p>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                type="button"
                onClick={() => {
                  setDeleteConfirmSlug(null)
                  setDeleteConfirmTitle('')
                }}
                style={{
                  flex: 1,
                  padding: '12px',
                  borderRadius: '8px',
                  border: '1.5px solid var(--border)',
                  background: 'transparent',
                  color: 'var(--muted)',
                  fontWeight: 600,
                  fontSize: '14px',
                  cursor: 'pointer',
                  fontFamily: 'var(--font-main)'
                }}
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                style={{
                  flex: 1,
                  padding: '12px',
                  borderRadius: '8px',
                  border: 'none',
                  background: '#dc2626',
                  color: '#fff',
                  fontWeight: 600,
                  fontSize: '14px',
                  cursor: 'pointer',
                  fontFamily: 'var(--font-main)',
                  boxShadow: '0 4px 6px -1px rgba(220, 38, 38, 0.2)'
                }}
              >
                Ya, Hapus
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CUSTOM IMPORT JSON MODAL */}
      {isImportModalOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'rgba(15, 23, 42, 0.6)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
          animation: 'fadeIn 0.2s ease-out'
        }}>
          <div style={{
            background: '#fff',
            padding: '28px',
            borderRadius: '16px',
            maxWidth: '600px',
            width: '90%',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
            border: '1px solid var(--border)'
          }}>
            <h3 style={{
              fontSize: '18px',
              fontWeight: 700,
              color: 'var(--dark-green)',
              marginBottom: '8px',
              fontFamily: 'var(--font-main)'
            }}>
              📥 Impor Catatan dari JSON
            </h3>
            <p style={{
              fontSize: '13px',
              color: 'var(--muted)',
              lineHeight: 1.5,
              marginBottom: '16px',
              fontFamily: 'var(--font-main)'
            }}>
              Tempelkan teks JSON yang dihasilkan oleh ChatGPT/Claude ke kolom di bawah ini. Sistem akan otomatis mengisi seluruh formulir.
            </p>

            {importError && (
              <p style={{
                fontSize: '12px',
                color: '#dc2626',
                background: '#fef2f2',
                padding: '10px',
                borderRadius: '8px',
                marginBottom: '12px',
                fontWeight: 600,
                fontFamily: 'var(--font-main)'
              }}>
                ⚠️ {importError}
              </p>
            )}

            <textarea
              rows="12"
              placeholder='Tempelkan JSON di sini...'
              value={jsonInput}
              onChange={(e) => setJsonInput(e.target.value)}
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '8px',
                border: '1.5px solid var(--border)',
                fontFamily: 'monospace',
                fontSize: '12px',
                outline: 'none',
                background: '#fafafa',
                marginBottom: '16px',
                resize: 'vertical'
              }}
            />

            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                type="button"
                onClick={() => {
                  setIsImportModalOpen(false)
                  setJsonInput('')
                  setImportError('')
                }}
                style={{
                  flex: 1,
                  padding: '12px',
                  borderRadius: '8px',
                  border: '1.5px solid var(--border)',
                  background: 'transparent',
                  color: 'var(--muted)',
                  fontWeight: 600,
                  fontSize: '14px',
                  cursor: 'pointer',
                  fontFamily: 'var(--font-main)'
                }}
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleImportJson}
                style={{
                  flex: 1,
                  padding: '12px',
                  borderRadius: '8px',
                  border: 'none',
                  background: 'var(--primary)',
                  color: '#fff',
                  fontWeight: 600,
                  fontSize: '14px',
                  cursor: 'pointer',
                  fontFamily: 'var(--font-main)',
                  boxShadow: '0 4px 6px -1px rgba(15, 118, 110, 0.2)'
                }}
              >
                Impor Sekarang
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
