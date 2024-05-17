import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import DashSideBar from '../Components/DashSideBar';
import DashProfile from '../Components/DashProfile';

function Dashboard() {
  const location = useLocation();
  const [tab, setTab] = useState('');
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');
    // console.log(tabFromUrl);
    if (tabFromUrl) setTab(tabFromUrl);
  }, [location.search]);
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div>
        {/* SideBar */}
        <DashSideBar />
      </div>
      {/* profile */}
      {tab === 'profile' && <DashProfile />}
    </div>
  );
}

export default Dashboard;
