import { describe, it, expect } from 'vitest';
import { serviceSchema, pricingSchema, faqSchema } from '../src/content/schemas';

describe('service schema', () => {
  it('defaults featured to false', () => {
    const parsed = serviceSchema.parse({ title: 'AC Repair', summary: 'Fast fixes', icon: 'lucide:wind', order: 1 });
    expect(parsed.featured).toBe(false);
  });
  it('rejects a missing title', () => {
    expect(() => serviceSchema.parse({ summary: 'x', icon: 'i', order: 1 })).toThrow();
  });
});

describe('pricing schema', () => {
  it('defaults period and featured, requires features', () => {
    const parsed = pricingSchema.parse({ name: 'Tier', price: '$39', features: ['a'], order: 1 });
    expect(parsed.period).toBe('/mo');
    expect(parsed.featured).toBe(false);
    expect(() => pricingSchema.parse({ name: 'Tier', price: '$39', order: 1 })).toThrow();
  });
});

describe('faq schema', () => {
  it('requires question and order', () => {
    expect(() => faqSchema.parse({ question: 'Q?' })).toThrow();
  });
});
