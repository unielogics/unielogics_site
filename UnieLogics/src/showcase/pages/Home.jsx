// Home — the consumer landing page.
// Voice: shippers / brands / sellers who need a supply chain run for them.
import { MergeScene } from '../components/MergeScene'
import { StoryScene } from '../components/StoryScene'
import {
  Hero,
  ThreeServicesSection,
  BrainSection,
  FourTrackSection,
  BeforeAfterSection,
  EndToEndSection,
  OpenNetworkSection,
  LastMileSection,
  NetworkSection,
  AuditFunnel,
  TractionSection,
  CTASection,
} from '../components/sections'

export default function Home() {
  return (
    <>
      <Hero />
      <ThreeServicesSection />
      <MergeScene />
      <span id="story"></span>
      <StoryScene />
      <BrainSection />
      <FourTrackSection />
      <BeforeAfterSection />
      <EndToEndSection voice="consumer" />
      <OpenNetworkSection voice="consumer" />
      <LastMileSection />
      <NetworkSection voice="consumer" />
      <AuditFunnel />
      <TractionSection voice="consumer" />
      <CTASection />
    </>
  )
}
