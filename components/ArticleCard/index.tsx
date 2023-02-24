import { Box, Card, Stack } from "@mui/material";
import React from "react";
import { IArticle } from "types";

export interface IArticleCardProps {
  data: IArticle;
}

export const ArticleCard: React.FC<IArticleCardProps> = ({ data }) => {
  return (
    <Card variant="outlined">
      <Stack
        sx={{
          width: "100%",
          height: "100px",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",

          backgroundColor: 'green'
        }}
      >
        <Box>{`Id: ${data.id}`}</Box>
        <Box>{`Title: ${data.title}`}</Box>
      </Stack>
    </Card>
  );
};
