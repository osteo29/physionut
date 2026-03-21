import React from 'react';

/**
 * Generic skeleton loading placeholder
 * Provides visual feedback while content loads
 */
export function SkeletonLoader({
  className = 'h-8 w-full',
  count = 1,
}: {
  className?: string;
  count?: number;
}) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className={`${className} animate-pulse rounded-lg bg-slate-200`}
        />
      ))}
    </>
  );
}

/**
 * Chart skeleton for lazy-loaded chart components
 */
export function ChartSkeleton() {
  return (
    <div className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6">
      <SkeletonLoader className="h-6 w-1/3" />
      <SkeletonLoader className="h-64 w-full" />
      <div className="grid grid-cols-3 gap-4">
        <SkeletonLoader className="h-12 w-full" />
        <SkeletonLoader className="h-12 w-full" />
        <SkeletonLoader className="h-12 w-full" />
      </div>
    </div>
  );
}

/**
 * Table/List skeleton for async data loading
 */
export function TableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="space-y-3 rounded-2xl border border-slate-200 bg-white p-6">
      <div className="grid grid-cols-4 gap-4">
        <SkeletonLoader className="h-6 w-full" />
        <SkeletonLoader className="h-6 w-full" />
        <SkeletonLoader className="h-6 w-full" />
        <SkeletonLoader className="h-6 w-full" />
      </div>
      <div className="border-t border-slate-100" />
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="grid grid-cols-4 gap-4">
          <SkeletonLoader className="h-4 w-full" />
          <SkeletonLoader className="h-4 w-full" />
          <SkeletonLoader className="h-4 w-full" />
          <SkeletonLoader className="h-4 w-full" />
        </div>
      ))}
    </div>
  );
}

/**
 * AI panel skeleton for lazy-loaded AI components
 */
export function AIPanelSkeleton() {
  return (
    <div className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6">
      <SkeletonLoader className="h-8 w-2/3" />
      <SkeletonLoader className="h-4 w-full" count={3} />
      <div className="flex gap-2">
        <SkeletonLoader className="h-10 w-24" />
        <SkeletonLoader className="h-10 w-24" />
      </div>
    </div>
  );
}

/**
 * PDF generator skeleton
 */
export function PDFGeneratorSkeleton() {
  return (
    <div className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6">
      <SkeletonLoader className="h-6 w-1/2" />
      <SkeletonLoader className="h-4 w-full" count={2} />
      <div className="flex gap-2">
        <SkeletonLoader className="h-12 w-32" />
        <SkeletonLoader className="h-12 w-32" />
      </div>
    </div>
  );
}

/**
 * Content card skeleton
 */
export function ContentCardSkeleton() {
  return (
    <div className="space-y-3 rounded-2xl border border-slate-200 bg-white p-4">
      <SkeletonLoader className="h-40 w-full rounded-lg" />
      <SkeletonLoader className="h-6 w-3/4" />
      <SkeletonLoader className="h-4 w-full" count={2} />
    </div>
  );
}

/**
 * Grid of content cards skeleton
 */
export function ContentGridSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className={`grid grid-cols-1 gap-6 md:grid-cols-${Math.min(count, 3)}`}>
      {Array.from({ length: count }).map((_, i) => (
        <ContentCardSkeleton key={i} />
      ))}
    </div>
  );
}

/**
 * AdSense ad placeholder skeleton
 * Maintains layout shift prevention
 */
export function AdSensePlaceholder({ width = 'w-full', height = 'h-48' }: {width?: string; height?: string}) {
  return (
    <div className={`${width} ${height} animate-pulse rounded-lg bg-slate-100 border border-slate-200`} />
  );
}
