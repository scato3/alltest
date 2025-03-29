import React from "react";
import { AxiosError } from "axios";
import { createPortal } from "react-dom";
import { ErrorModal } from "../components/ErrorModal";
import { createRoot } from "react-dom/client";

interface ErrorResponse {
  message: string;
  code?: string;
  errors?: Record<string, string[]>;
}

// 모달을 표시할 컨테이너 생성 및 관리
const createModalContainer = () => {
  const containerId = "error-modal-container";
  let container = document.getElementById(containerId);

  if (!container) {
    container = document.createElement("div");
    container.id = containerId;
    document.body.appendChild(container);
  }

  return container;
};

// Portal 컴포넌트
const ModalPortal = ({ children }: { children: React.ReactNode }) => {
  const container = createModalContainer();
  return createPortal(children, container);
};

// 모달 표시 함수
const showModal = (props: { title: string; message: string }) => {
  const container = createModalContainer();
  const modalRoot = createRoot(container);

  const handleClose = () => {
    modalRoot.unmount();
    container.remove();
  };

  const ModalComponent = () => (
    <ModalPortal>
      <ErrorModal
        title={props.title}
        message={props.message}
        onClose={handleClose}
      />
    </ModalPortal>
  );

  modalRoot.render(<ModalComponent />);
};

export const parseApiError = (error: unknown) => {
  if (error instanceof AxiosError) {
    const status = error.response?.status;
    const data = error.response?.data as ErrorResponse;

    switch (status) {
      case 400:
        showModal({
          title: "입력 오류",
          message: data.message || "입력하신 정보를 다시 확인해주세요.",
        });
        break;

      case 401:
        showModal({
          title: "인증 필요",
          message: "로그인이 필요한 서비스입니다.",
        });
        // 로그인 페이지로 리다이렉트 등의 추가 처리
        break;

      case 403:
        showModal({
          title: "접근 제한",
          message: "해당 기능에 대한 권한이 없습니다.",
        });
        break;

      default:
        showModal({
          title: "ㅋㅋㅋㅋ",
          message: "요청을 처리하는 중 문제가 발생했습니다.",
        });
    }
  } else {
    showModal({
      title: "오류 발생",
      message: "알 수 없는 오류가 발생했습니다.",
    });
  }
};

// QueryProvider에서 사용할 에러 핸들러
export const handleApiError = (error: unknown) => {
  parseApiError(error);
};
