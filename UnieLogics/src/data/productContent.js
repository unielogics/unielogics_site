/**
 * Shared product content for Home and Products pages.
 * Human-toned copy; avoid AI/robotic phrasing.
 */

export const PRODUCTS_INTRO = {
  title: 'Our Technology Suite',
  subtitle: "We don't build isolated products. We build a synchronized commerce layer where each piece strengthens the next.",
  subtitleLong: "From ecommerce seller → warehouse → freight → courier → buyer, our systems work as one intelligence layer that keeps optimizing the full lifecycle."
}

export const STRATEGIC_FLOW = {
  headline: 'The flow: From seller to buyer',
  steps: [
    'Ecommerce seller generates demand',
    'WMS structures and orchestrates fulfillment',
    'UnieFreight optimizes mid-mile transportation',
    'UnieCourier accelerates last-mile delivery',
    'Buyer gets faster, more cost-efficient delivery'
  ],
  closing: "Each step feeds data back into the core. Each transaction improves the model. It's a continuously learning setup built to give small and mid-sized operators the kind of performance that used to be reserved for the big players."
}

export const products = [
  {
    id: 'uniewms',
    name: 'UnieWMS',
    status: 'Live',
    link: 'https://uniewms.com',
    image: 'https://prepcenternearme.s3.us-east-1.amazonaws.com/unielogics/uniewms+(2).png',
    primaryUseCase: 'Warehouse management and white-label fulfillment. Connects warehouse operators to carrier networks with predictive demand intelligence.',
    shortDescription: 'Our warehouse management system is the foundation of the ecosystem. Built for agile operators, it brings the kind of automation and data instrumentation that large logistics corps use — without the complexity.',
    headline: 'WMS — The operational core',
    description: "Our WMS is the foundation of the UnieLogics ecosystem. It's built with corporate-grade architecture and strong automation, but streamlined for agile operators. Every product in our suite touches a warehouse at some point, so the WMS is the central data engine. It captures behavioral logistics data, bonds facilities into a shared network, and drives predictive optimization across the whole system. Connects multi-warehouse setups in 2–4 weeks.",
    bullets: [
      'Advanced automation and real-time inventory orchestration',
      'Predictive correction and anomaly detection',
      'Multi-client and multi-facility sync',
      'Network participation while you keep independent control',
      'Deep data across receiving, storage, picking, packing, and dispatch'
    ],
    closing: "It's not just warehouse software. It's the core data engine of the network."
  },
  {
    id: 'uniefreight',
    name: 'UnieFreight',
    status: 'Experimental',
    link: null,
    image: 'https://prepcenternearme.s3.us-east-1.amazonaws.com/unielogics/UNIEFREIGHT.png',
    primaryUseCase: 'Freight broker and carrier platform for LTL and FTL. Connects shippers with carrier capacity and predicts demand to fill empty miles.',
    shortDescription: 'Extends WMS intelligence beyond the warehouse. Connects freight providers — small to large — to network demand through a fair, open infrastructure. Matches loads before trucks leave.',
    headline: 'UnieFreight — Network-level freight optimization',
    description: "UnieFreight extends the intelligence of the WMS beyond the warehouse. It connects freight providers of all sizes to active network demand through a fair, open infrastructure. Unlike reactive freight systems, UnieFreight uses accelerated models that analyze transportation behavior, detect route inefficiencies, identify backhaul and partial-load opportunities, and predict movement trends. Its gap detection is key: when a truck is underfilled or returning empty, the system finds compatible jobs in the network to optimize the route. Open to carriers of any size.",
    bullets: [
      'Analyzes transportation behavior patterns',
      'Detects route inefficiencies and underused capacity',
      'Surfaces backhaul and partial-load opportunities',
      'Predicts movement trends across regions',
      'Proactive gap detection — finds loads for empty returns'
    ],
    closing: 'Freight stops being a cost center and becomes an optimized, data-driven asset.'
  },
  {
    id: 'uniecourier',
    name: 'UnieCourier',
    status: 'Experimental',
    link: null,
    image: 'https://prepcenternearme.s3.us-east-1.amazonaws.com/unielogics/uniecourier.png',
    primaryUseCase: 'Local delivery network and last-mile orchestration for regional fulfillment.',
    shortDescription: 'Predictive demand modeling built on WMS and order data. Anticipates high-demand zones before congestion — similar to how big retailers position capacity, but for independent operators.',
    headline: 'UnieCourier — Predictive last-mile acceleration',
    description: "UnieCourier is built on predictive demand models from our WMS and order management data. By analyzing network-wide order flow, regional buying behavior, and warehouse velocity, we anticipate high-demand zones before congestion hits. It mirrors strategies used by large retailers — but built for independent operators. Because the system understands demand before it peaks, delivery networks run with more control, fewer surprises, and better cost efficiency.",
    bullets: [
      'Predictive driver positioning in high-volume zones',
      'Dynamic dispatch coordination',
      'Real-time capacity balancing',
      'Data-informed surge prevention',
      'Smart last-minute load distribution'
    ],
    closing: 'Closes the loop between fulfillment and the buyer — optimized final-mile execution.'
  },
  {
    id: 'prepcenternearme',
    name: 'PrepCenterNearMe',
    status: 'Live',
    link: 'https://prepcenternearme.com',
    image: 'https://prepcenternearme.s3.us-east-1.amazonaws.com/unielogics/prepcenternearme.png',
    primaryUseCase: 'Marketplace connecting sellers with prep centers. A growing nationwide fulfillment network.',
    shortDescription: "More than a directory. A data-driven onboarding engine for ecommerce sellers. Audits performance and guides sellers into optimized warehousing within the UnieLogics network. Sellers find and compare prep centers in minutes.",
    headline: 'PrepCenterNearMe — Seller activation and network growth',
    description: "PrepCenterNearMe isn't just a directory. It's a data-driven onboarding and activation engine for ecommerce sellers. Through smart audits, it analyzes historical sales, marketplace velocity, product behavior, and operational gaps — then recommends how to plug into warehousing within the UnieLogics network. It serves seller acquisition, marketplace research, benchmarking, and lead generation for warehouses. By connecting sellers to warehouses, and warehouses to freight and courier intelligence, it acts as the entry gateway into the network.",
    bullets: [
      'Historical sales performance analysis',
      'Marketplace velocity and product behavior patterns',
      'Strategic recommendations for warehousing integration',
      'Lead generation for warehouses',
      'Routing into the broader logistics ecosystem'
    ],
    closing: 'The entry gateway into the network — connects sellers to warehouses, warehouses to freight and courier.'
  }
]
