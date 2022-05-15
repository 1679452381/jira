import { Input, Select } from "antd";
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
    <div>
      <Input
        type="text"
        value={param.name}
        onChange={(evt) =>
          setParam({
            ...param,
            name: evt.target.value,
          })
        }
      />
      <Select
        value={param.personId}
        onChange={(value) =>
          setParam({
            ...param,
            personId: value,
          })
        }
      >
        <Select.Option defaultValue="负责人" value='负责人' >负责人</Select.Option>
        {users.map((user) => (
          <Select.Option value={user.id} key={user.id}>
            {user.name}
          </Select.Option>
        ))}
      </Select>
    </div>
  );
}
