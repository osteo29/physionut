/**
 * Google AdSense Optimization Helper
 * Helps with responsive ad placement and CLS (Cumulative Layout Shift) prevention
 */

import React, { useEffect, useState } from 'react';

/**
 * AdSense container component with CLS prevention
 * Maintains reserved space for ads to prevent layout shift
 */
export function AdSenseContainer({
  slot: adSlot,
  format = 'auto',
  responsive = true,
  className = '',
  width = '100%',
  height = 'auto',
}: {
  slot: string;
  format?: 'auto' | 'rectangle' | 'horizontal' | 'vertical';
  responsive?: boolean;
  className?: string;
  width?: string;
  height?: string;
}) {
  useEffect(() => {
    // Push AdSense ads once component mounts
    try {
      (window as any).adsbygoogle = (window as any).adsbygoogle || [];
      (window as any).adsbygoogle.push({});
    } catch (e) {
      // AdSense not loaded yet
    }
  }, []);

  // Pre-reserve space to prevent CLS
  const reservedHeights: Record<string, string> = {
    'auto': '280px', // Default for responsive
    'rectangle': '250px',
    'horizontal': '90px',
    'vertical': '600px',
  };

  return (
    <div
      className={`flex justify-center overflow-hidden bg-slate-50 ${className}`}
      style={{
        width: width,
        minHeight: height !== 'auto' ? height : reservedHeights[format],
        marginBottom: '1rem',
      }}
      data-ad-layout="in-article"
    >
      <ins
        className="adsbygoogle"
        style={{
          display: 'block',
          width: width,
          minHeight: reservedHeights[format],
        }}
        data-ad-client={`ca-${process.env.VITE_GOOGLE_ADSENSE_ID || 'pub-0000000000000000'}`}
        data-ad-slot={adSlot}
        data-ad-format={format}
        data-full-width-responsive={responsive}
      />
    </div>
  );
}

/**
 * Ad placeholder for lazy-loaded sections
 * Reserves space while content loads
 */
export function AdPlaceholder({
  width = '100%',
  height = '280px',
  className = '',
}: {
  width?: string;
  height?: string;
  className?: string;
}) {
  return (
    <div
      className={`bg-gradient-to-r from-slate-100 to-slate-200 ${className}`}
      style={{
        width: width,
        height: height,
        minHeight: height,
      }}
    />
  );
}

/**
 * Recommended ad placements configuration
 */
export const AD_PLACEMENTS = {
  // Article pages
  ARTICLE_TOP: {
    slot: '5678901234', // Replace with your slot ID
    format: 'auto' as const,
    position: 'top',
  },
  ARTICLE_MIDDLE: {
    slot: '5678901235',
    format: 'auto' as const,
    position: 'middle',
  },
  ARTICLE_BOTTOM: {
    slot: '5678901236',
    format: 'auto' as const,
    position: 'bottom',
  },

  // Sidebar ads
  SIDEBAR_TOP: {
    slot: '5678901237',
    format: 'vertical' as const,
    width: '300px',
    height: '600px',
  },

  // In-between calculator results
  CALCULATOR_RESULTS: {
    slot: '5678901238',
    format: 'horizontal' as const,
  },

  // Injury protocol pages
  INJURY_DETAIL_TOP: {
    slot: '5678901239',
    format: 'auto' as const,
  },

  // Mobile banner
  MOBILE_BANNER: {
    slot: '5678901240',
    format: 'horizontal' as const,
  },
};

/**
 * Best practices for AdSense on medical/health sites:
 * 1. Never place ads near medical advice or sensitive health information
 * 2. Ensure ads don't obstruct crucial content
 * 3. Use responsive format (auto) for better performance
 * 4. Reserve vertical space to prevent CLS
 * 5. Follow Google's ad placement policies for medical content
 * 6. Consider user experience - don't overload with ads
 */

/**
 * Check if current device is mobile for ad optimization
 */
export function isMobileDevice(): boolean {
  if (typeof window === 'undefined') return false;
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent,
  );
}

/**
 * Get optimal ad slot based on device and content type
 */
export function getOptimalAdSlot(
  contentType: 'article' | 'calculator' | 'injury' | 'dashboard',
  position: 'top' | 'middle' | 'bottom' = 'middle',
): (typeof AD_PLACEMENTS)[keyof typeof AD_PLACEMENTS] {
  const isMobile = isMobileDevice();

  if (contentType === 'article') {
    if (position === 'top') return AD_PLACEMENTS.ARTICLE_TOP;
    if (position === 'middle') return AD_PLACEMENTS.ARTICLE_MIDDLE;
    return AD_PLACEMENTS.ARTICLE_BOTTOM;
  }

  if (contentType === 'calculator') {
    return AD_PLACEMENTS.CALCULATOR_RESULTS;
  }

  if (contentType === 'injury') {
    return AD_PLACEMENTS.INJURY_DETAIL_TOP;
  }

  return isMobile ? AD_PLACEMENTS.MOBILE_BANNER : AD_PLACEMENTS.SIDEBAR_TOP;
}
