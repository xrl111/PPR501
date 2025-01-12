import React from 'react';
import { Wrapper } from '../atoms';
import { Button, Form, Input, message, Select } from 'antd';
import { filterSort } from '../../utils';
import { useMutation, useQuery } from '@tanstack/react-query';
import { createExam, getSubjects } from '../../apis';
import { ExamData, SubjectOption } from '../../types';
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
  return (
    <Wrapper>
      <h1>Create Exam</h1>
      <hr />
      <Form {...formItemLayout} onFinish={onFinish}>
        <Form.Item label="Exam Code" name="exam_code">
          <Input />
        </Form.Item>
        <Form.Item label="Duration" name="duration">
          <Input />
        </Form.Item>
        <Form.Item label="Num questions" name="num_questions">
          <Input />
        </Form.Item>
        <Form.Item label="Subject" name="subject">
          <Select
            showSearch
            placeholder="Search to Select"
            optionFilterProp="label"
            filterSort={filterSort}
            options={subjectOptions}
          />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Wrapper>
  );
};

export { CreateExam };
