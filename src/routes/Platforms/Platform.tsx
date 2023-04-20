import React from "react";
import { useParams } from "react-router-dom";
import { useApi } from "util/useApi";

export const Platform: React.FC = () => {
  const { id } = useParams();
  const { data: platform } = useApi("get", `/v1/platforms/${id}`);

  return <pre>{JSON.stringify(platform, undefined, 2)}</pre>;
};
