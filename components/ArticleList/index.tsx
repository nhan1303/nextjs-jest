import { Box, Stack } from "@mui/material";
import { ArticleCard } from "components/ArticleCard";
import React from "react";
import { IArticle } from "types";

export interface IArticleListProps {
  data: IArticle[];
}

export const ArticleList: React.FC<IArticleListProps> = ({ data }) => {
  return (
    <Stack sx={{ gap: "8px" }}>
      {Array.isArray(data) && data.map((item: IArticle) => {
        return <ArticleCard key={item.id} data={item} />;
      })}
    </Stack>
  );
};
