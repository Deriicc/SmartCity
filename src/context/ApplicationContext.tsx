import React, {createContext, useState, useContext} from 'react';

interface Application {
  id: string;
  jobTitle: string;
  company: string;
  salary: string;
  applyTime: string;
  status: '待回复' | '已回复';
  response: string | null;
}

interface ApplicationContextType {
  applications: Application[];
  addApplication: (application: Application) => void;
}

const ApplicationContext = createContext<ApplicationContextType | undefined>(
  undefined,
);

export const ApplicationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [applications, setApplications] = useState<Application[]>([
    {
      id: '1',
      jobTitle: '前端开发工程师',
      company: '科技有限公司',
      salary: '15-25K',
      applyTime: '2024-03-15 14:30',
      status: '已回复',
      response: '期待您来面试',
    },
    {
      id: '2',
      jobTitle: '后端开发工程师',
      company: '互联网公司',
      salary: '20-35K',
      applyTime: '2024-03-14 10:20',
      status: '待回复',
      response: null,
    },
  ]);

  const addApplication = (application: Application) => {
    setApplications(prev => [application, ...prev]);
  };

  return (
    <ApplicationContext.Provider value={{applications, addApplication}}>
      {children}
    </ApplicationContext.Provider>
  );
};

export const useApplications = () => {
  const context = useContext(ApplicationContext);
  if (context === undefined) {
    throw new Error(
      'useApplications must be used within an ApplicationProvider',
    );
  }
  return context;
};
