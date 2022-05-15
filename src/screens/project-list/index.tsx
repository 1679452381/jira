import React, { useState, useEffect } from "react";
import List from "./list";
import SearchPanel from "./search_panel";

import { CleanObj, useDebounce, useMount } from "../../utils";
import { useHttp } from "../../utils/http";
import styled from "@emotion/styled";


export default function ProjectList() {

  const client = useHttp()

  const [param, setParam] = useState({
    name: "",
    personId: "",
  });
  const [users, setUsers] = useState([]);
  const [list, setList] = useState([]);

  const debouncedParam = useDebounce(param, 300);

  useEffect(() => {
    client('projects', { data: CleanObj(debouncedParam) }).then(setList)
  }, [debouncedParam]);

  useMount(() => {
    client('users').then(setUsers)
  });

  return (
    <Container>
      <h2>项目列表</h2>
      <SearchPanel param={param} setParam={setParam} users={users} />
      <List list={list} users={users} />
    </Container>
  );
}

const Container = styled.div`
  padding: 3.2rem;
`

