import React from "react";
import type { AppProps } from "next/app";
import { Box, Button } from "@mui/material";
import { useGetList } from "hooks/useGetList";
import {
  DEFAULT_ARTICLE_PARAMS,
  IArticle,
  IArticleParams,
  IListResponse,
} from "types";
import { ArticleList } from "components/ArticleList";
// require("mocks");

function App({ Component, pageProps }: AppProps) {
  // const [params, setParams] = React.useState<IArticleParams>(
  //   DEFAULT_ARTICLE_PARAMS
  // );

  const params = React.useRef<IArticleParams>(DEFAULT_ARTICLE_PARAMS);
  const { data, isValidating, error, size, setSize } = useGetList<
    IArticle,
    IArticleParams,
    Error
  >(params);

  const handleLoadmore = () => {
    // setParams((prev) => ({
    //   ...prev,
    //   offset: prev.offset + prev.limit,
    // }));
    params.current = {
      ...params.current,
      offset: params.current.offset + params.current.limit,
    };
    setSize((_size) => _size + 1);
  };

  const handleFilter = () => {
    // setParams((prev) => ({
    //   ...prev,
    //   filters: "1",
    // }));

    params.current = {
      ...DEFAULT_ARTICLE_PARAMS,
      filters: "North",
    };

    setSize(0);
  };
  console.log("test data", data);
  if (isValidating && !error) return <Box>Loading...</Box>;

  if (error) return <Box>{error}</Box>;

  if (!data) return <Box>No data to display</Box>;

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <Box sx={{ backgroundColor: "red" }}>Article List</Box>
      <Button onClick={handleFilter}>Filter</Button>
      {data.map((item: IListResponse<IArticle>, index: number) => {
        console.log("test item.contents", item.contents);
        return <ArticleList key={index} data={item.contents} />;
      })}

      <Button onClick={handleLoadmore}>Load more</Button>
    </Box>
  );
}

export default App;
