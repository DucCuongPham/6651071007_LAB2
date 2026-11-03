
import { useMemo, useState } from 'react'
import JobCard from '../components/JobCard'
import JobDetailModal from '../components/JobDetailModal'
import JobForm from '../components/JobForm'
import jobsData from '../data/data.json'
import type { Job } from '../data/jobs'
const initialJobs: Job[] = jobsData as Job[]

const STORAGE_KEY = 'jobboard_jobs'

function loadJobs(): Job[] {
  try {
    const savedJobs = localStorage.getItem(STORAGE_KEY)

    if (savedJobs) {
      return JSON.parse(savedJobs) as Job[]
    }
  } catch {
    console.error('Không thể đọc dữ liệu công việc.')
  }

  return initialJobs
}

function JobsPage() {
  const [jobList, setJobList] = useState<Job[]>(loadJobs)
  const [selectedJob, setSelectedJob] = useState<Job | null>(null)
  const [editingJob, setEditingJob] = useState<Job | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [keyword, setKeyword] = useState('')
  const [category, setCategory] = useState('Tất cả')
  const [jobType, setJobType] = useState('Tất cả')

  function saveJobs(updatedJobs: Job[]) {
    setJobList(updatedJobs)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedJobs))
  }

  function handleAdd(jobData: Omit<Job, 'id'>) {
    const newJob: Job = {
      ...jobData,
      id: Date.now(),
    }

    saveJobs([newJob, ...jobList])
    setShowForm(false)
  }

  function handleEdit(jobData: Omit<Job, 'id'>) {
    if (!editingJob) return

    const updatedJobs = jobList.map((job) =>
      job.id === editingJob.id
        ? { ...jobData, id: editingJob.id }
        : job
    )

    saveJobs(updatedJobs)
    setEditingJob(null)
    setShowForm(false)
  }

  function handleDelete(id: number) {
    const confirmed = window.confirm(
      'Bạn có chắc chắn muốn xóa công việc này không?'
    )

    if (!confirmed) return

    saveJobs(jobList.filter((job) => job.id !== id))
  }

  const categories = [
    'Tất cả',
    ...new Set(jobList.map((job) => job.category)),
  ]

  const jobTypes = [
    'Tất cả',
    ...new Set(jobList.map((job) => job.type)),
  ]

  const filteredJobs = useMemo(() => {
    const searchText = keyword.toLowerCase().trim()

    return jobList.filter((job) => {
      const matchesKeyword =
        `${job.title} ${job.company} ${job.location}`
          .toLowerCase()
          .includes(searchText)

      const matchesCategory =
        category === 'Tất cả' || job.category === category

      const matchesType =
        jobType === 'Tất cả' || job.type === jobType

      return matchesKeyword && matchesCategory && matchesType
    })
  }, [jobList, keyword, category, jobType])

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-emerald-700 text-white shadow-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <h1 className="text-2xl font-bold">
            Job<span className="text-emerald-200">Board</span>
          </h1>

          <span className="text-sm font-medium">
            Nền tảng tìm kiếm việc làm
          </span>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-10">
        <section className="mb-10 text-center">
          <h2 className="mb-3 text-3xl font-bold text-slate-800">
            Tìm công việc phù hợp với bạn
          </h2>

          <p className="mb-7 text-slate-500">
            Khám phá cơ hội nghề nghiệp và phát triển sự nghiệp của bạn.
          </p>

          <div className="mx-auto flex max-w-3xl flex-col gap-3 sm:flex-row">
            <input
              type="search"
              value={keyword}
              onChange={(event) => setKeyword(event.target.value)}
              placeholder="Tìm tên công việc, công ty hoặc địa điểm..."
              aria-label="Tìm kiếm công việc"
              className="min-w-0 flex-1 rounded-xl border border-slate-300 bg-white px-5 py-4 outline-none focus:border-emerald-500"
            />

            <select
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              aria-label="Lọc theo ngành nghề"
              className="rounded-xl border border-slate-300 bg-white px-4 py-3"
            >
              {categories.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>

            <select
              value={jobType}
              onChange={(event) => setJobType(event.target.value)}
              aria-label="Lọc theo hình thức công việc"
              className="rounded-xl border border-slate-300 bg-white px-4 py-3"
            >
              {jobTypes.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <button
              type="button"
              onClick={() => {
                setKeyword('')
                setCategory('Tất cả')
                setJobType('Tất cả')
              }}
              className="rounded-lg border border-emerald-600 px-6 py-3 font-semibold text-emerald-700 hover:bg-emerald-50"
            >
              Đặt lại bộ lọc
            </button>

            <button
              type="button"
              onClick={() => {
                setEditingJob(null)
                setShowForm(true)
              }}
              className="rounded-lg bg-emerald-700 px-6 py-3 font-semibold text-white hover:bg-emerald-700"
            >
              + Thêm công việc
            </button>
          </div>
        </section>

        <section>
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-slate-800">
              Việc làm mới nhất
            </h2>

            <span className="text-sm text-slate-500">
              {filteredJobs.length} công việc
            </span>
          </div>

          {filteredJobs.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredJobs.map((job) => (
                <div key={job.id} className="flex flex-col gap-2">
                  <JobCard
                    job={job}
                    onViewDetail={setSelectedJob}
                  />

                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setEditingJob(job)
                        setShowForm(true)
                      }}
                      className="flex-1 rounded-lg border border-blue-500 py-2 font-medium text-blue-600 hover:bg-blue-50"
                    >
                      Sửa
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDelete(job.id)}
                      className="flex-1 rounded-lg border border-red-500 py-2 font-medium text-red-600 hover:bg-red-50"
                    >
                      Xóa
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="rounded-xl bg-white p-10 text-center text-slate-500">
              Không tìm thấy công việc phù hợp.
            </p>
          )}
        </section>
      </main>

      <footer className="mt-12 bg-slate-900 py-6 text-center text-sm text-slate-300">
        © 2026 JobBoard - Website tuyển dụng và tìm việc làm
      </footer>

      <JobDetailModal
        job={selectedJob}
        onClose={() => setSelectedJob(null)}
      />

      {showForm && (
        <JobForm
          initialJob={editingJob}
          onSubmit={editingJob ? handleEdit : handleAdd}
          onCancel={() => {
            setShowForm(false)
            setEditingJob(null)
          }}
        />
      )}
    </div>
  )
}

export default JobsPage
