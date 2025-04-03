import { AxiosError } from 'axios';
import { useModal } from '../app/provider/modal-provider';
import { ErrorModal } from '../components/ErrorModal';
import { useRouter } from 'next/navigation';

interface ErrorResponse {
  message: string;
  code?: string;
  errors?: Record<string, string[]>;
}

const getErrorContent = (error: unknown) => {
  if (error instanceof AxiosError) {
    const status = error.response?.status;
    const data = error.response?.data as ErrorResponse;

    switch (status) {
      case 400:
        return {
          title: '입력 오류',
          message: data.message || '입력하신 정보를 다시 확인해주세요.',
        };

      case 401:
        return {
          title: '인증 필요',
          message: '로그인이 필요한 서비스입니다.',
        };

      case 403:
        return {
          title: '접근 제한',
          message: '해당 기능에 대한 권한이 없습니다.',
        };

      default:
        return {
          title: '오류 발생',
          message: '요청을 처리하는 중 문제가 발생했습니다.',
        };
    }
  }

  return {
    title: '오류 발생',
    message: '알 수 없는 오류가 발생했습니다.',
  };
};

export const ErrorHandler = () => {
  const router = useRouter();
  const { showModal, hideModal } = useModal();

  return (error: unknown) => {
    const { title, message } = getErrorContent(error);
    showModal(
      <ErrorModal title={title} message={message} onClose={hideModal} />,
      () => router.push('/'),
    );
  };
};
