import { useContext } from 'react';

import {
  TermsDispatch,
  TermsDispatchContext,
} from '@/components/context/TermsContextProvider';

function useTermsDispatch(): TermsDispatch {
  const dispatch = useContext(TermsDispatchContext);

  return dispatch;
}

export default useTermsDispatch;
