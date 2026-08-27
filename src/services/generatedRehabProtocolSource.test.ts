import {describe, expect, it} from 'vitest';
import {getGeneratedInjuryProtocols} from './generatedRehabProtocolSource';

describe('generated rehab protocol SEO content', () => {
  it('enriches imported protocols with indexable condition-specific page content', () => {
    const protocols = getGeneratedInjuryProtocols('en');

    expect(protocols.length).toBeGreaterThan(0);

    protocols.forEach((protocol) => {
      expect(protocol.overview).not.toMatch(/structured rehab protocol/i);
      expect(protocol.commonIn.length).toBeGreaterThan(0);
      expect(protocol.redFlags.length).toBeGreaterThan(0);
      expect(protocol.pageContent?.symptoms?.length).toBeGreaterThan(0);
      expect(protocol.pageContent?.faq?.length).toBeGreaterThan(0);
      expect(protocol.pageContent?.rehabNotes?.length).toBeGreaterThan(0);
    });
  });

  it('keeps generated injury summaries tied to the actual protocol phases and exercises', () => {
    const [protocol] = getGeneratedInjuryProtocols('en');
    const exerciseCount = protocol.phases.reduce((total, phase) => total + (phase.exercisePlans?.length || 0), 0);

    expect(protocol.overview).toContain(`${protocol.phases.length} staged phases`);
    expect(protocol.rehabSummary).toContain(`${exerciseCount} exercise entries`);
    expect(protocol.pageContent?.faq?.some((item) => item.a.includes(`${exerciseCount} exercise entries`))).toBe(true);
  });
});
