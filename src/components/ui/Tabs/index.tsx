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
        <div className={`flex-all-center ${className}`}>
            {tabs.map((tab) => (
                <Tab
                    key={tab.key}
                    variant={variant}
                    isSelected={activeTab === tab.key}
                    onClick={() => setActiveTab(tab.key)}
                >
                    {tab.label}
                </Tab>
            ))}
        </div>
    );
};
