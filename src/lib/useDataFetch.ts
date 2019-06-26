import { useReducer, useEffect, useState } from 'react';
import axios from 'axios';
/* ----------------------------------------------------
    fetch url
----------------------------------------------------- */

interface IFetchReducerState {
  isLoading: boolean;
  isError: boolean;
  data: any;
}

enum EFetchType {
  // 请求初始化
  INIT = 'INIT',

  // 请求成功
  SUCCESS = 'SUCCESS',

  // 请求失败
  FAILURE = 'FAILURE'
}
const dataFetchReducer = (
  state: IFetchReducerState,
  [type, payload]: [EFetchType, Partial<IFetchReducerState>]
) => {
  switch (type) {
    case EFetchType.INIT:
      return {
        ...state,
        isLoading: true,
        isError: false
      };
    case EFetchType.SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: payload.data
      };
    case EFetchType.FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true
      };
    default:
      throw new Error();
  }
};

const FOMMATER_DEFAULT = (data: any) => {
  return data;
};

export interface IDataFetchConfig {
  formatter?: (data: any) => any;
  fetchFunction?: (url, config) => Promise<{ data: any }>;
}
export const useDataApi = (
  initialUrl: string,
  initParams: any,
  initData: any,
  config: IDataFetchConfig
) => {
  const [url, setUrl] = useState(initialUrl);
  const [params, setParams] = useState(initParams);
  const { formatter = FOMMATER_DEFAULT, fetchFunction = axios } = config;

  const [state, dispatch] = useReducer(dataFetchReducer, {
    isLoading: false,
    isError: false,
    data: initData
  });

  useEffect(() => {
    let didCancel = false;

    const fetchData = async () => {
      dispatch([EFetchType.INIT, {}]);

      try {
        const result = await fetchFunction(url, { params: params });

        if (!didCancel) {
          dispatch([EFetchType.SUCCESS, { data: formatter(result.data) }]);
        }
      } catch (error) {
        if (!didCancel) {
          dispatch([EFetchType.FAILURE, {}]);
        }
      }
    };

    if (!!url) {
      fetchData();
    }

    return () => {
      didCancel = true;
    };
  }, [url, params]);

  const doFetch = url => {
    setUrl(url);
  };
  const updateParams = newParams => {
    setParams({ ...params, ...newParams });
  };

  return { ...state, doFetch, updateParams };
};
