import { FC } from 'react';

import { Tab } from '@root/components/ui';

interface TabsProps {
    tabs: { key: string; label: string }[];
    activeTab: string;
    setActiveTab: (key: string) => void;
    className?: string;
}

export const Tabs: FC<TabsProps> = ({
    tabs,
    activeTab,
    setActiveTab,
    className = ''
}) => {
    return (
        <div className={`flex-all-center ${className}`}>
            {tabs.map((tab) => (
                <Tab
                    key={tab.key}
                    isSelected={activeTab === tab.key}
                    onClick={() => setActiveTab(tab.key)}
                >
                    {tab.label}
                </Tab>
            ))}
        </div>
    );
};
