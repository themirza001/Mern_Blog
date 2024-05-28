import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import DashSideBar from '../Components/DashSideBar';
import DashProfile from '../Components/DashProfile';
import DashPosts from '../Components/DashPosts';
import DashUsers from '../Components/DashUsers';
import DashComments from '../Components/DashComments';
import DashboardComponent from '../Components/DashboardComponent';

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
      {/* posts */}
      {tab === 'posts' && <DashPosts />}

      {/* Users */}
      {tab === 'users' && <DashUsers />}
      {/* Comments */}
      {tab === 'comments' && <DashComments />}

      {/* DashBoard */}
      {tab === 'dash' && <DashboardComponent />}
    </div>
  );
}

export default Dashboard;
