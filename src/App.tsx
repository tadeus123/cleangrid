import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { SavingsCalculator } from './components/SavingsCalculator'
import { BuildingMapEstimator } from './components/BuildingMapEstimator'
import { NoOwnership } from './components/NoOwnership'
import { Process } from './components/Process'
import { ReportDashboard } from './components/ReportDashboard'
import { VisualProof } from './components/VisualProof'
import { BuildingTypes } from './components/BuildingTypes'
import { Comparison } from './components/Comparison'
import { PerformanceGuarantee } from './components/PerformanceGuarantee'
import { Pricing } from './components/Pricing'
import { CaseStudy } from './components/CaseStudy'
import { Trust } from './components/Trust'
import { FoundingPartner } from './components/FoundingPartner'
import { FAQ } from './components/FAQ'
import { SiteScan } from './components/SiteScan'
import { UploadSection } from './components/UploadSection'
import { Legal } from './components/Legal'
import { Footer } from './components/Footer'
import { StickyMobileCTA } from './components/StickyMobileCTA'

function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <SavingsCalculator />
        <BuildingMapEstimator />
        <NoOwnership />
        <Process />
        <ReportDashboard />
        <VisualProof />
        <BuildingTypes />
        <Comparison />
        <PerformanceGuarantee />
        <Pricing />
        <CaseStudy />
        <Trust />
        <FoundingPartner />
        <FAQ />
        <SiteScan />
        <UploadSection />
        <Legal />
      </main>
      <Footer />
      <StickyMobileCTA />
    </>
  )
}

export default App
