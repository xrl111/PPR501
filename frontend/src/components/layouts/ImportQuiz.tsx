import React from 'react';
import { Form, Select, Button, Upload, Flex, message, UploadProps } from 'antd';
import { Wrapper } from '../atoms/Wrapper';
import { UploadOutlined } from '@ant-design/icons';
import { useMutation, useQuery } from '@tanstack/react-query';
import { getExams, getSubjects, importExam } from '../../apis';
import { filterSort } from '../../utils';
import { FormValues } from '../../types';

const { Item } = Form;

interface Exam {
  id: number;
  exam_code: string;
}

interface Subject {
  id: number;
  name: string;
}

const ImportQuiz: React.FC = () => {
  const { data: examData } = useQuery({
    queryKey: ['exam'],
    queryFn: getExams,
    retry: false,
  });

  const { data: subjectData } = useQuery({
    queryKey: ['subject'],
    queryFn: getSubjects,
    retry: false,
  });

  const examOptions =
    examData?.map((exam: Exam) => ({
      value: exam.id,
      label: exam.exam_code,
    })) ?? [];

  const subjectOptions =
    subjectData?.map((subject: Subject) => ({
      value: subject.id,
      label: subject.name,
    })) ?? [];

  const importExamData = useMutation({
    mutationFn: importExam,
    onSuccess: () => {
      message.success('Imported successfully');
    },
    onError: (error: any) => {
      message.error(error.message);
    },
  });

  const onFinish = (values: FormValues) => {
    console.log('Received values:', values);
    const file = values.file?.[0]?.originFileObj;
    if (file) {
      console.log('Selected file:', file);
      const formData = new FormData();
      formData.append('file', file);
      formData.append('exam_id', values.exam_id.toString());
      formData.append('subject_id', values.subject_id.toString());
      importExamData.mutate(formData);
    }
  };

  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const props: UploadProps = {
    beforeUpload: (file) => {
      const isDocx =
        file.type ===
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
      if (!isDocx) {
        message.error(`${file.name} is not a .docx file`);
      }
      return isDocx || Upload.LIST_IGNORE;
    },
    onChange: (info) => {
      console.log(info.fileList);
    },
  };

  return (
    <Wrapper>
      <h1>Import Quiz</h1>
      <hr />
      <Form onFinish={onFinish}>
        <Flex justify="space-around" wrap>
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
              options={subjectOptions}
            />
          </Item>
          <Item
            label="File"
            name="file"
            valuePropName="fileList"
            getValueFromEvent={normFile}
          >
            <Upload name="file" {...props} listType="text">
              <Button icon={<UploadOutlined />}>Upload file</Button>
            </Upload>
          </Item>
          <Item>
            <Button type="primary" htmlType="submit">
              Import
            </Button>
          </Item>
        </Flex>
      </Form>
    </Wrapper>
  );
};

export { ImportQuiz };
