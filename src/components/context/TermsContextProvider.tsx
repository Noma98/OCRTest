import React, { createContext, Dispatch, useReducer } from 'react';

import { ITerms } from '@/types/user';

type TermsAction =
  | { type: 'AGREE_SERVICE_TERMS' }
  | { type: 'AGREE_PERSONAL_TERMS' }
  | { type: 'TOGGLE_SERVICE_TERMS' }
  | { type: 'TOGGLE_PERSONAL_TERMS' }
  | { type: 'TOGGLE_ALL' }
  | { type: 'DISAGREE_ALL' };

const termsInitialState: ITerms = {
  serviceTerms: false,
  personalTerms: false,
};

function termsReducer(state: ITerms = termsInitialState, action: TermsAction) {
  switch (action.type) {
    case 'AGREE_SERVICE_TERMS':
      return {
        ...state,
        serviceTerms: true,
      };
    case 'AGREE_PERSONAL_TERMS':
      return {
        ...state,
        personalTerms: true,
      };
    case 'TOGGLE_SERVICE_TERMS':
      return {
        ...state,
        serviceTerms: !state.serviceTerms,
      };
    case 'TOGGLE_PERSONAL_TERMS':
      return {
        ...state,
        personalTerms: !state.personalTerms,
      };
    case 'TOGGLE_ALL':
      if (!state.serviceTerms || !state.personalTerms) {
        return {
          serviceTerms: true,
          personalTerms: true,
        };
      } else {
        return {
          serviceTerms: false,
          personalTerms: false,
        };
      }
    case 'DISAGREE_ALL':
      return {
        serviceTerms: false,
        personalTerms: false,
      };
    default:
      throw new Error(`Unhandled Action Type Error: ${action}`);
  }
}

export type TermsDispatch = Dispatch<TermsAction>;

export const TermsStateContext = createContext<ITerms>(termsInitialState);

export const TermsDispatchContext = createContext<TermsDispatch>(() => null);

interface ITermsContextProvider {
  children: React.ReactNode;
}

function TermsContextProvider({ children }: ITermsContextProvider) {
  const [terms, dispatch] = useReducer(termsReducer, termsInitialState);

  return (
    <TermsStateContext.Provider value={terms}>
      <TermsDispatchContext.Provider value={dispatch}>
        {children}
      </TermsDispatchContext.Provider>
    </TermsStateContext.Provider>
  );
}

export default TermsContextProvider;
