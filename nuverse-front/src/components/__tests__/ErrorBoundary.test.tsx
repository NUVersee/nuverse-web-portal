import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ErrorBoundary, SectionErrorBoundary } from '../ErrorBoundary';

// Mock console.error to check it was called
const mockConsoleError = vi.spyOn(console, 'error').mockImplementation(() => { });

// Component that throws an error
const ThrowError = ({ shouldThrow }: { shouldThrow: boolean }) => {
    if (shouldThrow) {
        throw new Error('Test error');
    }
    return <div>No error</div>;
};

describe('ErrorBoundary', () => {
    afterEach(() => {
        mockConsoleError.mockClear();
    });

    it('renders children when there is no error', () => {
        render(
            <ErrorBoundary>
                <div>Test content</div>
            </ErrorBoundary>
        );
        expect(screen.getByText('Test content')).toBeInTheDocument();
    });

    it('renders fallback UI when there is an error', () => {
        render(
            <ErrorBoundary>
                <ThrowError shouldThrow={true} />
            </ErrorBoundary>
        );
        expect(screen.getByText('Something went wrong')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /refresh/i })).toBeInTheDocument();
    });

    it('renders custom fallback when provided', () => {
        render(
            <ErrorBoundary fallback={<div>Custom error message</div>}>
                <ThrowError shouldThrow={true} />
            </ErrorBoundary>
        );
        expect(screen.getByText('Custom error message')).toBeInTheDocument();
    });
});

describe('SectionErrorBoundary', () => {
    afterEach(() => {
        mockConsoleError.mockClear();
    });

    it('renders children when there is no error', () => {
        render(
            <SectionErrorBoundary sectionName="test section">
                <div>Section content</div>
            </SectionErrorBoundary>
        );
        expect(screen.getByText('Section content')).toBeInTheDocument();
    });

    it('renders section-specific error message', () => {
        render(
            <SectionErrorBoundary sectionName="test section">
                <ThrowError shouldThrow={true} />
            </SectionErrorBoundary>
        );
        expect(screen.getByText(/unable to load test section/i)).toBeInTheDocument();
    });
});
