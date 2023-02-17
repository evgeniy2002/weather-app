import React from 'react';
import ContentLoader from 'react-content-loader';

const MiniLoader = (props) => (
  <ContentLoader
    speed={2}
    width={180}
    height={228}
    viewBox="0 0 183 228"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}>
    <rect x="0" y="0" rx="11" ry="11" width="183" height="228" />
  </ContentLoader>
);

export default MiniLoader;
