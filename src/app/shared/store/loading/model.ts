
export const loadingFeatureKey = 'loading';

export type LoadingInfo={
  actionSource: string, idGroupLoading: string,   idLoading?: string
} ;

export interface State {
  stack: LoadingInfo[]
}

