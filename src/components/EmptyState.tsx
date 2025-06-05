import { Briefcase, Plus } from 'lucide-react';
import Link from 'next/link';

interface EmptyStateProps {
  title: string;
  description: string;
  showAddButton?: boolean;
}

export default function EmptyState({ title, description, showAddButton = false }: EmptyStateProps) {
  return (
    <div className="text-center py-12">
      <Briefcase className="mx-auto h-12 w-12 text-gray-400 mb-4" />
      <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 mb-6">{description}</p>
      {showAddButton && (
        <Link href="/jobs/add" className="btn-primary inline-flex items-center px-4 py-2">
          <Plus className="h-4 w-4 mr-2" />
          Add First Job
        </Link>
      )}
    </div>
  );
}