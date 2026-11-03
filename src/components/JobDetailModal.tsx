
import { useEffect, useRef } from 'react'
import type { Job } from '../data/jobs'

interface JobDetailModalProps {
  job: Job | null
  onClose: () => void
}

function JobDetailModal({ job, onClose }: JobDetailModalProps) {
  const modalRef = useRef<HTMLElement>(null)
  const previousFocusRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (!job) return

    // Lưu lại phần tử đang được focus trước khi mở modal
    previousFocusRef.current =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null

    // Đưa focus vào modal
    modalRef.current?.focus()

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        event.preventDefault()
        onClose()
        return
      }

      if (event.key === 'Tab') {
        const modal = modalRef.current
        if (!modal) return

        const focusableElements = modal.querySelectorAll<HTMLElement>(
          'button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )

        if (focusableElements.length === 0) {
          event.preventDefault()
          modal.focus()
          return
        }

        const firstElement = focusableElements[0]
        const lastElement = focusableElements[focusableElements.length - 1]

        if (
          event.shiftKey &&
          (document.activeElement === firstElement ||
            document.activeElement === modal)
        ) {
          event.preventDefault()
          lastElement.focus()
        } else if (
          !event.shiftKey &&
          document.activeElement === lastElement
        ) {
          event.preventDefault()
          firstElement.focus()
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)

      // Trả focus về phần tử đã mở modal
      previousFocusRef.current?.focus()
    }
  }, [job, onClose])

  if (!job) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <section
        ref={modalRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-6 shadow-xl focus:outline-none"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="mb-5 flex items-center justify-between">
          <h2 id="modal-title" className="text-2xl font-bold text-gray-800">
            Chi tiết công việc
          </h2>

          <button
            type="button"
            onClick={onClose}
            aria-label="Đóng cửa sổ chi tiết"
            className="rounded-lg px-3 py-2 text-xl text-gray-500 hover:bg-gray-100"
          >
            ×
          </button>
        </div>

        <h3 className="mb-2 text-xl font-bold text-emerald-700">
          {job.title}
        </h3>

        <p className="mb-4 font-medium text-gray-600">
          {job.company}
        </p>

        <div className="mb-5 grid grid-cols-1 gap-3 rounded-xl bg-gray-50 p-4 sm:grid-cols-2">
          <p>📍 Địa điểm: {job.location}</p>
          <p>💰 Mức lương: {job.salary}</p>
          <p>💼 Hình thức: {job.type}</p>
          <p>📂 Ngành nghề: {job.category}</p>
        </div>

        <h4 className="mb-2 font-bold text-gray-800">
          Mô tả công việc
        </h4>

        <p className="mb-5 leading-7 text-gray-600">
          {job.description}
        </p>

        <h4 className="mb-2 font-bold text-gray-800">
          Yêu cầu ứng viên
        </h4>

        <ul className="mb-5 list-inside list-disc space-y-2 text-gray-600">
          {job.requirements.map((requirement, index) => (
            <li key={index}>{requirement}</li>
          ))}
        </ul>

        <button
          type="button"
          onClick={onClose}
          className="w-full rounded-lg bg-emerald-700 px-4 py-3 font-semibold text-white hover:bg-emerald-700"
        >
          Đóng
        </button>
      </section>
    </div>
  )
}

export default JobDetailModal
