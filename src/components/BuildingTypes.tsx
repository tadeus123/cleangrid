const buildings = [
  {
    type: 'Offices',
    benefit: 'Floors, workspaces, and bathrooms reset every night. No missed shifts.',
  },
  {
    type: 'Schools',
    benefit: 'Classrooms, corridors, gyms, and cafeterias cleaned after 16:00.',
  },
  {
    type: 'Factories',
    benefit: 'Production floors and break areas cleaned between shifts.',
  },
  {
    type: 'Hotels',
    benefit: 'Lobbies, hallways, and back-of-house cleaned continuously.',
  },
  {
    type: 'Warehouses',
    benefit: 'Floor cleaning on schedule — every 4 hours or overnight.',
  },
  {
    type: 'Airports',
    benefit: 'High-traffic zones with continuous or scheduled cleaning.',
  },
  {
    type: 'Hospitals',
    benefit: 'Hygiene-grade cleaning with documented compliance reports.',
  },
  {
    type: 'Public buildings',
    benefit: 'Full-building reset overnight with proof-of-clean logs.',
  },
]

export function BuildingTypes() {
  return (
    <section id="buildings" className="bg-white py-20">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="text-center text-3xl font-bold tracking-tight text-graphite">
          Built for large buildings
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-center text-slate-muted">
          Offices, schools, factories, hotels, warehouses, airports, hospitals, and public spaces.
        </p>
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {buildings.map((b) => (
            <article
              key={b.type}
              className="group rounded-lg border border-gray-200 p-6 transition hover:border-accent/40 hover:shadow-md"
            >
              <h3 className="font-semibold text-graphite group-hover:text-accent-dim">{b.type}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-muted">{b.benefit}</p>
            </article>
          ))}
        </div>

        <div className="mt-16 flex flex-wrap justify-center gap-3">
          {['CleanGrid Night', 'CleanGrid Always', 'CleanGrid Factory', 'CleanGrid School', 'CleanGrid Bath', 'CleanGrid Proof'].map(
            (name) => (
              <span
                key={name}
                className="rounded-full border border-gray-200 bg-gray-50 px-4 py-1.5 text-xs font-medium text-graphite"
              >
                {name}
              </span>
            ),
          )}
        </div>
      </div>
    </section>
  )
}
