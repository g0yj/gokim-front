import CommunityCard from '@/components/community/CommunityCard';
import React from 'react';

const Community = () => {
  return (
    <div>
      <h3>커뮤니티 페이지</h3>
      <div className="flex flex-wrap">
        <CommunityCard  />
        <CommunityCard />
        <CommunityCard  />
        <CommunityCard  />
        <CommunityCard />
        <CommunityCard />
        <CommunityCard />
        <CommunityCard />
      </div>
    </div>
  );
};

export default Community;