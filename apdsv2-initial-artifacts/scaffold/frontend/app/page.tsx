export default function Home() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">APDS v2.0 — Demo Frontend</h1>
      <p className="mt-4">Use the onboarding page to create a project and trigger an agent task.</p>
      <a className="inline-block mt-6 px-4 py-2 bg-sky-600 text-white rounded" href="/onboarding">Start onboarding</a>
    </div>
  )
}
