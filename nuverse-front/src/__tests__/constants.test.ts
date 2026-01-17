import { describe, it, expect } from 'vitest';
import {
    API_BASE_URL,
    NAVIGATION_ITEMS,
    CONTACT_INFO,
    SOCIAL_LINKS,
    BRAND,
    META,
} from '../constants';

describe('Constants', () => {
    describe('API_BASE_URL', () => {
        it('should be defined', () => {
            expect(API_BASE_URL).toBeDefined();
        });

        it('should be a valid URL string', () => {
            expect(typeof API_BASE_URL).toBe('string');
            expect(API_BASE_URL).toMatch(/^https?:\/\//);
        });
    });

    describe('NAVIGATION_ITEMS', () => {
        it('should have at least one navigation item', () => {
            expect(NAVIGATION_ITEMS.length).toBeGreaterThan(0);
        });

        it('should have name and href for each item', () => {
            NAVIGATION_ITEMS.forEach((item) => {
                expect(item.name).toBeDefined();
                expect(item.href).toBeDefined();
            });
        });

        it('should include Home as first item', () => {
            expect(NAVIGATION_ITEMS[0].name).toBe('Home');
            expect(NAVIGATION_ITEMS[0].href).toBe('/');
        });
    });

    describe('CONTACT_INFO', () => {
        it('should have email, phone, and location', () => {
            expect(CONTACT_INFO.email).toBeDefined();
            expect(CONTACT_INFO.phone).toBeDefined();
            expect(CONTACT_INFO.location).toBeDefined();
        });

        it('should have valid email format', () => {
            expect(CONTACT_INFO.email).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
        });
    });

    describe('SOCIAL_LINKS', () => {
        it('should have all social platform links', () => {
            expect(SOCIAL_LINKS.facebook).toBeDefined();
            expect(SOCIAL_LINKS.twitter).toBeDefined();
            expect(SOCIAL_LINKS.linkedin).toBeDefined();
            expect(SOCIAL_LINKS.instagram).toBeDefined();
        });

        it('should have valid URL format for all links', () => {
            Object.values(SOCIAL_LINKS).forEach((url) => {
                expect(url).toMatch(/^https?:\/\//);
            });
        });
    });

    describe('BRAND', () => {
        it('should have required brand properties', () => {
            expect(BRAND.name).toBe('NUverse');
            expect(BRAND.logoPath).toBeDefined();
            expect(BRAND.faviconPath).toBeDefined();
            expect(BRAND.tagline).toBeDefined();
        });
    });

    describe('META', () => {
        it('should have title and description', () => {
            expect(META.title).toBeDefined();
            expect(META.description).toBeDefined();
        });

        it('should have dynamic copyright year', () => {
            const currentYear = new Date().getFullYear().toString();
            expect(META.copyright).toContain(currentYear);
        });
    });
});
