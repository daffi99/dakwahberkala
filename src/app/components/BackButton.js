'use client'

import { useRouter } from 'next/navigation'

export default function BackButton() {
  const router = useRouter()

  const handleBack = () => {
    if (typeof window !== 'undefined' && window.history.length > 1) {
      router.back()
    } else {
      router.push('/')
    }
  }

  return (
    <button
      onClick={handleBack}
      className="back-btn"
      id="btn-back"
      aria-label="Kembali ke beranda"
      type="button"
    >
      <svg fill="none" viewBox="0 0 24 24" strokeWidth="2">
        <polyline points="15 18 9 12 15 6" />
      </svg>
    </button>
  )
}
