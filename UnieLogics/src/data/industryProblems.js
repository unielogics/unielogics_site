export const industryProblems = {
  coreProblem: {
    title: 'The Core Problem in Trucking',
    intro: 'The transportation industry, especially trucking, loses billions of dollars every year due to inefficiencies and underutilized capacity.'
  },
  sections: [
    {
      id: 'trucks-not-full',
      title: 'Trucks Are Not Running Full',
      content: 'Many trucks operate with empty miles (deadhead miles). Others move partially filled trailers. Some sit idle waiting for loads.',
      details: [
        {
          stat: '15-30%',
          label: 'of miles driven are empty',
          description: 'Industry estimates often cite that 15–30% of miles driven are empty, depending on market conditions.'
        },
        {
          stat: 'Billions',
          label: 'in lost revenue annually',
          description: 'Empty and partially filled trucks represent massive opportunity cost across the industry.'
        }
      ],
      impact: [
        'Fuel is burned with no revenue',
        'Drivers are paid for non-productive time',
        'Equipment depreciates without generating income',
        'Shippers pay higher rates to cover inefficiencies',
        'Carriers struggle with thin margins (often 3–6%)'
      ]
    },
    {
      id: 'massive-losses',
      title: 'Why This Causes Massive Losses',
      content: 'When trucks are not fully utilized, the economic impact cascades through the entire supply chain.',
      details: [
        {
          stat: '3-6%',
          label: 'Average carrier margins',
          description: 'Thin margins leave little room for error or market downturns.'
        }
      ],
      impact: [
        'Higher shipping costs for shippers',
        'Lower carrier profitability',
        'Market volatility',
        'Increased bankruptcies during downturns',
        'Environmental impact from wasted fuel'
      ]
    },
    {
      id: 'technology-gap',
      title: 'The Technology Gap',
      content: 'A major reason for this inefficiency is the lack of real-time coordination and modern optimization systems across carriers, brokers, shippers, warehouses, and 3PLs.',
      details: [
        {
          stat: 'Fragmented',
          label: 'Industry systems',
          description: 'Unlike industries such as airlines (which optimize seat capacity precisely), trucking is still highly fragmented and manual.'
        }
      ],
      currentState: [
        'Phone calls for coordination',
        'Email chains for communication',
        'Spreadsheets for tracking',
        'Disconnected TMS systems',
        'Limited real-time visibility'
      ]
    },
    {
      id: 'structural-challenges',
      title: 'Structural Industry Challenges',
      content: 'The trucking industry faces fundamental structural challenges that compound the efficiency problem.',
      details: [
        {
          stat: '90%+',
          label: 'of companies operate < 6 trucks',
          description: 'Highly fragmented market with limited resources for technology investment.'
        }
      ],
      challenges: [
        'Highly fragmented market',
        'Limited data sharing between parties',
        'Poor load matching systems',
        'Weak predictive analytics for demand',
        'Lack of network coordination'
      ]
    },
    {
      id: 'opportunity',
      title: 'Where Opportunity Exists',
      content: 'The gap creates massive opportunity for technology solutions that can transform the industry.',
      opportunities: [
        'AI-powered load matching',
        'Real-time freight visibility platforms',
        'Network-based dispatch systems',
        'Predictive freight demand modeling',
        'Integrated warehouse + carrier coordination platforms'
      ]
    }
  ],
  unielogicsSolutions: {
    title: 'How UnieLogics Unifies the Market',
    solutions: [
      {
        problem: 'Empty miles and poor load matching',
        solution: 'UnieFreight platform unifies market activity by connecting all operators—shippers, carriers, warehouses—with predictive load matching that fills capacity before trucks hit the road.'
      },
      {
        problem: 'Fragmented systems and manual processes',
        solution: 'Our unified software platform connects all operators (warehouse, carrier, enterprise sellers, brands) in one ecosystem, eliminating discrepancies and enabling seamless market-wide coordination.'
      },
      {
        problem: 'Lack of real-time visibility',
        solution: 'Integrated platform provides unified visibility across all operators, enabling proactive decision-making that fixes issues before they impact the market.'
      },
      {
        problem: 'Weak predictive analytics',
        solution: 'Operations optimization analyzes millions of data points to predict demand and optimize operations before problems occur—this is how we unify market activity and fill discrepancies.'
      },
      {
        problem: 'Limited coordination between parties',
        solution: 'Nationwide optimization service unifies all operators, coordinating inventory placement, carrier capacity, and routing across the entire network with predictive intelligence that fixes issues proactively.'
      },
      {
        problem: 'Market fragmentation and discrepancies',
        solution: 'UnieLogics takes the same approach as market leaders who unify trucking activity—but we do it with software that connects all operators and predicts demand before discrepancies occur.'
      }
    ]
  }
}
