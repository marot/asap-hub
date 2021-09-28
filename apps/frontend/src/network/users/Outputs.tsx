import { isEnabled } from '@asap-hub/flags';
import {
  UserProfileResearchOutputs,
  UserProfileSearchAndFilter,
} from '@asap-hub/react-components';
import { network } from '@asap-hub/routing';
import React from 'react';
import { usePagination, usePaginationParams, useSearch } from '../../hooks';
import { useResearchOutputs } from '../../shared-research/state';
import { SearchFrame } from '../../structure/Frame';

type OutputsListProps = {
  searchQuery: string;
  filters: Set<string>;
  userId: string;
};

type OutputsProps = {
  userId: string;
};

const OutputsList: React.FC<OutputsListProps> = ({
  searchQuery,
  filters,
  userId,
}) => {
  const { currentPage, pageSize, isListView, cardViewParams, listViewParams } =
    usePaginationParams();

  const result = useResearchOutputs({
    searchQuery,
    filters,
    currentPage,
    pageSize,
    userId,
  });
  const { numberOfPages, renderPageHref } = usePagination(
    result.total,
    pageSize,
  );
  return (
    <UserProfileResearchOutputs
      researchOutputs={result.items}
      numberOfItems={result.total}
      numberOfPages={numberOfPages}
      currentPageIndex={currentPage}
      renderPageHref={renderPageHref}
      isListView={isListView}
      cardViewHref={
        network({}).users({}).user({ userId }).outputs({}).$ + cardViewParams
      }
      listViewHref={
        network({}).users({}).user({ userId }).outputs({}).$ + listViewParams
      }
    />
  );
};

const Outputs: React.FC<OutputsProps> = ({ userId }) => {
  const {
    filters,
    searchQuery,
    toggleFilter,
    setSearchQuery,
    debouncedSearchQuery,
  } = useSearch();

  return (
    <article>
      {isEnabled('RESEARCH_OUTPUTS_ON_AUTHOR_PROFILE') && (
        <UserProfileSearchAndFilter
          onChangeSearch={setSearchQuery}
          searchQuery={searchQuery}
          onChangeFilter={toggleFilter}
          filters={filters}
        />
      )}
      <SearchFrame title="outputs">
        <OutputsList
          userId={userId}
          searchQuery={debouncedSearchQuery}
          filters={filters}
        />
      </SearchFrame>
    </article>
  );
};

export default Outputs;
