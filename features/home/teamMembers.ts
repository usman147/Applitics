export interface TeamMember {
  id: number;
  name: string;
  role: string;
  image: string;
}

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 1,
    name: 'Yassine Elaouni',
    role: 'Senior R Shiny & DevOps Engineer',
    image: '/team/member-yassine.png',
  },
  {
    id: 2,
    name: 'Ahmed Jou',
    role: 'Lead R Expert & Delivery Manager',
    image: '/team/member-ahmed.png',
  },
  {
    id: 3,
    name: 'Achraf Elkaami',
    role: 'Senior UX/UI & Data Product Designer',
    image: '/team/member-achraf.png',
  },
  {
    id: 4,
    name: 'Bouchaib Nadim',
    role: 'R Shiny Developer',
    image: '/team/member-nadim.png',
  },
  {
    id: 6,
    name: 'Julien Lefèvre',
    role: 'Strategy & Operations Advisor',
    image: '/team/member-julien.png',
  },
];
