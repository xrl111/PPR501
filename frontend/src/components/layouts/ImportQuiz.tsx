import React from 'react';
import { Wrapper } from '../atoms/Wrapper';
import { Form, Select, Button, Upload } from 'antd';
import { useQuery } from '@tanstack/react-query';
import { getExams } from '../../apis';
import { UploadOutlined } from '@ant-design/icons';
const { Item } = Form;

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
  const { data: examData } = useQuery({
    queryKey: ['exam'],
    queryFn: getExams,
  });

  const examOptions =
    examData?.map((exam: any) => ({
      value: exam.id,
      label: exam.exam_code,
    })) ?? [];

  const onFinish = (values: any) => {
    console.log('Received values:', values);
    const file = values.file?.[0]?.originFileObj;
    if (file) {
      console.log('Selected file:', file);
    }
  };

  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  return (
    <Wrapper>
      <h1>Import Quiz</h1>
      <hr />
      <Form onFinish={onFinish}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-around',
            flexWrap: 'wrap',
          }}
        >
          <Item label="Bài thi" name="exam_id">
            <Select
              showSearch
              placeholder="Search to Select"
              optionFilterProp="label"
              filterSort={filterSort}
              options={examOptions}
            />
          </Item>
          <Item label="Môn học" name="subject_id">
            <Select
              showSearch
              placeholder="Search to Select"
              optionFilterProp="label"
              filterSort={filterSort}
              options={[]}
            />
          </Item>
          <Item
            label="File"
            name="file"
            valuePropName="fileList"
            getValueFromEvent={normFile}
          >
            <Upload name="file" beforeUpload={() => false} listType="text">
              <Button icon={<UploadOutlined />}>Click to upload</Button>
            </Upload>
          </Item>
          <Item>
            <Button type="primary" htmlType="submit">
              Import
            </Button>
          </Item>
        </div>
      </Form>
      <hr />
      <div>{/* Additional content can go here */}</div>
    </Wrapper>
  );
};

export { ImportQuiz };
