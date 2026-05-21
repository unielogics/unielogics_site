// Home — the cinematic showcase. Composition from the design app.jsx
// (TweaksPanel excluded; Navigation + Footer render at app level).
import { MergeScene } from '../components/MergeScene'
import { StoryScene } from '../components/StoryScene'
import {
  Hero,
  BrainSection,
  FourTrackSection,
  BeforeAfterSection,
  EndToEndSection,
  OpenNetworkSection,
  LastMileSection,
  ProductSuiteSection,
  TMSSection,
  NetworkSection,
  TwoDoorsSection,
  AuditFunnel,
  TractionSection,
  CTASection,
} from '../components/sections'

export default function Home() {
  return (
    <>
      <Hero />
      <MergeScene />
      <span id="story"></span>
      <StoryScene />
      <BrainSection />
      <FourTrackSection />
      <BeforeAfterSection />
      <EndToEndSection />
      <OpenNetworkSection />
      <LastMileSection />
      <ProductSuiteSection />
      <TMSSection />
      <NetworkSection />
      <TwoDoorsSection />
      <AuditFunnel />
      <TractionSection />
      <CTASection />
    </>
  )
}
