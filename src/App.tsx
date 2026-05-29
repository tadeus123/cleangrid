import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { SavingsCalculator } from './components/SavingsCalculator'
import { NoOwnership } from './components/NoOwnership'
import { Process } from './components/Process'
import { ReportDashboard } from './components/ReportDashboard'
import { BuildingTypes } from './components/BuildingTypes'
import { Comparison } from './components/Comparison'
import { Pricing } from './components/Pricing'
import { Trust } from './components/Trust'
import { FAQ } from './components/FAQ'
import { UploadSection } from './components/UploadSection'
import { Legal } from './components/Legal'
import { Footer } from './components/Footer'
import { ContactSidebar, ContactWhatsAppBar } from './components/ContactSidebar'
import { StickyMobileCTA } from './components/StickyMobileCTA'

function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <SavingsCalculator />
        <NoOwnership />
        <Process />
        <ReportDashboard />
        <BuildingTypes />
        <Comparison />
        <Pricing />
        <Trust />
        <FAQ />
        <UploadSection />
        <Legal />
      </main>
      <Footer />
      <ContactSidebar />
      <ContactWhatsAppBar />
      <StickyMobileCTA />
    </>
  )
}

export default App
