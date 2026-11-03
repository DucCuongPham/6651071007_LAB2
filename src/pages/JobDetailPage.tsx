
import { Link, useParams } from 'react-router-dom'
import jobsData from '../data/data.json'
import type { Job } from '../data/jobs'

function JobDetailPage() {
  const { id } = useParams<{ id: string }>()

  const jobs: Job[] = jobsData as Job[]
  const job = jobs.find((item) => item.id === Number(id))

  if (!job) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-slate-50">
        <h1 className="text-2xl font-bold text-slate-800">
          Không tìm thấy công việc
        </h1>

        <Link
          to="/"
          className="rounded-lg bg-emerald-700 px-5 py-3 font-semibold text-white hover:bg-emerald-700"
        >
          Quay lại danh sách
        </Link>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10">
      <article className="mx-auto max-w-3xl rounded-2xl bg-white p-8 shadow-sm">
        <Link
          to="/"
          className="mb-8 inline-block font-medium text-emerald-600 hover:text-emerald-700"
        >
          ← Quay lại danh sách việc làm
        </Link>

        <span className="rounded-full bg-emerald-100 px-3 py-1 text-sm font-medium text-emerald-700">
          {job.category}
        </span>

        <h1 className="mb-3 mt-5 text-3xl font-bold text-slate-800">
          {job.title}
        </h1>

        <p className="mb-6 text-lg font-medium text-slate-600">
          {job.company}
        </p>

        <div className="mb-8 grid grid-cols-1 gap-4 rounded-xl bg-slate-50 p-5 sm:grid-cols-2">
          <p>📍 Địa điểm: {job.location}</p>
          <p>💰 Mức lương: {job.salary}</p>
          <p>💼 Hình thức: {job.type}</p>
          <p>📅 Ngày đăng: {job.postedAt}</p>
        </div>

        <h2 className="mb-3 text-xl font-bold text-slate-800">
          Mô tả công việc
        </h2>

        <p className="mb-8 leading-7 text-slate-600">
          {job.description}
        </p>

        <h2 className="mb-3 text-xl font-bold text-slate-800">
          Yêu cầu ứng viên
        </h2>

        <ul className="list-inside list-disc space-y-3 text-slate-600">
          {job.requirements.map((requirement, index) => (
            <li key={index}>{requirement}</li>
          ))}
        </ul>
      </article>
    </main>
  )
}

export default JobDetailPage
