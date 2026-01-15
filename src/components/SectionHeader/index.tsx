import { Link } from 'react-router-dom';

interface SectionHeaderProps {
  title: string;
  linkText?: string;
  linkHref?: string;
}

const SectionHeader = ({ title, linkText, linkHref }: SectionHeaderProps) => {
  return (
    <div className="flex items-center justify-between mb-6 md:mb-8">
      <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900">{title}</h2>
      {linkText && linkHref && (
        <Link
          to={linkHref}
          className="text-sm md:text-base text-amber-600 hover:text-amber-700 font-medium flex items-center gap-1 transition-colors"
        >
          {linkText}
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      )}
    </div>
  );
};

export default SectionHeader;
