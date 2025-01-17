import React from 'react';
import { Wrapper } from '../../atoms';
import {
  Button,
  Form,
  Input,
  InputNumber,
  message,
  Select,
  Typography,
} from 'antd';
import { filterSort, validateCreateExamData } from '../../../utils';
import { useMutation, useQuery } from '@tanstack/react-query';
import { createExam, getSubjects } from '../../../apis';
import { ExamData, SubjectOption } from '../../../types';
const { Item } = Form;

const CreateExam: React.FC = () => {
  const { data: subjectData } = useQuery({
    queryKey: ['subject'],
    queryFn: getSubjects,
    retry: false,
  });
  const [form] = Form.useForm();
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
    const errors = validateCreateExamData(values);
    if (errors.length > 0) {
      errors.forEach((error) => message.error(error));
      return;
    }
    const formattedExamCode = values.exam_code.toUpperCase().replace(/ /g, '_');
    createQuestionData.mutate({ ...values, exam_code: formattedExamCode });
    form.resetFields();
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
      <Form
        form={form}
        onFinish={onFinish}
        {...formItemLayout}
        style={{ maxWidth: 600 }}
      >
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
        <Item label="Exam Code" name="exam_code">
          <Input size="large" />
        </Item>
        <Item label="Duration" name="duration">
          <InputNumber size="large" addonAfter={'Minute'} />
        </Item>
        <Item label="Num questions" name="num_questions">
          <InputNumber size="large" />
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
