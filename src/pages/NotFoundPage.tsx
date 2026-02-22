import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';

export function NotFoundPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center relative">
      <p className="text-[10rem] sm:text-[14rem] font-heading font-light text-white/[0.03] leading-none select-none">
        404
      </p>
      <h1 className="font-heading text-3xl sm:text-4xl font-light text-chalk -mt-8 relative z-10 italic">
        Trail not found
      </h1>
      <p className="mt-4 text-text-secondary max-w-md mx-auto font-light leading-relaxed">
        Looks like this route doesn't go anywhere. Let's get you back on the wall.
      </p>
      <div className="mt-10">
        <Link to="/">
          <Button size="lg">Back to Base Camp</Button>
        </Link>
      </div>
    </div>
  );
}
