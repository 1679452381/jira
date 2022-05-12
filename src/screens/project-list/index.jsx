import React, { useState, useEffect } from "react";
import List from "./list";
import SearchPanel from "./search_panel";
// import * as qs from qs

// import { CleanObj } from "../../utils";

const apiUrl = process.env.REACT_APP_API_URL;

export default function ProjectList() {
  const [param, setParam] = useState({
    name: "",
    personId: "",
  });
  const [users, setUsers] = useState([]);
  const [list, setList] = useState([]);

  // ${qs.stringify(CleanObj(param))}
  useEffect(() => {
    fetch(`${apiUrl}/projects?`).then(async (response) => {
      if (response.ok) {
        setList(await response.json());
      }
    });
  }, [param]);

  useEffect(() => {
    fetch(`${apiUrl}/users`).then(async (response) => {
      if (response.ok) {
        setUsers(await response.json());
      }
    });
  }, []);

  console.log(apiUrl);

  return (
    <div>
      <SearchPanel param={param} setParam={setParam} users={users} />
      <List list={list} users={users} />
    </div>
  );
}
