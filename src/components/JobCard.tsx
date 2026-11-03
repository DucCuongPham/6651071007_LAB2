import { Link } from 'react-router-dom'
import type { Job } from '../data/jobs'

interface JobCardProps {
  job: Job
  onViewDetail: (job: Job) => void
}

function JobCard({ job, onViewDetail }: JobCardProps) {
  return (
    <article className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <div className="mb-4 flex items-center justify-between">
        <span className="rounded-full bg-emerald-100 px-3 py-1 text-sm font-medium text-emerald-700">
          {job.category}
        </span>

        <span className="text-sm text-gray-500">
          {job.postedAt}
        </span>
      </div>

      <h2 className="mb-2 text-xl font-bold text-gray-800">
        {job.title}
      </h2>

      <p className="mb-3 font-medium text-gray-600">
        {job.company}
      </p>

      <div className="mb-2 text-sm text-gray-500">
        📍 {job.location}
      </div>

      <div className="mb-4 text-sm text-gray-500">
        💰 {job.salary}
        <span className="ml-3">💼 {job.type}</span>
      </div>

      <p className="mb-5 text-sm leading-6 text-gray-600">
        {job.description}
      </p>

      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => onViewDetail(job)}
          aria-label={`Xem nhanh công việc ${job.title}`}
          className="flex-1 rounded-lg border border-emerald-600 px-3 py-2 font-semibold text-emerald-700 hover:bg-emerald-50"
        >
          Xem nhanh
        </button>

        <Link
          to={`/item/${job.id}`}
          className="flex-1 rounded-lg bg-emerald-700 px-3 py-2 text-center font-semibold text-white hover:bg-emerald-700"
        >
          Xem chi tiết
        </Link>
      </div>
    </article>
  )
}

export default JobCard
