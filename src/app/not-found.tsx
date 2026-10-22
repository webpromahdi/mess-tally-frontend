import Link from "next/link";

/**
 * Global 404 Not Found page.
 * Customize the UI to match your project's design.
 */
export default function NotFound() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-6 text-center">
      <div className="max-w-md">
        <p className="text-sm font-semibold text-muted-foreground uppercase tracking-widest mb-2">
          404 Error
        </p>
        <h1 className="text-4xl font-bold tracking-tight mb-3">
          Page not found
        </h1>
        <p className="text-muted-foreground text-sm mb-8">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          Go home
        </Link>
      </div>
    </div>
  );
}
