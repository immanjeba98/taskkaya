import { NextRequest, NextResponse } from 'next/server';
import { Job } from '@/types/job';

// Same mock data as in your main jobs API - you should ideally move this to a shared location
let jobs: Job[] = [
  {
    id: '1',
    title: 'Senior Frontend Developer',
    company: 'TechCorp Inc.',
    location: 'San Francisco, CA',
    type: 'full-time',
    description: 'We are looking for a senior frontend developer to join our dynamic team. You will be responsible for building user-facing applications using React, TypeScript, and modern web technologies.\n\nAs a Senior Frontend Developer, you will work closely with our design and backend teams to create seamless user experiences. You will be involved in the entire development lifecycle, from concept to deployment, and will have the opportunity to mentor junior developers.\n\nWe offer a collaborative work environment, competitive benefits, and the chance to work on cutting-edge projects that impact millions of users.',
    requirements: ['5+ years React experience', 'TypeScript proficiency', 'Modern CSS frameworks', 'Git version control'],
    salary: '$120k - $150k',
    postedDate: new Date().toISOString(),
    applicationUrl: 'https://example.com/apply/1'
  },
  {
    id: '2',
    title: 'Product Manager',
    company: 'InnovateLabs',
    location: 'New York, NY',
    type: 'full-time',
    description: 'Lead product strategy and development for our cutting-edge SaaS platform. Work closely with engineering, design, and marketing teams.\n\nYou will be responsible for defining product roadmaps, gathering requirements from stakeholders, and ensuring successful product launches. This role requires strong analytical skills and the ability to make data-driven decisions.\n\nJoin our fast-growing company and help shape the future of our innovative products.',
    requirements: ['3+ years product management', 'Agile methodology', 'Data-driven decisions', 'Strong communication skills'],
    salary: '$110k - $140k',
    postedDate: new Date(Date.now() - 86400000).toISOString(),
    applicationUrl: 'https://example.com/apply/2'
  },
  {
    id: '3',
    title: 'UX Designer',
    company: 'DesignStudio Pro',
    location: 'Remote',
    type: 'remote',
    description: 'Create exceptional user experiences for web and mobile applications. Collaborate with product and engineering teams to deliver intuitive designs.\n\nAs a UX Designer, you will conduct user research, create wireframes and prototypes, and work closely with developers to ensure design implementation. You will have the opportunity to work on diverse projects across different industries.\n\nWe value creativity, attention to detail, and a user-centered approach to design.',
    requirements: ['Portfolio of UX work', 'Figma proficiency', 'User research experience', 'Prototyping skills'],
    salary: '$85k - $110k',
    postedDate: new Date(Date.now() - 172800000).toISOString(),
    applicationUrl: 'https://example.com/apply/3'
  },
  {
    id: '4',
    title: 'DevOps Engineer',
    company: 'CloudFirst Solutions',
    location: 'Austin, TX',
    type: 'full-time',
    description: 'Build and maintain scalable cloud infrastructure. Implement CI/CD pipelines and ensure system reliability.\n\nYou will work with cutting-edge cloud technologies and help automate our deployment processes. This role involves monitoring system performance, troubleshooting issues, and implementing best practices for security and scalability.\n\nExperience with containerization and orchestration technologies is highly valued.',
    requirements: ['AWS/Azure experience', 'Docker & Kubernetes', 'CI/CD pipelines', 'Infrastructure as Code'],
    salary: '$130k - $160k',
    postedDate: new Date(Date.now() - 259200000).toISOString()
  },
  {
    id: '5',
    title: 'Marketing Specialist',
    company: 'GrowthHackers Co.',
    location: 'Chicago, IL',
    type: 'part-time',
    description: 'Drive growth through digital marketing campaigns. Manage social media, content marketing, and email campaigns.\n\nYou will be responsible for creating engaging content, analyzing campaign performance, and optimizing marketing strategies. This part-time role offers flexibility while working with a dynamic marketing team.\n\nPerfect opportunity for someone looking to gain experience in growth marketing.',
    requirements: ['Digital marketing experience', 'Analytics tools', 'Content creation', 'Social media management'],
    salary: '$25 - $35/hour',
    postedDate: new Date(Date.now() - 345600000).toISOString()
  }
];

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const job = jobs.find(j => j.id === params.id);
  
  if (!job) {
    return NextResponse.json(
      { error: 'Job not found' },
      { status: 404 }
    );
  }

  return NextResponse.json(job);
}