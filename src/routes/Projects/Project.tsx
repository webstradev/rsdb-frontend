import React from "react";
import { useParams } from "react-router-dom";
import { useApi } from "util/useApi";

export const Project: React.FC = () => {
  const { id } = useParams();
  const { data: project } = useApi("get", `/v1/projects/${id}`);

  return <pre>{JSON.stringify(project, undefined, 2)}</pre>;
};
