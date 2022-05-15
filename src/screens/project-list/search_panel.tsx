import styled from "@emotion/styled";
import { Form, Input, Select } from "antd";
import React from "react";
import { User } from "../../type/user";

interface SearchPanelProps {
  param: {
    name: string,
    personId: string
  }
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
          placeholder={'项目名称/负责人'}
        />
      </Form.Item>
      <Form.Item>
        <Select
          value={param.personId}
          onChange={(value) =>
            setParam({
              ...param,
              personId: value,
            })
          }
        >
          <Select.Option value="">负责人</Select.Option>
          {users.map((user) => (
            <Select.Option value={user.id} key={user.id}>
              {user.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
    </Form >
  );
}
