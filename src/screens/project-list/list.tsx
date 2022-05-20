import { Button, Dropdown, Menu, Table, TableProps } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import { Pin } from "../../components/Pin";
import { Project } from "../../type/projcet";
import { User } from "../../type/user";
import { useEditProject } from "../../utils/project";


// interface ListProps {
//   list: Project[],
//   users: User[]
// }
interface ListProps extends TableProps<Project> {
  users: User[];
  refresh?: () => void
}

export default function List({ users, ...props }: ListProps) {

  const { refresh } = props
  const { mutate } = useEditProject()
  const pinProject = (project: Project) => (pin: boolean) => mutate({ ...project, pin }).then(refresh)

  const items = [
    { label: <Button type='link'  >编辑</Button>, key: 'userInfo' }, // 菜单项务必填写 key
    { label: <Button type='link'>删除</Button>, key: 'logout' },

  ];
  return (
    <Table style={{ marginTop: "3.2rem" }} rowKey={'id'} columns={
      [
        {
          title: <Pin checked={true} />,
          render: (value, project) => <Pin
            checked={project.pin}
            onCheckedChange={pinProject(project)}
          />
        },
        {
          title: "项目名称",
          key: 'name',
          sorter: (a, b) => a.name.localeCompare(b.name),
          render: (value, project) => {
            return <Link to={String(project.id)}>{project.name}</Link>
          }
        },
        {
          title: "部门",
          dataIndex: 'organization',
          key: 'organization',

        },
        {
          title: "创建时间"
        },
        {
          title: "负责人",
          render: (value, project) => {
            return <Button type="link" > {users.find((user) => user.id === project.personId)?.name}</Button>
          }
        },
        {
          title: "其他",
          render: (value, project) => {
            return <Dropdown overlay={<Menu items={items} />} >
              <Button type='link' onClick={e => e.preventDefault()}>
                ...
              </Button>
            </Dropdown>

          }
        }
      ]
    }
      {...props}
    />

  );
}
