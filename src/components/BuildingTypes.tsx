const buildings = [
  { type: 'Offices', benefit: 'Nightly reset — floors, workspaces, bathrooms.' },
  { type: 'Schools', benefit: 'After-hours classrooms, gyms, cafeterias.' },
  { type: 'Factories', benefit: 'Floors and break areas between shifts.' },
  { type: 'Hotels', benefit: 'Lobbies, corridors, back-of-house.' },
  { type: 'Warehouses', benefit: 'Large floor areas on schedule.' },
  { type: 'Healthcare', benefit: 'Aligned to your facility protocols.' },
]

export function BuildingTypes() {
  return (
    <section id="buildings" className="section-anchor bg-white py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-graphite">Large buildings</h2>
            <p className="mt-3 text-slate-muted">Offices, schools, factories, hotels, warehouses, healthcare.</p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {buildings.map((b) => (
                <div key={b.type} className="rounded-lg border border-gray-200 p-4">
                  <h3 className="font-semibold text-graphite">{b.type}</h3>
                  <p className="mt-1 text-sm text-slate-muted">{b.benefit}</p>
                </div>
              ))}
            </div>
          </div>
          <img
            src="/images/warehouse-clean.jpg"
            alt="Large facility floor cleaned overnight"
            className="aspect-video w-full rounded-xl border border-gray-200 object-cover shadow-md lg:aspect-[4/5]"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  )
}
