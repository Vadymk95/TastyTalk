import { FC } from 'react';

import { Tab } from '@root/components/ui';

interface TabsProps {
    tabs: { key: string; label: string }[];
    activeTab: string | null;
    setActiveTab: (key: string) => void;
    className?: string;
    variant?: 'primary' | 'secondary' | 'accent';
    size?: 'small' | 'medium' | 'large';
    fullwidth?: boolean;
}

export const Tabs: FC<TabsProps> = ({
    tabs,
    activeTab,
    setActiveTab,
    className = '',
    variant = 'primary',
    size = 'small',
    fullwidth = false
}) => {
    const fullwidthStyle = fullwidth ? 'w-full' : '';

    return (
        <div className={`w-full flex-all-center inline-flex ${className}`}>
            <div
                className={`rounded-lg overflow-hidden inline-flex ${fullwidthStyle}`}
            >
                {tabs.map((tab) => (
                    <Tab
                        key={tab.key}
                        size={size}
                        variant={variant}
                        isSelected={activeTab === tab.key}
                        onClick={() => setActiveTab(tab.key)}
                        fullwidth={fullwidth}
                    >
                        {tab.label}
                    </Tab>
                ))}
            </div>
        </div>
    );
};
