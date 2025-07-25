import { useDispatch } from 'react-redux';
import { setActiveTab, useTabs } from '../../../app/store/reducers/tabSlice';
import './paymentsTable.scss';
import {
  PaymentsTabFinancial,
  PaymentsTabHistory,
  PaymentsTabInvoicing,
  PaymentsTabReminder,
} from '../../../entities/PaymentsTabs';
export const PaymentsTable = () => {
  const dispatch = useDispatch();
  const tabId = 'createNewGroup';
  const tabsState = useTabs();
  const activeTab = tabsState[tabId] ?? 0;
  const tabs = [
    { label: 'Выставление счёта', content: <PaymentsTabInvoicing /> },
    { label: 'История оплат', content: <PaymentsTabHistory /> },
    { label: 'Напоминания об оплате', content: <PaymentsTabReminder /> },
    { label: 'Финансовая отчётность', content: <PaymentsTabFinancial /> },
  ];
  return (
    <div className='payments'>
      <div className='container'>
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => dispatch(setActiveTab({ tabId, index }))}
            className={`addTeacher__tabs-button ${
              index === activeTab && 'active'
            }`}
          >
            {tab.label}
          </button>
        ))}
        {tabs[activeTab]?.content}
      </div>
    </div>
  );
};
