export interface TabBarProps {
  activeTab: number;
  setActiveTab: (index: number) => void;
  tabs?: string[];
}
