import React, { useState } from 'react';
import { Wrapper } from '../../atoms';
import { Button, Modal, Table, Typography } from 'antd';

import { getExams, getExamSchedules } from '../../../apis';
import { useQuery } from '@tanstack/react-query';
import { CreateExamSchedule } from './CreateExamSchedule';
import { ExamData, ShowExamScheduleData } from '../../../types';

const GetExamSchedule: React.FC = () => {
  const [open, setOpen] = useState(false);

  const showModal = () => setOpen(true);
  const handleCancel = () => setOpen(false);
  const { data: examScheduleList, refetch: refetchExamSchedule } = useQuery({
    queryKey: ['examSchedule'],
    queryFn: getExamSchedules,
    retry: false,
  });
  const { data: examData, refetch: refetchExam } = useQuery({
    queryKey: ['exam'],
    queryFn: getExams,
    retry: false,
  });
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Exam',
      dataIndex: 'exam',
      key: 'exam',
    },
    {
      title: 'Active',
      dataIndex: 'is_active',
      key: 'is_active',
    },
    {
      title: 'Start Time',
      dataIndex: 'start_time',
      key: 'start_time',
    },
    {
      title: 'End Time',
      dataIndex: 'end_time',
      key: 'end_time',
    },
  ];
  const showData = examScheduleList?.map((item: ShowExamScheduleData) => ({
    ...item,
    exam: examData?.find((exam: ExamData) => exam.id === item.exam)?.exam_code,
    is_active: item.is_active ? 'Active' : 'Inactive',
    start_time: new Date(item.start_time).toLocaleString(),
    end_time: new Date(item.end_time).toLocaleString(),
  }));

  const handleCancelRefetch = () => {
    refetchExam();
    refetchExamSchedule();
    handleCancel();
  };
  return (
    <Wrapper>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
        }}
      >
        <Typography.Title level={2}>Danh sách lịch thi</Typography.Title>
        <Button type="primary" onClick={showModal}>
          Tạo câu hỏi
        </Button>
        <Modal open={open} onCancel={handleCancelRefetch} footer={null}>
          <CreateExamSchedule />
        </Modal>
      </div>
      <Table
        columns={columns}
        dataSource={showData}
        rowKey="id"
        scroll={{ x: 'max-content' }}
      />
    </Wrapper>
  );
};

export { GetExamSchedule };
