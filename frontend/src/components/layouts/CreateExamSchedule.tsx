import React from 'react';
import { Wrapper } from '../atoms';
import { Form, Select, Button, DatePicker, message } from 'antd';
import { convertToISOString, filterSort } from '../../utils';
import { getExams, createExamScheduleApi } from '../../apis';
import { useMutation, useQuery } from '@tanstack/react-query';
import { ExamOption } from '../../types';

const CreateExamSchedule: React.FC = () => {
  const { data: ExamData } = useQuery({
    queryKey: ['subject'],
    queryFn: getExams,
    retry: false,
  });
  const ExamOptions =
    ExamData?.map((exam: ExamOption) => ({
      value: exam.id,
      label: exam.exam_code,
    })) ?? [];
  const createExamSchedule = useMutation({
    mutationFn: createExamScheduleApi,
    onSuccess: () => {
      message.success('Imported successfully');
    },
    onError: (error: Error) => {
      message.error(error.message);
    },
  });
  const onFinish = (values: any) => {
    const exam = values?.exam;
    const start_time = convertToISOString(values.start_time);
    const end_time = convertToISOString(values.end_time);
    console.log('Received values:', values, start_time, end_time, exam);

    createExamSchedule.mutate({ exam, start_time, end_time });
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
      <h1>Create Exam Schedule</h1>
      <hr />
      <Form {...formItemLayout} onFinish={onFinish} style={{ maxWidth: 600 }}>
        <Form.Item label="Exam" name="exam">
          <Select
            showSearch
            placeholder="Search to Select"
            optionFilterProp="label"
            filterSort={filterSort}
            options={ExamOptions}
            size="large"
          />
        </Form.Item>
        <Form.Item label="Start Time" name="start_time">
          <DatePicker showTime size="large" />
        </Form.Item>
        <Form.Item label="End Time" name="end_time">
          <DatePicker showTime size="large" />
        </Form.Item>
        <Form.Item wrapperCol={{ span: 14, offset: 6 }}>
          <Button type="primary" htmlType="submit" size="large">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Wrapper>
  );
};

export { CreateExamSchedule };
