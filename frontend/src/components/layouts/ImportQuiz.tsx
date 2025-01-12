import React from 'react';
import {
  Form,
  Select,
  Button,
  Upload,
  message,
  UploadProps,
  Typography,
  Col,
  Row,
} from 'antd';
import { Wrapper } from '../atoms/Wrapper';
import { InboxOutlined } from '@ant-design/icons';
import { useMutation, useQuery } from '@tanstack/react-query';
import { getExams, getSubjects, createQuestion } from '../../apis';
import { filterSort } from '../../utils';
import { ExamOption, FormValues, SubjectOption } from '../../types';

const { Item } = Form;
const { Dragger } = Upload;
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
    examData?.map((exam: ExamOption) => ({
      value: exam.id,
      label: exam.exam_code,
    })) ?? [];

  const subjectOptions =
    subjectData?.map((subject: SubjectOption) => ({
      value: subject.id,
      label: subject.name,
    })) ?? [];

  const createQuestionData = useMutation({
    mutationFn: createQuestion,
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
      createQuestionData.mutate(formData);
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
    customRequest: ({ onSuccess }) => {
      setTimeout(() => {
        if (onSuccess) {
          onSuccess('ok');
        }
      }, 0);
    },
  };

  const downloadFile = () => {
    const link = document.createElement('a');
    link.href = 'src/assets/Ngan_Hang_Cau_Hoi.docx'; // Đường dẫn đến file cần tải
    link.download = 'Ngan_Hang_Cau_Hoi.docx'; // Tên file khi tải về
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  return (
    <Wrapper>
      <Typography.Title level={1}>Tạo câu hỏi</Typography.Title>
      <hr />
      <Form onFinish={onFinish} layout="vertical">
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
              <Button type="default" size="large" onClick={downloadFile}>
                Download Docx Template
              </Button>
            </Item>
          </Col>
          <Col span={24}>
            <Item>
              <Typography.Text style={{ color: 'red' }}>
                Lưu ý: Tải file Ngan_Hang_Cau_Hoi.docx về và sửa lại theo mẫu
                rồi sau đó import file đó vào đây!
              </Typography.Text>
            </Item>
          </Col>
          <Col span={24}>
            <Item
              name="file"
              valuePropName="fileList"
              getValueFromEvent={normFile}
            >
              <Dragger {...props} name="file" listType="text">
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
            <Item>
              <Button type="primary" htmlType="submit" size="large">
                Import
              </Button>
            </Item>
          </Col>
        </Row>
      </Form>
    </Wrapper>
  );
};

export { ImportQuiz };
