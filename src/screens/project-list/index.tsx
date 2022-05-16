import React, { useState } from "react";
import List from "./list";
import SearchPanel from "./search_panel";

import { useDebounce } from "../../utils";
import styled from "@emotion/styled";

import { useProjects } from "./project";
import { useUsers } from "./users";


export default function ProjectList() {


  const [param, setParam] = useState({
    name: "",
    personId: "",
  });

  const debouncedParam = useDebounce(param, 300);

  const { isLoading, data: list } = useProjects(debouncedParam)

  const { data: users } = useUsers()

  return (
    <Container>
      <h2>项目列表</h2>
      <SearchPanel param={param} setParam={setParam} users={users || []} />
      <List dataSource={list || []} loading={isLoading} users={users || []} />
    </Container>
  );
}

const Container = styled.div`
  padding: 3.2rem;
`
