import { Component, type ReactNode } from 'react';

/** A failed route download must leave a useful recovery path. */
export default class RouteErrorBoundary extends Component<
    { children: ReactNode },
    { failed: boolean }
> {
    state = { failed: false };
    static getDerivedStateFromError() {
        return { failed: true };
    }
    render() {
        if (this.state.failed)
            return (
                <section role="alert" className="route-error">
                    <h1>This page couldn’t load.</h1>
                    <p>
                        Please try again. Your information has not been
                        submitted.
                    </p>
                    <button onClick={() => window.location.reload()}>
                        Try loading again
                    </button>
                    <a href="/">Return to A Story</a>
                </section>
            );
        return this.props.children;
    }
}
