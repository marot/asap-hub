import { Route, useRouteMatch } from 'react-router-dom';
import {
  PersonalInfoModal,
  ContactInfoModal,
  OnboardModal,
} from '@asap-hub/react-components';
import { UserResponse } from '@asap-hub/model';
import { network } from '@asap-hub/routing';

import { usePatchUserById } from './state';
import Frame from '../../structure/Frame';
import countrySuggestions from './country-suggestions';
import { getInstitutions } from './api';

interface EditingProps {
  user: UserResponse;
  backHref: string;
}

const Editing: React.FC<EditingProps> = ({ user, backHref }) => {
  const { path } = useRouteMatch();
  const route = network({}).users({}).user({ userId: user.id }).about({});

  const patchUser = usePatchUserById(user.id);

  return (
    <>
      <Route exact path={path + route.editPersonalInfo.template}>
        <Frame title="Edit Personal Information">
          <PersonalInfoModal
            {...user}
            countrySuggestions={countrySuggestions.map(
              ({ countryName }) => countryName,
            )}
            loadInstitutionOptions={(searchQuery) =>
              getInstitutions({ searchQuery }).then((data) =>
                data.items.map(({ name }) => name),
              )
            }
            backHref={backHref}
            onSave={patchUser}
          />
        </Frame>
      </Route>
      <Route exact path={path + route.editContactInfo.template}>
        <Frame title="Edit Contact Information">
          <ContactInfoModal
            {...user}
            email={user.contactEmail}
            fallbackEmail={user.email}
            backHref={backHref}
            onSave={patchUser}
          />
        </Frame>
      </Route>
      <Route exact path={path + route.editOnboarded.template}>
        <Frame title="Publish your profile">
          <OnboardModal onSave={patchUser} backHref={backHref} />
        </Frame>
      </Route>
    </>
  );
};

export default Editing;
