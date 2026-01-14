export interface Testimonial {
  id: string;
  image: string;
  title: string;
  name: string;
  role: string;
  description: string;
  youtubeUrl?: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    image: '/testimonials/capacity-planning-testimonial.png',
    title: 'Capacity Planning – Confidential Big Pharma Client',
    name: 'Gabriele Bano',
    role: 'Head of Process Modeling at a Big Pharma',
    description:
      'An R Shiny clinical capacity planning tool replacing Excel, enabling scenario simulation from planners to vice presidents.',
    youtubeUrl: 'https://www.youtube.com/embed/b3nZf1Xfq6s',
  },
  {
    id: '2',
    image: '/testimonials/agra-testimonial.png',
    title: 'AGRA Dashboard – Mathematica',
    name: 'Kim Siegal',
    role: 'Senior Researcher at Mathematica',
    description:
      'An R Shiny dashboard with auto-generative UI controlled via Excel, enabling near no-code customization for AGRA.',
    youtubeUrl: 'https://www.youtube.com/embed/Z3HZahCtAus',
  },
  {
    id: '3',
    image: '/testimonials/sales-pulse-testimonial.png',
    title: 'Sales Pulse – Digital Fuel Capital',
    name: 'Jeffrey Coughlin',
    role: 'Director of Analytics at Digital Fuel Capital',
    description:
      'Enterprise-ready R Shiny app with improved UI/UX, authentication, and user data management driving adoption.',
    youtubeUrl: 'https://www.youtube.com/embed/6-lsqQmM_9s',
  },
  {
    id: '4',
    image: '/testimonials/icleaned-testimonial.png',
    title: 'iCLEANED – CGIAR',
    name: 'E. Mwema and A. Notenbaert',
    role: 'Senior Researchers at CGIAR',
    description:
      'R Shiny tool simulating livestock scenarios and environmental impacts (GHG, water, land) for CGIAR.',
    youtubeUrl: 'https://www.youtube.com/embed/eHb6jyH0AiI',
  },
  {
    id: '5',
    image: '/testimonials/mathematica-testimonial.png',
    title: 'Evidence Maturity – Mathematica',
    name: 'G. Anapolle and J. Shieh',
    role: 'Research Analysts at Mathematica',
    description:
      'Enterprise-ready R Shiny app with improved UI/UX, authentication, and user data management driving adoption.',
  },
  {
    id: '6',
    image: '/testimonials/oxford-testimonial.png',
    title: 'Green Transition Navigator – University of Oxford',
    name: 'P. Andres',
    role: 'Economist at London Research School of Economics',
    description:
      'R Shiny web platform making green competitiveness and brown lock-in metrics accessible to policy makers and researchers.',
    youtubeUrl: 'https://www.youtube.com/embed/RNkP9ILUIyw',
  },
];

export function getTestimonialById(id: string): Testimonial | undefined {
  return TESTIMONIALS.find((t) => t.id === id);
}
