import { useState } from 'react'
import type { FormEvent } from 'react'
import type { Job } from '../data/jobs'

interface JobFormProps {
  initialJob?: Job | null
  onSubmit: (job: Omit<Job, 'id'>) => void
  onCancel: () => void
}

function JobForm({ initialJob, onSubmit, onCancel }: JobFormProps) {
  const [title, setTitle] = useState(initialJob?.title ?? '')
  const [company, setCompany] = useState(initialJob?.company ?? '')
  const [location, setLocation] = useState(initialJob?.location ?? '')
  const [salary, setSalary] = useState(initialJob?.salary ?? '')
  const [type, setType] = useState(initialJob?.type ?? 'Full-time')
  const [category, setCategory] = useState(initialJob?.category ?? 'IT')
  const [description, setDescription] = useState(
    initialJob?.description ?? ''
  )
  const [requirements, setRequirements] = useState(
    initialJob?.requirements.join('\n') ?? ''
  )

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    onSubmit({
      title: title.trim(),
      company: company.trim(),
      location: location.trim(),
      salary: salary.trim(),
      type,
      category,
      description: description.trim(),
      requirements: requirements
        .split('\n')
        .map((item) => item.trim())
        .filter((item) => item !== ''),
      postedAt: initialJob?.postedAt ?? new Date().toISOString().slice(0, 10),
    })
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4">
      <form
        onSubmit={handleSubmit}
        className="max-h-[90vh] w-full max-w-2xl space-y-4 overflow-y-auto rounded-2xl bg-white p-6 shadow-xl"
      >
        <h2 className="text-2xl font-bold text-slate-800">
          {initialJob ? 'Chỉnh sửa công việc' : 'Thêm công việc mới'}
        </h2>

        <div>
          <label htmlFor="job-title" className="mb-1 block font-medium">
            Tên công việc
          </label>
          <input
            id="job-title"
            required
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            className="w-full rounded-lg border border-slate-300 p-3"
          />
        </div>

        <div>
          <label htmlFor="job-company" className="mb-1 block font-medium">
            Công ty
          </label>
          <input
            id="job-company"
            required
            value={company}
            onChange={(event) => setCompany(event.target.value)}
            className="w-full rounded-lg border border-slate-300 p-3"
          />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="job-location" className="mb-1 block font-medium">
              Địa điểm
            </label>
            <input
              id="job-location"
              required
              value={location}
              onChange={(event) => setLocation(event.target.value)}
              className="w-full rounded-lg border border-slate-300 p-3"
            />
          </div>

          <div>
            <label htmlFor="job-salary" className="mb-1 block font-medium">
              Mức lương
            </label>
            <input
              id="job-salary"
              required
              value={salary}
              onChange={(event) => setSalary(event.target.value)}
              className="w-full rounded-lg border border-slate-300 p-3"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="job-type" className="mb-1 block font-medium">
              Hình thức làm việc
            </label>
            <select
              id="job-type"
              value={type}
              onChange={(event) => setType(event.target.value)}
              className="w-full rounded-lg border border-slate-300 p-3"
            >
              <option>Full-time</option>
              <option>Part-time</option>
              <option>Internship</option>
              <option>Remote</option>
            </select>
          </div>

          <div>
            <label htmlFor="job-category" className="mb-1 block font-medium">
              Ngành nghề
            </label>
            <select
              id="job-category"
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              className="w-full rounded-lg border border-slate-300 p-3"
            >
              <option>IT</option>
              <option>Design</option>
              <option>Marketing</option>
              <option>Business</option>
              <option>Finance</option>
              <option>Education</option>
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="job-description" className="mb-1 block font-medium">
            Mô tả công việc
          </label>
          <textarea
            id="job-description"
            required
            rows={3}
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            className="w-full rounded-lg border border-slate-300 p-3"
          />
        </div>

        <div>
          <label htmlFor="job-requirements" className="mb-1 block font-medium">
            Yêu cầu ứng viên (mỗi yêu cầu một dòng)
          </label>
          <textarea
            id="job-requirements"
            required
            rows={3}
            value={requirements}
            onChange={(event) => setRequirements(event.target.value)}
            className="w-full rounded-lg border border-slate-300 p-3"
          />
        </div>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 rounded-lg border border-slate-300 px-4 py-3 font-semibold text-slate-700 hover:bg-slate-50"
          >
            Hủy
          </button>

          <button
            type="submit"
            className="flex-1 rounded-lg bg-emerald-700 px-4 py-3 font-semibold text-white hover:bg-emerald-700"
          >
            {initialJob ? 'Lưu thay đổi' : 'Thêm công việc'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default JobForm
