import React from 'react';
import { Wrapper } from '../atoms';
import { Button, Form, Input, message, Select, Typography } from 'antd';
import { filterSort } from '../../utils';
import { useMutation, useQuery } from '@tanstack/react-query';
import { createExam, getSubjects } from '../../apis';
import { ExamData, SubjectOption } from '../../types';
const { Item } = Form;

const CreateExam: React.FC = () => {
  const { data: subjectData } = useQuery({
    queryKey: ['subject'],
    queryFn: getSubjects,
    retry: false,
  });
  const subjectOptions =
    subjectData?.map((subject: SubjectOption) => ({
      value: subject.id,
      label: subject.name,
    })) ?? [];
  const createQuestionData = useMutation({
    mutationFn: createExam,
    onSuccess: () => {
      message.success('Imported successfully');
    },
    onError: (error: Error) => {
      message.error(error.message);
    },
  });
  const onFinish = (values: ExamData) => {
    createQuestionData.mutate(values);
  };
  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 6 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 14 },
    },
  };
  return (
    <Wrapper>
      <Typography.Title level={1}>Tạo bài thi</Typography.Title>
      <hr />
      <Form onFinish={onFinish} {...formItemLayout} style={{ maxWidth: 600 }}>
        <Item label="Exam Code" name="exam_code">
          <Input size="large" />
        </Item>
        <Item label="Duration" name="duration">
          <Input size="large" />
        </Item>
        <Item label="Num questions" name="num_questions">
          <Input size="large" />
        </Item>
        <Item label="Subject" name="subject">
          <Select
            showSearch
            placeholder="Search to Select"
            optionFilterProp="label"
            filterSort={filterSort}
            options={subjectOptions}
            size="large"
          />
        </Item>
        <Item wrapperCol={{ offset: 6, span: 16 }}>
          <Button type="primary" htmlType="submit" size="large">
            Submit
          </Button>
        </Item>
      </Form>
    </Wrapper>
  );
};

export { CreateExam };
