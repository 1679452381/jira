import { Form, Input } from "antd";
import React from "react";
import { UserSelect } from "../../components/UerSelect";
import { Project } from "../../type/projcet";
import { User } from "../../type/user";

interface SearchPanelProps {
  param: Partial<Pick<Project, 'name' | 'personId'>>
  setParam: (param: SearchPanelProps['param']) => void,
  users: User[]
}

export default function SearchPanel({ param, setParam, users }: SearchPanelProps) {
  return (
    <Form layout="inline"   >
      <Form.Item>
        <Input
          type="text"
          value={param.name}
          onChange={(evt) =>
            setParam({
              ...param,
              name: evt.target.value,
            })
          }
          placeholder={'项目名称'}
        />
      </Form.Item>
      <Form.Item>
        <UserSelect
          defaultOptionName={'负责人'}
          value={param.personId}
          onChange={(value) =>
            setParam({
              ...param,
              personId: value
            })
          }
        />
      </Form.Item>
    </Form >
  );
}
