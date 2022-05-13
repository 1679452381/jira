import React, { useState, useEffect } from "react";
import List from "./list";
import SearchPanel from "./search_panel";
import * as qs from "qs";

import { CleanObj, useDebounce, useMount } from "../../utils";

const apiUrl = process.env.REACT_APP_API_URL;


export default function ProjectList() {
  const [param, setParam] = useState({
    name: "",
    personId: "",
  });
  const [users, setUsers] = useState([]);
  const [list, setList] = useState([]);

  const debouncedParam = useDebounce(param, 1000);

  useEffect(() => {
    fetch(`${apiUrl}/projects?${qs.stringify(CleanObj(debouncedParam))}`).then(
      async (response) => {
        if (response.ok) {
          setList(await response.json());
        }
      }
    );
  }, [debouncedParam]);

  useMount(() => {
    fetch(`${apiUrl}/users`).then(async (response) => {
      if (response.ok) {
        setUsers(await response.json());
      }
    });
  });

  return (
    <div>
      <SearchPanel param={param} setParam={setParam} users={users} />
      <List list={list} users={users} />
    </div>
  );
}
