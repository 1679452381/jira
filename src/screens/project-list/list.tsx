import React from "react";
import { Project } from "../../type/projcet";
import { User } from "../../type/user";


interface ListProps {
  list: Project[],
  users: User[]
}

export default function List({ list, users }: ListProps) {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>项目名称</th>
            <th>负责人</th>
          </tr>
        </thead>
        <tbody>
          {list.map((project) => (
            <tr key={project.id}>
              <td>{project.name}</td>
              <td>
                {users.find((user) => user.id === project.personId)?.name}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
