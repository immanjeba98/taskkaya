import { NextRequest, NextResponse } from 'next/server';
import { Job, JobFormData } from '@/types/job';

// Mock database - in a real app, this would be a database
let jobs: Job[] = [
  {
    id: '1',
    title: 'Senior Frontend Developer',
    company: 'TechCorp Inc.',
    location: 'San Francisco, CA',
    type: 'full-time',
    description: 'We are looking for a senior frontend developer to join our dynamic team. You will be responsible for building user-facing applications using React, TypeScript, and modern web technologies.',
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
    description: 'Lead product strategy and development for our cutting-edge SaaS platform. Work closely with engineering, design, and marketing teams.',
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
    description: 'Create exceptional user experiences for web and mobile applications. Collaborate with product and engineering teams to deliver intuitive designs.',
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
    description: 'Build and maintain scalable cloud infrastructure. Implement CI/CD pipelines and ensure system reliability.',
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
    description: 'Drive growth through digital marketing campaigns. Manage social media, content marketing, and email campaigns.',
    requirements: ['Digital marketing experience', 'Analytics tools', 'Content creation', 'Social media management'],
    salary: '$25 - $35/hour',
    postedDate: new Date(Date.now() - 345600000).toISOString()
  }
];

export async function GET() {
  return NextResponse.json(jobs);
}

export async function POST(request: NextRequest) {
  try {
    const jobData: JobFormData = await request.json();
    
    // Validate required fields
    if (!jobData.title || !jobData.company || !jobData.location || !jobData.type || !jobData.description) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const newJob: Job = {
      id: (jobs.length + 1).toString(),
      title: jobData.title,
      company: jobData.company,
      location: jobData.location,
      type: jobData.type,
      description: jobData.description,
      requirements: jobData.requirements ? jobData.requirements.split('\n').filter(req => req.trim()) : [],
      salary: jobData.salary,
      postedDate: new Date().toISOString(),
      applicationUrl: jobData.applicationUrl
    };

    jobs.unshift(newJob);
    return NextResponse.json(newJob, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create job' },
      { status: 500 }
    );
  }
}