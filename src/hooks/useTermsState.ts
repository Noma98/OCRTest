import { useContext } from 'react';

import { TermsStateContext } from '@/components/context/TermsContextProvider';
import { ITerms } from '@/types/user';

function useTermsState(): ITerms {
  const state = useContext(TermsStateContext);

  return state;
}

export default useTermsState;
