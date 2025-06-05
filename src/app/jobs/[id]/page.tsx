'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Job } from '@/types/job';
import { 
  ArrowLeft, 
  MapPin, 
  Building2, 
  Clock, 
  DollarSign, 
  Calendar,
  ExternalLink,
  CheckCircle
} from 'lucide-react';

export default function JobDetailPage() {
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const params = useParams();
  const router = useRouter();
  const jobId = params.id as string;

  useEffect(() => {
    const fetchJob = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/jobs/${jobId}`);
        
        if (!response.ok) {
          throw new Error('Job not found');
        }
        
        const jobData = await response.json();
        setJob(jobData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch job');
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [jobId]);

  const handleApply = () => {
    if (job?.applicationUrl) {
      window.open(job.applicationUrl, '_blank');
    } else {
      // Mock application process
      alert('Application submitted successfully! You will hear back soon.');
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getJobTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'full-time':
        return 'bg-green-100 text-green-800';
      case 'part-time':
        return 'bg-blue-100 text-blue-800';
      case 'contract':
        return 'bg-purple-100 text-purple-800';
      case 'remote':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="text-lg text-gray-600">Loading job details...</div>
        </div>
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Job Not Found</h1>
          <p className="text-gray-600 mb-6">{error || 'The job you are looking for does not exist.'}</p>
          <button
            onClick={() => router.push('/')}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Jobs
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Jobs
      </button>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {/* Header Section */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {job.title}
              </h1>
              
              <div className="flex flex-wrap items-center gap-4 mb-4">
                <div className="flex items-center text-gray-600">
                  <Building2 className="w-4 h-4 mr-2" />
                  <span className="font-medium">{job.company}</span>
                </div>
                
                <div className="flex items-center text-gray-600">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span>{job.location}</span>
                </div>
                
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getJobTypeColor(job.type)}`}>
                  {job.type.charAt(0).toUpperCase() + job.type.slice(1)}
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  <span>Posted {formatDate(job.postedDate)}</span>
                </div>
                
                {job.salary && (
                  <div className="flex items-center">
                    <DollarSign className="w-4 h-4 mr-1" />
                    <span>{job.salary}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Apply Button */}
            <div className="mt-6 lg:mt-0 lg:ml-6">
              <button
                onClick={handleApply}
                className="w-full lg:w-auto inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Apply Now
                <ExternalLink className="w-4 h-4 ml-2" />
              </button>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <section className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Job Description
                </h2>
                <div className="prose prose-gray max-w-none">
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                    {job.description}
                  </p>
                </div>
              </section>

              {job.requirements && job.requirements.length > 0 && (
                <section>
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">
                    Requirements
                  </h2>
                  <ul className="space-y-3">
                    {job.requirements.map((requirement, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{requirement}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Job Summary
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <dt className="text-sm font-medium text-gray-500 mb-1">Company</dt>
                    <dd className="text-sm text-gray-900">{job.company}</dd>
                  </div>
                  
                  <div>
                    <dt className="text-sm font-medium text-gray-500 mb-1">Location</dt>
                    <dd className="text-sm text-gray-900">{job.location}</dd>
                  </div>
                  
                  <div>
                    <dt className="text-sm font-medium text-gray-500 mb-1">Job Type</dt>
                    <dd className="text-sm text-gray-900 capitalize">{job.type}</dd>
                  </div>
                  
                  {job.salary && (
                    <div>
                      <dt className="text-sm font-medium text-gray-500 mb-1">Salary</dt>
                      <dd className="text-sm text-gray-900">{job.salary}</dd>
                    </div>
                  )}
                  
                  <div>
                    <dt className="text-sm font-medium text-gray-500 mb-1">Posted Date</dt>
                    <dd className="text-sm text-gray-900">{formatDate(job.postedDate)}</dd>
                  </div>
                </div>

                {/* Apply Button (Mobile/Sidebar) */}
                <button
                  onClick={handleApply}
                  className="w-full mt-6 inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Apply Now
                  <ExternalLink className="w-4 h-4 ml-2" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}