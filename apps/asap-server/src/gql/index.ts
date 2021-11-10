/* eslint-disable */
import * as graphql from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

const documents = {
  '\n  query FetchCalendar($id: String!) {\n    findCalendarsContent(id: $id) {\n      id\n      created\n      lastModified\n      flatData {\n        googleCalendarId\n        name\n        color\n        syncToken\n        resourceId\n        expirationDate\n      }\n    }\n  }\n':
    graphql.FetchCalendarDocument,
  '\n  fragment EventContent on Events {\n    id\n    lastModified\n    created\n    flatData {\n      description\n      endDate\n      endDateTimeZone\n      startDate\n      startDateTimeZone\n      meetingLink\n      eventLink\n      status\n      tags\n      title\n      notesPermanentlyUnavailable\n      notes\n      videoRecordingPermanentlyUnavailable\n      videoRecording\n      presentationPermanentlyUnavailable\n      presentation\n      meetingMaterialsPermanentlyUnavailable\n      meetingMaterials {\n        url\n        title\n      }\n      calendar {\n        flatData {\n          googleCalendarId\n          color\n          name\n        }\n        referencingGroupsContents {\n          ...GroupsContent\n        }\n      }\n      thumbnail {\n        id\n      }\n    }\n  }\n  \n':
    graphql.EventContentFragmentDoc,
  '\n  query FetchEvents(\n    $top: Int\n    $skip: Int\n    $filter: String\n    $order: String\n    $withResearchOutputs: Boolean = false\n    $withTeams: Boolean = false\n  ) {\n    queryEventsContentsWithTotal(\n      top: $top\n      skip: $skip\n      filter: $filter\n      orderby: $order\n    ) {\n      total\n      items {\n        ...EventContent\n      }\n    }\n  }\n  \n':
    graphql.FetchEventsDocument,
  '\n  query FetchEvent(\n    $id: String!\n    $withResearchOutputs: Boolean = false\n    $withTeams: Boolean = false\n  ) {\n    findEventsContent(id: $id) {\n      ...EventContent\n    }\n  }\n  \n':
    graphql.FetchEventDocument,
  '\n  query FetchGroupCalendar($id: String!) {\n    findGroupsContent(id: $id) {\n      flatData {\n        calendars {\n          id\n        }\n      }\n    }\n  }\n':
    graphql.FetchGroupCalendarDocument,
  '\n  fragment GroupsContent on Groups {\n    id\n    created\n    lastModified\n    flatData {\n      name\n      description\n      tags\n      tools {\n        slack\n        googleDrive\n      }\n      teams {\n        ...TeamsContent\n      }\n      leaders {\n        role\n        user {\n          id\n          created\n          lastModified\n          flatData {\n            avatar {\n              id\n            }\n            biography\n            degree\n            email\n            contactEmail\n            firstName\n            institution\n            jobTitle\n            lastModifiedDate\n            lastName\n            country\n            city\n            onboarded\n            orcid\n            orcidLastModifiedDate\n            orcidLastSyncDate\n            orcidWorks {\n              doi\n              id\n              lastModifiedDate\n              publicationDate\n              title\n              type\n            }\n            questions {\n              question\n            }\n            expertiseAndResourceTags\n            expertiseAndResourceDescription\n            teams {\n              role\n              mainResearchInterests\n              responsibilities\n              id {\n                id\n                flatData {\n                  displayName\n                  proposal {\n                    id\n                  }\n                }\n              }\n            }\n            social {\n              github\n              googleScholar\n              linkedIn\n              researcherId\n              researchGate\n              twitter\n              website1\n              website2\n            }\n            role\n            responsibilities\n            reachOut\n            labs {\n              id\n              flatData {\n                name\n              }\n            }\n          }\n        }\n      }\n      calendars {\n        id\n        flatData {\n          color\n          googleCalendarId\n          name\n        }\n      }\n      thumbnail {\n        id\n      }\n    }\n  }\n  \n':
    graphql.GroupsContentFragmentDoc,
  '\n  query FetchGroups(\n    $top: Int\n    $skip: Int\n    $filter: String\n    $withResearchOutputs: Boolean = false\n    $withTeams: Boolean = false\n  ) {\n    queryGroupsContentsWithTotal(\n      top: $top\n      skip: $skip\n      filter: $filter\n      orderby: "data/name/iv"\n    ) {\n      total\n      items {\n        ...GroupsContent\n      }\n    }\n  }\n  \n':
    graphql.FetchGroupsDocument,
  '\n  query FetchGroup(\n    $id: String!\n    $withResearchOutputs: Boolean = false\n    $withTeams: Boolean = false\n  ) {\n    findGroupsContent(id: $id) {\n      ...GroupsContent\n    }\n  }\n  \n':
    graphql.FetchGroupDocument,
  '\n  fragment ResearchOutputContent on ResearchOutputs {\n    id\n    created\n    lastModified\n    flatData {\n      title\n      type\n      subtype\n      description\n      link\n      addedDate\n      publishDate\n      doi\n      labCatalogNumber\n      accession\n      rrid\n      tags\n      lastUpdatedPartial\n      accessInstructions\n      sharingStatus\n      asapFunded\n      usedInAPublication\n      authors {\n        __typename\n        ... on Users {\n          id\n          created\n          lastModified\n          flatData {\n            avatar {\n              id\n            }\n            biography\n            degree\n            email\n            contactEmail\n            firstName\n            institution\n            jobTitle\n            lastModifiedDate\n            lastName\n            country\n            city\n            onboarded\n            orcid\n            orcidLastModifiedDate\n            orcidLastSyncDate\n            orcidWorks {\n              doi\n              id\n              lastModifiedDate\n              publicationDate\n              title\n              type\n            }\n            questions {\n              question\n            }\n            expertiseAndResourceTags\n            expertiseAndResourceDescription\n            teams {\n              role\n              mainResearchInterests\n              responsibilities\n              id {\n                id\n                flatData {\n                  displayName\n                  proposal {\n                    id\n                  }\n                }\n              }\n            }\n            social {\n              github\n              googleScholar\n              linkedIn\n              researcherId\n              researchGate\n              twitter\n              website1\n              website2\n            }\n            role\n            responsibilities\n            reachOut\n            labs {\n              id\n              flatData {\n                name\n              }\n            }\n          }\n        }\n        ... on ExternalAuthors {\n          id\n          created\n          lastModified\n          flatData {\n            name\n            orcid\n          }\n        }\n      }\n      labs {\n        id\n        flatData {\n          name\n        }\n      }\n    }\n    referencingTeamsContents @include(if: $withTeams) {\n      id\n      created\n      lastModified\n      flatData {\n        displayName\n      }\n      referencingUsersContents {\n        flatData {\n          email\n          teams {\n            role\n            id {\n              id\n            }\n          }\n        }\n      }\n    }\n  }\n':
    graphql.ResearchOutputContentFragmentDoc,
  '\n  query FetchResearchOutput($id: String!, $withTeams: Boolean!) {\n    findResearchOutputsContent(id: $id) {\n      ...ResearchOutputContent\n    }\n  }\n  \n':
    graphql.FetchResearchOutputDocument,
  '\n  query FetchResearchOutputs(\n    $top: Int\n    $skip: Int\n    $filter: String\n    $withTeams: Boolean!\n  ) {\n    queryResearchOutputsContentsWithTotal(\n      top: $top\n      skip: $skip\n      filter: $filter\n      orderby: "created desc"\n    ) {\n      total\n      items {\n        ...ResearchOutputContent\n      }\n    }\n  }\n  \n':
    graphql.FetchResearchOutputsDocument,
  '\n  fragment TeamsContent on Teams {\n    id\n    created\n    lastModified\n    flatData {\n      applicationNumber\n      displayName\n      outputs @include(if: $withResearchOutputs) {\n        ...ResearchOutputContent\n      }\n      projectSummary\n      projectTitle\n      expertiseAndResourceTags\n      proposal {\n        id\n      }\n      tools {\n        description\n        name\n        url\n      }\n    }\n    referencingUsersContents(filter: "data/onboarded/iv eq true") {\n      id\n      created\n      lastModified\n      flatData {\n        avatar {\n          id\n        }\n        biography\n        degree\n        email\n        contactEmail\n        firstName\n        institution\n        jobTitle\n        lastModifiedDate\n        lastName\n        country\n        city\n        onboarded\n        orcid\n        orcidLastModifiedDate\n        orcidLastSyncDate\n        orcidWorks {\n          doi\n          id\n          lastModifiedDate\n          publicationDate\n          title\n          type\n        }\n        questions {\n          question\n        }\n        expertiseAndResourceTags\n        expertiseAndResourceDescription\n        teams {\n          role\n          mainResearchInterests\n          responsibilities\n          id {\n            id\n            flatData {\n              displayName\n              proposal {\n                id\n              }\n            }\n          }\n        }\n        social {\n          github\n          googleScholar\n          linkedIn\n          researcherId\n          researchGate\n          twitter\n          website1\n          website2\n        }\n        role\n        responsibilities\n        reachOut\n        labs {\n          id\n          flatData {\n            name\n          }\n        }\n      }\n    }\n  }\n  \n':
    graphql.TeamsContentFragmentDoc,
  '\n  query FetchTeam(\n    $id: String!\n    $withResearchOutputs: Boolean = false\n    $withTeams: Boolean = false\n  ) {\n    findTeamsContent(id: $id) {\n      ...TeamsContent\n    }\n  }\n  \n':
    graphql.FetchTeamDocument,
  '\n  query FetchTeams(\n    $top: Int\n    $skip: Int\n    $filter: String\n    $withResearchOutputs: Boolean = true\n    $withTeams: Boolean = false\n  ) {\n    queryTeamsContentsWithTotal(\n      top: $top\n      skip: $skip\n      filter: $filter\n      orderby: "data/displayName/iv"\n    ) {\n      total\n      items {\n        ...TeamsContent\n      }\n    }\n  }\n  \n':
    graphql.FetchTeamsDocument,
  '\n  fragment UsersContent on Users {\n    id\n    created\n    lastModified\n    flatData {\n      avatar {\n        id\n      }\n      biography\n      degree\n      email\n      contactEmail\n      firstName\n      institution\n      jobTitle\n      lastModifiedDate\n      lastName\n      country\n      city\n      onboarded\n      orcid\n      orcidLastModifiedDate\n      orcidLastSyncDate\n      orcidWorks {\n        doi\n        id\n        lastModifiedDate\n        publicationDate\n        title\n        type\n      }\n      questions {\n        question\n      }\n      expertiseAndResourceTags\n      expertiseAndResourceDescription\n      teams {\n        role\n        mainResearchInterests\n        responsibilities\n        id {\n          id\n          flatData {\n            displayName\n            proposal {\n              id\n            }\n          }\n        }\n      }\n      social {\n        github\n        googleScholar\n        linkedIn\n        researcherId\n        researchGate\n        twitter\n        website1\n        website2\n      }\n      role\n      responsibilities\n      reachOut\n      labs {\n        id\n        flatData {\n          name\n        }\n      }\n    }\n  }\n':
    graphql.UsersContentFragmentDoc,
  '\n  query FetchUser($id: String!) {\n    findUsersContent(id: $id) {\n      ...UsersContent\n    }\n  }\n  \n':
    graphql.FetchUserDocument,
  '\n  query FetchUsers($top: Int, $skip: Int, $filter: String) {\n    queryUsersContentsWithTotal(\n      top: $top\n      skip: $skip\n      filter: $filter\n      orderby: "data/firstName/iv,data/lastName/iv"\n    ) {\n      total\n      items {\n        ...UsersContent\n      }\n    }\n  }\n  \n':
    graphql.FetchUsersDocument,
};

export function gql(
  source: '\n  query FetchCalendar($id: String!) {\n    findCalendarsContent(id: $id) {\n      id\n      created\n      lastModified\n      flatData {\n        googleCalendarId\n        name\n        color\n        syncToken\n        resourceId\n        expirationDate\n      }\n    }\n  }\n',
): typeof documents['\n  query FetchCalendar($id: String!) {\n    findCalendarsContent(id: $id) {\n      id\n      created\n      lastModified\n      flatData {\n        googleCalendarId\n        name\n        color\n        syncToken\n        resourceId\n        expirationDate\n      }\n    }\n  }\n'];
export function gql(
  source: '\n  fragment EventContent on Events {\n    id\n    lastModified\n    created\n    flatData {\n      description\n      endDate\n      endDateTimeZone\n      startDate\n      startDateTimeZone\n      meetingLink\n      eventLink\n      status\n      tags\n      title\n      notesPermanentlyUnavailable\n      notes\n      videoRecordingPermanentlyUnavailable\n      videoRecording\n      presentationPermanentlyUnavailable\n      presentation\n      meetingMaterialsPermanentlyUnavailable\n      meetingMaterials {\n        url\n        title\n      }\n      calendar {\n        flatData {\n          googleCalendarId\n          color\n          name\n        }\n        referencingGroupsContents {\n          ...GroupsContent\n        }\n      }\n      thumbnail {\n        id\n      }\n    }\n  }\n  \n',
): typeof documents['\n  fragment EventContent on Events {\n    id\n    lastModified\n    created\n    flatData {\n      description\n      endDate\n      endDateTimeZone\n      startDate\n      startDateTimeZone\n      meetingLink\n      eventLink\n      status\n      tags\n      title\n      notesPermanentlyUnavailable\n      notes\n      videoRecordingPermanentlyUnavailable\n      videoRecording\n      presentationPermanentlyUnavailable\n      presentation\n      meetingMaterialsPermanentlyUnavailable\n      meetingMaterials {\n        url\n        title\n      }\n      calendar {\n        flatData {\n          googleCalendarId\n          color\n          name\n        }\n        referencingGroupsContents {\n          ...GroupsContent\n        }\n      }\n      thumbnail {\n        id\n      }\n    }\n  }\n  \n'];
export function gql(
  source: '\n  query FetchEvents(\n    $top: Int\n    $skip: Int\n    $filter: String\n    $order: String\n    $withResearchOutputs: Boolean = false\n    $withTeams: Boolean = false\n  ) {\n    queryEventsContentsWithTotal(\n      top: $top\n      skip: $skip\n      filter: $filter\n      orderby: $order\n    ) {\n      total\n      items {\n        ...EventContent\n      }\n    }\n  }\n  \n',
): typeof documents['\n  query FetchEvents(\n    $top: Int\n    $skip: Int\n    $filter: String\n    $order: String\n    $withResearchOutputs: Boolean = false\n    $withTeams: Boolean = false\n  ) {\n    queryEventsContentsWithTotal(\n      top: $top\n      skip: $skip\n      filter: $filter\n      orderby: $order\n    ) {\n      total\n      items {\n        ...EventContent\n      }\n    }\n  }\n  \n'];
export function gql(
  source: '\n  query FetchEvent(\n    $id: String!\n    $withResearchOutputs: Boolean = false\n    $withTeams: Boolean = false\n  ) {\n    findEventsContent(id: $id) {\n      ...EventContent\n    }\n  }\n  \n',
): typeof documents['\n  query FetchEvent(\n    $id: String!\n    $withResearchOutputs: Boolean = false\n    $withTeams: Boolean = false\n  ) {\n    findEventsContent(id: $id) {\n      ...EventContent\n    }\n  }\n  \n'];
export function gql(
  source: '\n  query FetchGroupCalendar($id: String!) {\n    findGroupsContent(id: $id) {\n      flatData {\n        calendars {\n          id\n        }\n      }\n    }\n  }\n',
): typeof documents['\n  query FetchGroupCalendar($id: String!) {\n    findGroupsContent(id: $id) {\n      flatData {\n        calendars {\n          id\n        }\n      }\n    }\n  }\n'];
export function gql(
  source: '\n  fragment GroupsContent on Groups {\n    id\n    created\n    lastModified\n    flatData {\n      name\n      description\n      tags\n      tools {\n        slack\n        googleDrive\n      }\n      teams {\n        ...TeamsContent\n      }\n      leaders {\n        role\n        user {\n          id\n          created\n          lastModified\n          flatData {\n            avatar {\n              id\n            }\n            biography\n            degree\n            email\n            contactEmail\n            firstName\n            institution\n            jobTitle\n            lastModifiedDate\n            lastName\n            country\n            city\n            onboarded\n            orcid\n            orcidLastModifiedDate\n            orcidLastSyncDate\n            orcidWorks {\n              doi\n              id\n              lastModifiedDate\n              publicationDate\n              title\n              type\n            }\n            questions {\n              question\n            }\n            expertiseAndResourceTags\n            expertiseAndResourceDescription\n            teams {\n              role\n              mainResearchInterests\n              responsibilities\n              id {\n                id\n                flatData {\n                  displayName\n                  proposal {\n                    id\n                  }\n                }\n              }\n            }\n            social {\n              github\n              googleScholar\n              linkedIn\n              researcherId\n              researchGate\n              twitter\n              website1\n              website2\n            }\n            role\n            responsibilities\n            reachOut\n            labs {\n              id\n              flatData {\n                name\n              }\n            }\n          }\n        }\n      }\n      calendars {\n        id\n        flatData {\n          color\n          googleCalendarId\n          name\n        }\n      }\n      thumbnail {\n        id\n      }\n    }\n  }\n  \n',
): typeof documents['\n  fragment GroupsContent on Groups {\n    id\n    created\n    lastModified\n    flatData {\n      name\n      description\n      tags\n      tools {\n        slack\n        googleDrive\n      }\n      teams {\n        ...TeamsContent\n      }\n      leaders {\n        role\n        user {\n          id\n          created\n          lastModified\n          flatData {\n            avatar {\n              id\n            }\n            biography\n            degree\n            email\n            contactEmail\n            firstName\n            institution\n            jobTitle\n            lastModifiedDate\n            lastName\n            country\n            city\n            onboarded\n            orcid\n            orcidLastModifiedDate\n            orcidLastSyncDate\n            orcidWorks {\n              doi\n              id\n              lastModifiedDate\n              publicationDate\n              title\n              type\n            }\n            questions {\n              question\n            }\n            expertiseAndResourceTags\n            expertiseAndResourceDescription\n            teams {\n              role\n              mainResearchInterests\n              responsibilities\n              id {\n                id\n                flatData {\n                  displayName\n                  proposal {\n                    id\n                  }\n                }\n              }\n            }\n            social {\n              github\n              googleScholar\n              linkedIn\n              researcherId\n              researchGate\n              twitter\n              website1\n              website2\n            }\n            role\n            responsibilities\n            reachOut\n            labs {\n              id\n              flatData {\n                name\n              }\n            }\n          }\n        }\n      }\n      calendars {\n        id\n        flatData {\n          color\n          googleCalendarId\n          name\n        }\n      }\n      thumbnail {\n        id\n      }\n    }\n  }\n  \n'];
export function gql(
  source: '\n  query FetchGroups(\n    $top: Int\n    $skip: Int\n    $filter: String\n    $withResearchOutputs: Boolean = false\n    $withTeams: Boolean = false\n  ) {\n    queryGroupsContentsWithTotal(\n      top: $top\n      skip: $skip\n      filter: $filter\n      orderby: "data/name/iv"\n    ) {\n      total\n      items {\n        ...GroupsContent\n      }\n    }\n  }\n  \n',
): typeof documents['\n  query FetchGroups(\n    $top: Int\n    $skip: Int\n    $filter: String\n    $withResearchOutputs: Boolean = false\n    $withTeams: Boolean = false\n  ) {\n    queryGroupsContentsWithTotal(\n      top: $top\n      skip: $skip\n      filter: $filter\n      orderby: "data/name/iv"\n    ) {\n      total\n      items {\n        ...GroupsContent\n      }\n    }\n  }\n  \n'];
export function gql(
  source: '\n  query FetchGroup(\n    $id: String!\n    $withResearchOutputs: Boolean = false\n    $withTeams: Boolean = false\n  ) {\n    findGroupsContent(id: $id) {\n      ...GroupsContent\n    }\n  }\n  \n',
): typeof documents['\n  query FetchGroup(\n    $id: String!\n    $withResearchOutputs: Boolean = false\n    $withTeams: Boolean = false\n  ) {\n    findGroupsContent(id: $id) {\n      ...GroupsContent\n    }\n  }\n  \n'];
export function gql(
  source: '\n  fragment ResearchOutputContent on ResearchOutputs {\n    id\n    created\n    lastModified\n    flatData {\n      title\n      type\n      subtype\n      description\n      link\n      addedDate\n      publishDate\n      doi\n      labCatalogNumber\n      accession\n      rrid\n      tags\n      lastUpdatedPartial\n      accessInstructions\n      sharingStatus\n      asapFunded\n      usedInAPublication\n      authors {\n        __typename\n        ... on Users {\n          id\n          created\n          lastModified\n          flatData {\n            avatar {\n              id\n            }\n            biography\n            degree\n            email\n            contactEmail\n            firstName\n            institution\n            jobTitle\n            lastModifiedDate\n            lastName\n            country\n            city\n            onboarded\n            orcid\n            orcidLastModifiedDate\n            orcidLastSyncDate\n            orcidWorks {\n              doi\n              id\n              lastModifiedDate\n              publicationDate\n              title\n              type\n            }\n            questions {\n              question\n            }\n            expertiseAndResourceTags\n            expertiseAndResourceDescription\n            teams {\n              role\n              mainResearchInterests\n              responsibilities\n              id {\n                id\n                flatData {\n                  displayName\n                  proposal {\n                    id\n                  }\n                }\n              }\n            }\n            social {\n              github\n              googleScholar\n              linkedIn\n              researcherId\n              researchGate\n              twitter\n              website1\n              website2\n            }\n            role\n            responsibilities\n            reachOut\n            labs {\n              id\n              flatData {\n                name\n              }\n            }\n          }\n        }\n        ... on ExternalAuthors {\n          id\n          created\n          lastModified\n          flatData {\n            name\n            orcid\n          }\n        }\n      }\n      labs {\n        id\n        flatData {\n          name\n        }\n      }\n    }\n    referencingTeamsContents @include(if: $withTeams) {\n      id\n      created\n      lastModified\n      flatData {\n        displayName\n      }\n      referencingUsersContents {\n        flatData {\n          email\n          teams {\n            role\n            id {\n              id\n            }\n          }\n        }\n      }\n    }\n  }\n',
): typeof documents['\n  fragment ResearchOutputContent on ResearchOutputs {\n    id\n    created\n    lastModified\n    flatData {\n      title\n      type\n      subtype\n      description\n      link\n      addedDate\n      publishDate\n      doi\n      labCatalogNumber\n      accession\n      rrid\n      tags\n      lastUpdatedPartial\n      accessInstructions\n      sharingStatus\n      asapFunded\n      usedInAPublication\n      authors {\n        __typename\n        ... on Users {\n          id\n          created\n          lastModified\n          flatData {\n            avatar {\n              id\n            }\n            biography\n            degree\n            email\n            contactEmail\n            firstName\n            institution\n            jobTitle\n            lastModifiedDate\n            lastName\n            country\n            city\n            onboarded\n            orcid\n            orcidLastModifiedDate\n            orcidLastSyncDate\n            orcidWorks {\n              doi\n              id\n              lastModifiedDate\n              publicationDate\n              title\n              type\n            }\n            questions {\n              question\n            }\n            expertiseAndResourceTags\n            expertiseAndResourceDescription\n            teams {\n              role\n              mainResearchInterests\n              responsibilities\n              id {\n                id\n                flatData {\n                  displayName\n                  proposal {\n                    id\n                  }\n                }\n              }\n            }\n            social {\n              github\n              googleScholar\n              linkedIn\n              researcherId\n              researchGate\n              twitter\n              website1\n              website2\n            }\n            role\n            responsibilities\n            reachOut\n            labs {\n              id\n              flatData {\n                name\n              }\n            }\n          }\n        }\n        ... on ExternalAuthors {\n          id\n          created\n          lastModified\n          flatData {\n            name\n            orcid\n          }\n        }\n      }\n      labs {\n        id\n        flatData {\n          name\n        }\n      }\n    }\n    referencingTeamsContents @include(if: $withTeams) {\n      id\n      created\n      lastModified\n      flatData {\n        displayName\n      }\n      referencingUsersContents {\n        flatData {\n          email\n          teams {\n            role\n            id {\n              id\n            }\n          }\n        }\n      }\n    }\n  }\n'];
export function gql(
  source: '\n  query FetchResearchOutput($id: String!, $withTeams: Boolean!) {\n    findResearchOutputsContent(id: $id) {\n      ...ResearchOutputContent\n    }\n  }\n  \n',
): typeof documents['\n  query FetchResearchOutput($id: String!, $withTeams: Boolean!) {\n    findResearchOutputsContent(id: $id) {\n      ...ResearchOutputContent\n    }\n  }\n  \n'];
export function gql(
  source: '\n  query FetchResearchOutputs(\n    $top: Int\n    $skip: Int\n    $filter: String\n    $withTeams: Boolean!\n  ) {\n    queryResearchOutputsContentsWithTotal(\n      top: $top\n      skip: $skip\n      filter: $filter\n      orderby: "created desc"\n    ) {\n      total\n      items {\n        ...ResearchOutputContent\n      }\n    }\n  }\n  \n',
): typeof documents['\n  query FetchResearchOutputs(\n    $top: Int\n    $skip: Int\n    $filter: String\n    $withTeams: Boolean!\n  ) {\n    queryResearchOutputsContentsWithTotal(\n      top: $top\n      skip: $skip\n      filter: $filter\n      orderby: "created desc"\n    ) {\n      total\n      items {\n        ...ResearchOutputContent\n      }\n    }\n  }\n  \n'];
export function gql(
  source: '\n  fragment TeamsContent on Teams {\n    id\n    created\n    lastModified\n    flatData {\n      applicationNumber\n      displayName\n      outputs @include(if: $withResearchOutputs) {\n        ...ResearchOutputContent\n      }\n      projectSummary\n      projectTitle\n      expertiseAndResourceTags\n      proposal {\n        id\n      }\n      tools {\n        description\n        name\n        url\n      }\n    }\n    referencingUsersContents(filter: "data/onboarded/iv eq true") {\n      id\n      created\n      lastModified\n      flatData {\n        avatar {\n          id\n        }\n        biography\n        degree\n        email\n        contactEmail\n        firstName\n        institution\n        jobTitle\n        lastModifiedDate\n        lastName\n        country\n        city\n        onboarded\n        orcid\n        orcidLastModifiedDate\n        orcidLastSyncDate\n        orcidWorks {\n          doi\n          id\n          lastModifiedDate\n          publicationDate\n          title\n          type\n        }\n        questions {\n          question\n        }\n        expertiseAndResourceTags\n        expertiseAndResourceDescription\n        teams {\n          role\n          mainResearchInterests\n          responsibilities\n          id {\n            id\n            flatData {\n              displayName\n              proposal {\n                id\n              }\n            }\n          }\n        }\n        social {\n          github\n          googleScholar\n          linkedIn\n          researcherId\n          researchGate\n          twitter\n          website1\n          website2\n        }\n        role\n        responsibilities\n        reachOut\n        labs {\n          id\n          flatData {\n            name\n          }\n        }\n      }\n    }\n  }\n  \n',
): typeof documents['\n  fragment TeamsContent on Teams {\n    id\n    created\n    lastModified\n    flatData {\n      applicationNumber\n      displayName\n      outputs @include(if: $withResearchOutputs) {\n        ...ResearchOutputContent\n      }\n      projectSummary\n      projectTitle\n      expertiseAndResourceTags\n      proposal {\n        id\n      }\n      tools {\n        description\n        name\n        url\n      }\n    }\n    referencingUsersContents(filter: "data/onboarded/iv eq true") {\n      id\n      created\n      lastModified\n      flatData {\n        avatar {\n          id\n        }\n        biography\n        degree\n        email\n        contactEmail\n        firstName\n        institution\n        jobTitle\n        lastModifiedDate\n        lastName\n        country\n        city\n        onboarded\n        orcid\n        orcidLastModifiedDate\n        orcidLastSyncDate\n        orcidWorks {\n          doi\n          id\n          lastModifiedDate\n          publicationDate\n          title\n          type\n        }\n        questions {\n          question\n        }\n        expertiseAndResourceTags\n        expertiseAndResourceDescription\n        teams {\n          role\n          mainResearchInterests\n          responsibilities\n          id {\n            id\n            flatData {\n              displayName\n              proposal {\n                id\n              }\n            }\n          }\n        }\n        social {\n          github\n          googleScholar\n          linkedIn\n          researcherId\n          researchGate\n          twitter\n          website1\n          website2\n        }\n        role\n        responsibilities\n        reachOut\n        labs {\n          id\n          flatData {\n            name\n          }\n        }\n      }\n    }\n  }\n  \n'];
export function gql(
  source: '\n  query FetchTeam(\n    $id: String!\n    $withResearchOutputs: Boolean = false\n    $withTeams: Boolean = false\n  ) {\n    findTeamsContent(id: $id) {\n      ...TeamsContent\n    }\n  }\n  \n',
): typeof documents['\n  query FetchTeam(\n    $id: String!\n    $withResearchOutputs: Boolean = false\n    $withTeams: Boolean = false\n  ) {\n    findTeamsContent(id: $id) {\n      ...TeamsContent\n    }\n  }\n  \n'];
export function gql(
  source: '\n  query FetchTeams(\n    $top: Int\n    $skip: Int\n    $filter: String\n    $withResearchOutputs: Boolean = true\n    $withTeams: Boolean = false\n  ) {\n    queryTeamsContentsWithTotal(\n      top: $top\n      skip: $skip\n      filter: $filter\n      orderby: "data/displayName/iv"\n    ) {\n      total\n      items {\n        ...TeamsContent\n      }\n    }\n  }\n  \n',
): typeof documents['\n  query FetchTeams(\n    $top: Int\n    $skip: Int\n    $filter: String\n    $withResearchOutputs: Boolean = true\n    $withTeams: Boolean = false\n  ) {\n    queryTeamsContentsWithTotal(\n      top: $top\n      skip: $skip\n      filter: $filter\n      orderby: "data/displayName/iv"\n    ) {\n      total\n      items {\n        ...TeamsContent\n      }\n    }\n  }\n  \n'];
export function gql(
  source: '\n  fragment UsersContent on Users {\n    id\n    created\n    lastModified\n    flatData {\n      avatar {\n        id\n      }\n      biography\n      degree\n      email\n      contactEmail\n      firstName\n      institution\n      jobTitle\n      lastModifiedDate\n      lastName\n      country\n      city\n      onboarded\n      orcid\n      orcidLastModifiedDate\n      orcidLastSyncDate\n      orcidWorks {\n        doi\n        id\n        lastModifiedDate\n        publicationDate\n        title\n        type\n      }\n      questions {\n        question\n      }\n      expertiseAndResourceTags\n      expertiseAndResourceDescription\n      teams {\n        role\n        mainResearchInterests\n        responsibilities\n        id {\n          id\n          flatData {\n            displayName\n            proposal {\n              id\n            }\n          }\n        }\n      }\n      social {\n        github\n        googleScholar\n        linkedIn\n        researcherId\n        researchGate\n        twitter\n        website1\n        website2\n      }\n      role\n      responsibilities\n      reachOut\n      labs {\n        id\n        flatData {\n          name\n        }\n      }\n    }\n  }\n',
): typeof documents['\n  fragment UsersContent on Users {\n    id\n    created\n    lastModified\n    flatData {\n      avatar {\n        id\n      }\n      biography\n      degree\n      email\n      contactEmail\n      firstName\n      institution\n      jobTitle\n      lastModifiedDate\n      lastName\n      country\n      city\n      onboarded\n      orcid\n      orcidLastModifiedDate\n      orcidLastSyncDate\n      orcidWorks {\n        doi\n        id\n        lastModifiedDate\n        publicationDate\n        title\n        type\n      }\n      questions {\n        question\n      }\n      expertiseAndResourceTags\n      expertiseAndResourceDescription\n      teams {\n        role\n        mainResearchInterests\n        responsibilities\n        id {\n          id\n          flatData {\n            displayName\n            proposal {\n              id\n            }\n          }\n        }\n      }\n      social {\n        github\n        googleScholar\n        linkedIn\n        researcherId\n        researchGate\n        twitter\n        website1\n        website2\n      }\n      role\n      responsibilities\n      reachOut\n      labs {\n        id\n        flatData {\n          name\n        }\n      }\n    }\n  }\n'];
export function gql(
  source: '\n  query FetchUser($id: String!) {\n    findUsersContent(id: $id) {\n      ...UsersContent\n    }\n  }\n  \n',
): typeof documents['\n  query FetchUser($id: String!) {\n    findUsersContent(id: $id) {\n      ...UsersContent\n    }\n  }\n  \n'];
export function gql(
  source: '\n  query FetchUsers($top: Int, $skip: Int, $filter: String) {\n    queryUsersContentsWithTotal(\n      top: $top\n      skip: $skip\n      filter: $filter\n      orderby: "data/firstName/iv,data/lastName/iv"\n    ) {\n      total\n      items {\n        ...UsersContent\n      }\n    }\n  }\n  \n',
): typeof documents['\n  query FetchUsers($top: Int, $skip: Int, $filter: String) {\n    queryUsersContentsWithTotal(\n      top: $top\n      skip: $skip\n      filter: $filter\n      orderby: "data/firstName/iv,data/lastName/iv"\n    ) {\n      total\n      items {\n        ...UsersContent\n      }\n    }\n  }\n  \n'];

export function gql(source: string): unknown;
export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
  TDocumentNode extends DocumentNode<infer TType, any> ? TType : never;
