// Create a file 'types/next-nprogress-bar.d.ts' if needed
declare module 'next-nprogress-bar' {
    export interface ProgressBarProps {
        color: string;
        height: string;
        options: { showSpinner: boolean };
        shallowRouting: boolean;
    }

    const ProgressBar: React.FC<ProgressBarProps>;
    export { ProgressBar };
}
