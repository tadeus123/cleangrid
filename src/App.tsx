import { Header } from './components/Header'
import { BuildingMapEstimator } from './components/BuildingMapEstimator'
import { SavingsCalculator } from './components/SavingsCalculator'
import { NoOwnership } from './components/NoOwnership'
import { Process } from './components/Process'
import { ReportDashboard } from './components/ReportDashboard'
import { BuildingTypes } from './components/BuildingTypes'
import { Comparison } from './components/Comparison'
import { PerformanceGuarantee } from './components/PerformanceGuarantee'
import { Pricing } from './components/Pricing'
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
        <BuildingMapEstimator />
        <SavingsCalculator />
        <NoOwnership />
        <Process />
        <ReportDashboard />
        <BuildingTypes />
        <Comparison />
        <PerformanceGuarantee />
        <Pricing />
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
