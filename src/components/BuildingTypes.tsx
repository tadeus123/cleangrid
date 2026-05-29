import { useState } from 'react'

const buildings = [
  {
    type: 'Offices',
    benefit: 'Floors, workspaces, and bathrooms reset every night. No staffing gaps.',
  },
  {
    type: 'Schools',
    benefit: 'Classrooms, corridors, gyms, and cafeterias cleaned after students leave.',
  },
  {
    type: 'Factories',
    benefit: 'Production floors and break areas cleaned between shifts.',
  },
  {
    type: 'Hotels',
    benefit: 'Lobbies, hallways, and back-of-house — night standard or 24/7 add-on.',
  },
  {
    type: 'Warehouses',
    benefit: 'Floor cleaning on your schedule — overnight or every few hours.',
  },
  {
    type: 'Airports',
    benefit: 'High-traffic zones with approved routes and security coordination.',
  },
  {
    type: 'Healthcare',
    benefit: 'Cleaning protocols aligned with your facility rules — not a replacement for clinical sterile services unless scoped.',
  },
  {
    type: 'Public buildings',
    benefit: 'Full-building reset overnight with proof-of-clean logs.',
  },
]

const products = [
  {
    name: 'CleanGrid Night',
    desc: 'Nightly full-building cleaning when the site is empty or low-traffic.',
  },
  {
    name: 'CleanGrid Always',
    desc: '24/7 continuous cleaning for lobbies, bathrooms, and high-traffic zones.',
  },
  {
    name: 'CleanGrid Factory',
    desc: 'Shift-change and overnight industrial floors, walkways, and break areas.',
  },
  {
    name: 'CleanGrid School',
    desc: 'After-hours reset of classrooms, bathrooms, gyms, and shared spaces.',
  },
  {
    name: 'CleanGrid Bath',
    desc: 'Bathrooms checked and refreshed on a fixed interval (e.g. every 30 minutes).',
  },
  {
    name: 'CleanGrid Proof',
    desc: 'Dashboard, SLA metrics, and exportable reports after every shift.',
  },
]

export function BuildingTypes() {
  const [activeProduct, setActiveProduct] = useState<string | null>(null)
  const selected = products.find((p) => p.name === activeProduct)

  return (
    <section id="buildings" className="section-anchor bg-white py-20">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="text-center text-3xl font-bold tracking-tight text-graphite">
          Built for large buildings
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-center text-slate-muted">
          Offices, schools, factories, hotels, warehouses, airports, healthcare, and public spaces.
        </p>
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {buildings.map((b) => (
            <article
              key={b.type}
              className="rounded-lg border border-gray-200 p-6 transition hover:border-accent/40 hover:shadow-md"
            >
              <h3 className="font-semibold text-graphite">{b.type}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-muted">{b.benefit}</p>
            </article>
          ))}
        </div>

        <div className="mt-16">
          <p className="text-center text-sm font-medium text-graphite">Service packages</p>
          <div className="mt-4 flex flex-wrap justify-center gap-3">
            {products.map((p) => (
              <button
                key={p.name}
                type="button"
                onClick={() => setActiveProduct(activeProduct === p.name ? null : p.name)}
                className={`rounded-full border px-4 py-1.5 text-xs font-medium transition ${
                  activeProduct === p.name
                    ? 'border-accent bg-accent/10 text-accent-dim'
                    : 'border-gray-200 bg-gray-50 text-graphite hover:border-accent/40'
                }`}
              >
                {p.name}
              </button>
            ))}
          </div>
          {selected && (
            <div className="mx-auto mt-6 max-w-lg rounded-lg border border-accent/30 bg-teal-50/50 p-6 text-center">
              <p className="font-semibold text-graphite">{selected.name}</p>
              <p className="mt-2 text-sm text-slate-muted">{selected.desc}</p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
