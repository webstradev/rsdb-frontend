import React from "react";
import { useParams } from "react-router-dom";
import { useApi } from "util/useApi";

export const Article: React.FC = () => {
  const { id } = useParams();
  const { data: article } = useApi("get", `/v1/articles/${id}`);

  return <pre>{JSON.stringify(article, undefined, 2)}</pre>;
};
