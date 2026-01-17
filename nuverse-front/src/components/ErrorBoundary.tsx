"use client";

import React, { Component, ReactNode } from "react";

interface ErrorBoundaryProps {
    children: ReactNode;
    fallback?: ReactNode;
}

interface ErrorBoundaryState {
    hasError: boolean;
    error: Error | null;
}

/**
 * Error Boundary Component
 * 
 * Catches JavaScript errors anywhere in the child component tree,
 * logs those errors, and displays a fallback UI.
 */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error: Error): ErrorBoundaryState {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        console.error("ErrorBoundary caught an error:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            if (this.props.fallback) {
                return this.props.fallback;
            }

            return (
                <div className="flex flex-col items-center justify-center min-h-[400px] p-8 text-center">
                    <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 max-w-md">
                        <div className="text-4xl mb-4">⚠️</div>
                        <h2 className="text-xl font-bold text-white mb-2">Something went wrong</h2>
                        <p className="text-gray-400 mb-4">
                            We encountered an unexpected error. Please try refreshing the page.
                        </p>
                        <button
                            onClick={() => window.location.reload()}
                            className="px-6 py-2 bg-gradient-to-r from-nu-blue-500 to-nu-red-500 text-white rounded-full font-semibold hover:opacity-90 transition-opacity"
                        >
                            Refresh Page
                        </button>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

/**
 * Section Error Boundary
 * 
 * A lighter error boundary for individual sections that shows
 * a less intrusive error message.
 */
export function SectionErrorBoundary({ children, sectionName = "section" }: { children: ReactNode; sectionName?: string }) {
    return (
        <ErrorBoundary
            fallback={
                <div className="py-12 px-4 text-center">
                    <div className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10 inline-block">
                        <p className="text-gray-400">
                            Unable to load {sectionName}. Please try refreshing.
                        </p>
                    </div>
                </div>
            }
        >
            {children}
        </ErrorBoundary>
    );
}
