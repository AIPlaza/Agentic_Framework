export default function OnboardingPage() {
  async function handleSubmit(e: any) {
    e.preventDefault()
    const form = new FormData(e.target)
    const title = form.get('title')
    const res = await fetch('/api/projects', { method: 'POST', body: JSON.stringify({ title }) })
    // naive handling for demo
    if (res.ok) alert('Project created. Triggering onboarding agent...')
    await fetch('/api/agents/tasks', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ task: 'onboarding', projectId: 'demo' }) })
  }

  return (
    <div className="p-8">
      <h2 className="text-2xl font-semibold">Onboarding</h2>
      <form onSubmit={handleSubmit} className="mt-4">
        <label className="block">Project title</label>
        <input name="title" className="border p-2 w-full" defaultValue="Demo project" />
        <button className="mt-4 px-4 py-2 bg-green-600 text-white rounded" type="submit">Create & Run</button>
      </form>
    </div>
  )
}
