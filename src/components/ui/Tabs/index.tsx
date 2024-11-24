import { FC } from 'react';

import { Tab } from '@root/components/ui';

interface TabsProps {
    tabs: { key: string; label: string }[];
    activeTab: string;
    setActiveTab: (key: string) => void;
    className?: string;
    variant?: 'primary' | 'secondary' | 'accent';
}

export const Tabs: FC<TabsProps> = ({
    tabs,
    activeTab,
    setActiveTab,
    className = '',
    variant = 'primary'
}) => {
    return (
        <div className={`w-full flex-all-center inline-flex ${className}`}>
            <div className="rounded-lg overflow-hidden inline-flex">
                {tabs.map((tab) => (
                    <Tab
                        key={tab.key}
                        size="small"
                        variant={variant}
                        isSelected={activeTab === tab.key}
                        onClick={() => setActiveTab(tab.key)}
                    >
                        {tab.label}
                    </Tab>
                ))}
            </div>
        </div>
    );
};
