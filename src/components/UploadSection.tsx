import { CTAButtons } from './CTAButtons'

export function UploadSection() {
  return (
    <section id="upload" className="border-t border-white/5 bg-graphite py-24">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
          Large buildings cleaned from 10% of today&apos;s cost.
        </h2>
        <p className="mt-6 text-lg text-slate-muted">
          We don&apos;t sell robots. We sell cleaner buildings for less.
        </p>
        <p className="mt-4 text-sm text-slate-muted">
          Upload your current cleaning invoice or contract. We&apos;ll return your CleanGrid price,
          fleet estimate, and savings projection.
        </p>

        <form
          className="mx-auto mt-10 max-w-md rounded-xl border border-dashed border-white/20 bg-graphite-light p-8"
          onSubmit={(e) => e.preventDefault()}
        >
          <label className="block cursor-pointer">
            <span className="text-sm font-medium text-white">Drop your cleaning bill here</span>
            <span className="mt-2 block text-xs text-slate-muted">PDF, invoice, or contract · Max 25 MB</span>
            <input type="file" className="mt-4 w-full text-sm text-slate-muted file:mr-4 file:rounded file:border-0 file:bg-accent file:px-4 file:py-2 file:text-sm file:font-semibold file:text-graphite" accept=".pdf,.doc,.docx" />
          </label>
          <button
            type="submit"
            className="mt-6 w-full rounded-md bg-accent py-3 text-sm font-semibold text-graphite transition hover:bg-teal-400"
          >
            Upload cleaning bill
          </button>
        </form>

        <CTAButtons className="mt-8 justify-center" primary="calculate" />
      </div>
    </section>
  )
}
