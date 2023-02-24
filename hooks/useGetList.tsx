import axios from "axios";
import { isEqual, pick } from "lodash";
import useSWRInfinite from "swr/infinite";
import { DEFAULT_ARTICLE_PARAMS, IArticleParams, IListResponse } from "types";

const fetcher = async (params: IArticleParams) => {
  console.log("test fetcher-params", params);

  const response: any = await axios.get("http://localhost:3000/api/articles", {
    params,
  });

  console.log("test fetcher-response", response);

  return response.data;
};

export const useGetList = <Data, Params = Record<string, string>, Error = any>(
  paramsRef: React.MutableRefObject<IArticleParams>
) => {
  const swrResponse = useSWRInfinite(
    (pageIndex: number, previousPageData: IListResponse<Data> | undefined) => {
      const params = paramsRef.current;
      console.log("test getKey", pageIndex, previousPageData, params);
      if (!params) return null;
      // reached the end
      if (previousPageData && !previousPageData.contents.length) return null;
      const domain = "/articles";

      // first page, we don't have `previousPageData`
      if (pageIndex === 0) {
        // console.log("test params", params);
        // console.log(
        //   "test isEqual(params, defaultParams)",
        //   isEqual(params, DEFAULT_ARTICLE_PARAMS)
        // );

        const filterParams = pick(params, ["orders", "filters"]);
        const defaultFilterParams = pick(DEFAULT_ARTICLE_PARAMS, [
          "orders",
          "filters",
        ]);

        const hasFilter = !isEqual(filterParams, defaultFilterParams);
        console.log("test hasFilter", hasFilter);

        const defaultParams: Record<string, string> = {
          ...DEFAULT_ARTICLE_PARAMS,
          limit: String(DEFAULT_ARTICLE_PARAMS.limit),
          offset: String(DEFAULT_ARTICLE_PARAMS.offset),
        };

        const nextParams = {
          ...params,
          offset: String(params.offset),
          limit: String(params.limit),
        };

        const requestFilterParams = { ...defaultParams, ...nextParams };

        const queryParams =
          "?" +
          new URLSearchParams(
            hasFilter ? requestFilterParams : defaultParams
          ).toString();

        // const defaultParams: Record<string, string> = {
        //   ...DEFAULT_ARTICLE_PARAMS,
        //   limit: String(DEFAULT_ARTICLE_PARAMS.limit),
        //   offset: String(DEFAULT_ARTICLE_PARAMS.offset),
        // };
        // const queryParams = "?" + new URLSearchParams(defaultParams).toString();
        return [`${domain}${queryParams}`, DEFAULT_ARTICLE_PARAMS];
      }

      // add the cursor to the API endpoint
      // const nextParams = {
      //   ...params,
      //   offset: Number(params.offset) + Number(params.limit),
      // };
      const queryParams =
        "?" +
        new URLSearchParams(
          params as unknown as Record<string, string>
        ).toString();
      return [`${domain}${queryParams}`, params];
    },
    (url: string, params: any) => {
      console.log("test FETCHING with url:", url, params);

      return fetcher(params);
    },
    {
      revalidateOnFocus: false,
      fallbackData: undefined,
    }
  );

  return swrResponse;
};
