import React from 'react';

import { Wrapper } from '../atoms/Wrapper';
import { Input, Form, Select, Flex, Button } from 'antd';
const { Item } = Form;
const options = [
  {
    value: '1',
    label: 'Not Identified',
  },
  {
    value: '2',
    label: 'Closed',
  },
  {
    value: '3',
    label: 'Communicated',
  },
  {
    value: '4',
    label: 'Identified',
  },
  {
    value: '5',
    label: 'Resolved',
  },
  {
    value: '6',
    label: 'Cancelled',
  },
];
interface Option {
  value: string;
  label: string;
}
const filterSort = (optionA: Option, optionB: Option) => {
  return (optionA?.label ?? '')
    .toLowerCase()
    .localeCompare((optionB?.label ?? '').toLowerCase());
};
const ImportQuiz: React.FC = () => {
  const [form] = Form.useForm();
  return (
    <Wrapper>
      <h1>Import Quiz</h1>
      <hr />
      <Form form={form}>
        <Flex justify="space-around" wrap>
          <Item label="Tên lớp">
            <Select
              showSearch
              placeholder="Search to Select"
              optionFilterProp="label"
              filterSort={filterSort}
              options={options}
            />
          </Item>
          <Item label="Tên môn">
            <Select
              showSearch
              placeholder="Search to Select"
              optionFilterProp="label"
              filterSort={filterSort}
              options={options}
            />
          </Item>
          <Item label="File">
            <Input type="file" />
          </Item>
          <Item>
            <Button type="primary">Import</Button>
          </Item>
        </Flex>
      </Form>

      <hr />
      <div>{/* Additional content can go here */}</div>
    </Wrapper>
  );
};

export { ImportQuiz };
