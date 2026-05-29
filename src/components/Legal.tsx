export function Legal() {
  return (
    <>
      <section id="privacy" className="section-anchor border-t border-gray-200 bg-gray-50 py-16">
        <div className="mx-auto max-w-3xl px-6 prose prose-sm text-slate-muted">
          <h2 className="text-2xl font-bold text-graphite">Privacy Policy</h2>
          <p className="mt-4">
            <strong>Last updated:</strong> May 2026
          </p>
          <p>
            CleanGrid (&quot;we&quot;) processes data you submit through this website (contact details,
            building information, and uploaded invoices) solely to provide quotes, site scans, and
            cleaning services.
          </p>
          <ul className="mt-4 list-disc space-y-2 pl-5">
            <li>
              <strong>What we collect:</strong> name, email, phone, company, building data, and
              files you upload.
            </li>
            <li>
              <strong>Why:</strong> to calculate pricing, schedule site scans, and communicate about
              contracts.
            </li>
            <li>
              <strong>Retention:</strong> quote data is retained for the sales and contract period
              unless you request deletion.
            </li>
            <li>
              <strong>Sharing:</strong> we do not sell your data. Processors (e.g. form hosting,
              email) are used under appropriate agreements.
            </li>
            <li>
              <strong>Your rights (EU/UK):</strong> access, correction, deletion, restriction —
              contact{' '}
              <a href="mailto:privacy@cleangrid.com" className="text-accent-dim">
                privacy@cleangrid.com
              </a>
              .
            </li>
            <li>
              <strong>Operational data:</strong> during service, robots may capture images in
              approved zones as defined in your facility agreement.
            </li>
          </ul>
        </div>
      </section>

      <section id="terms" className="section-anchor border-t border-gray-200 bg-white py-16">
        <div className="mx-auto max-w-3xl px-6 text-sm text-slate-muted">
          <h2 className="text-2xl font-bold text-graphite">Terms of Service</h2>
          <p className="mt-4">
            <strong>Last updated:</strong> May 2026
          </p>
          <p className="mt-4">
            This website is for information and lead generation. Binding terms are set out in your
            signed CleanGrid facility agreement, including SLA, liability, insurance, and data
            processing terms.
          </p>
          <ul className="mt-4 list-disc space-y-2 pl-5">
            <li>Indicative pricing on this site is not an offer until confirmed in writing.</li>
            <li>Sample dashboards are illustrative unless labeled as live data.</li>
            <li>Deployment timelines depend on site readiness and regulatory approval.</li>
            <li>Contact: sales@cleangrid.com</li>
          </ul>
        </div>
      </section>
    </>
  )
}
