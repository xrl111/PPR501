import React, { useState, useEffect, useMemo } from 'react';
import {
  Form,
  Select,
  Button,
  Upload,
  message,
  Typography,
  Col,
  Row,
  UploadProps,
  Flex,
} from 'antd';
import { Wrapper } from '../../atoms/Wrapper';
import { InboxOutlined } from '@ant-design/icons';
import { useMutation, useQuery } from '@tanstack/react-query';
import { getExams, getSubjects, createQuestion } from '../../../apis';
import { filterSort } from '../../../utils';
import {
  ExamData,
  ExamOption,
  Exam,
  FormValues,
  SubjectOption,
} from '../../../types';

const { Item } = Form;
const { Dragger } = Upload;

const ImportQuiz: React.FC = () => {
  const [selectedSubjectId, setSelectedSubjectId] = useState<number | null>(
    null
  );
  const [examOptions, setExamOptions] = useState<Exam[]>([]);
  const [form] = Form.useForm();

  const { data: subjectData } = useQuery({
    queryKey: ['subject'],
    queryFn: getSubjects,
    retry: false,
  });

  const { data: examData, refetch: refetchExams } = useQuery({
    queryKey: ['exams', selectedSubjectId],
    queryFn: getExams,
    enabled: !!selectedSubjectId,
    retry: false,
  });

  const subjectOptions = useMemo(
    () =>
      subjectData?.map((subject: SubjectOption) => ({
        value: subject.id,
        label: subject.name,
      })) ?? [],
    [subjectData]
  );

  useEffect(() => {
    if (subjectOptions.length > 0 && selectedSubjectId !== null && examData) {
      const filteredExams = examData
        .filter((exam: ExamData) => exam.subject === selectedSubjectId)
        .map((exam: ExamOption) => ({
          ...exam,
          value: exam.id,
          label: exam.exam_code,
        }));
      setExamOptions(filteredExams);
    }
  }, [subjectOptions, selectedSubjectId, examData]);

  const createQuestionData = useMutation({
    mutationFn: createQuestion,
    onSuccess: () => {
      message.success('Imported successfully');
      form.resetFields();
    },
    onError: (error: Error) => {
      message.error(error.message);
    },
  });

  const onFinish = (values: FormValues) => {
    const file = values.file?.[0]?.originFileObj;
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('exam_id', values.exam_id.toString());
      formData.append('subject_id', values.subject_id.toString());
      createQuestionData.mutate(formData);
    }
  };

  const normFile = (e: { file: File; fileList: File[] }) => {
    return Array.isArray(e) ? e : e?.fileList;
  };

  const uploadProps: UploadProps = {
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
    customRequest: ({ onSuccess }) => {
      setTimeout(() => {
        if (onSuccess) {
          onSuccess('ok');
        }
      }, 0);
    },
  };

  useEffect(() => {
    if (selectedSubjectId) {
      refetchExams();
    }
  }, [selectedSubjectId, refetchExams]);

  return (
    <Wrapper>
      <Typography.Title level={1}>Tạo câu hỏi</Typography.Title>
      <hr />
      <Form form={form} onFinish={onFinish} layout="vertical">
        <Row gutter={16}>
          <Col span={12}>
            <Item label="Môn học" name="subject_id">
              <Select
                showSearch
                placeholder="Search to Select"
                optionFilterProp="label"
                filterSort={filterSort}
                options={subjectOptions}
                size="large"
                onChange={(value) => setSelectedSubjectId(value)}
              />
            </Item>
          </Col>
          <Col span={12}>
            <Item label="Bài thi" name="exam_id">
              <Select
                showSearch
                placeholder="Search to Select"
                optionFilterProp="label"
                filterSort={filterSort}
                options={examOptions}
                size="large"
              />
            </Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Item>
              <Typography.Text style={{ color: 'red' }}>
                Lưu ý: Tải file{' '}
                <a
                  href="/src/assets/Ngan_Hang_Cau_Hoi.docx"
                  download={'Ngan_Hang_Cau_Hoi.docx'}
                >
                  Ngan_Hang_Cau_Hoi.docx
                </a>{' '}
                về và sửa lại theo mẫu rồi sau đó import file đó vào đây!
              </Typography.Text>
            </Item>
          </Col>
          <Col span={24}>
            <Item
              name="file"
              valuePropName="fileList"
              getValueFromEvent={normFile}
            >
              <Dragger {...uploadProps} name="file" listType="text">
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">
                  Click or drag file to this area to upload
                </p>
                <p className="ant-upload-hint">
                  Support for a single or bulk upload. Strictly prohibit from
                  uploading company data or other band files
                </p>
              </Dragger>
            </Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Flex justify="end" align="center" style={{ marginTop: 16 }}>
              <Item>
                <Button type="primary" htmlType="submit" size="large">
                  Import
                </Button>
              </Item>
            </Flex>
          </Col>
        </Row>
      </Form>
    </Wrapper>
  );
};

export { ImportQuiz };
