import React from 'react';
import ContentLoader from 'react-content-loader';

const LoadingBlock = (props) => (
  <ContentLoader
    speed={2}
    width={565}
    height={275}
    viewBox="0 0 565 275"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}>
    <rect x="1" y="1" rx="11" ry="11" width="550" height="270" />
  </ContentLoader>
);

export default LoadingBlock;
