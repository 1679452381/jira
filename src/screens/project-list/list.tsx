import { render } from "@testing-library/react";
import { Input, Table } from "antd";
import React from "react";
import { Project } from "../../type/projcet";
import { User } from "../../type/user";


interface ListProps {
  list: Project[],
  users: User[]
}

export default function List({ list, users }: ListProps) {
  return (
    <Table rowKey={'id'} dataSource={list} columns={
      [{
        title: "项目名称",
        dataIndex: 'name',
        key: 'name',
        sorter: (a, b) => a.name.localeCompare(b.name)
      },
      {
        title: "负责人",
        render: (project, record, index) => {
          return <a > {users.find((user) => user.id === project.personId)?.name}</a>
        }
      }
      ]
    } />

  );
}
