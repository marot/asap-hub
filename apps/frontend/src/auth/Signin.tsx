import React from 'react';
import { useAuth0 } from '@asap-hub/react-context';
import { WelcomePage } from '@asap-hub/react-components';

const Home: React.FC<{}> = () => {
  const { loginWithRedirect } = useAuth0();

  const signin = () => {
    // TODO pass a redirect_uri with a query param containing the current page;
    // and send the user back to that original page in handleRedirectCallback
    return loginWithRedirect({ prompt: 'login' });
  };
  return <WelcomePage onClick={signin} />;
};

export default Home;
