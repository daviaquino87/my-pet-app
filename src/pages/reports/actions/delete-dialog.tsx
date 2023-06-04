import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
} from '@chakra-ui/react';
import { useRef } from 'react';
import { useIsMobile } from '../../../hooks/use-is-mobile';
import { ModalSize } from '../../../types/modal-size';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onOK: () => void;
  title: string;
  description: string;
  cancelText?: string;
  okText?: string;
  isLoading: boolean;
}

export function ConfirmDeleteDialog({
  isOpen,
  onClose,
  onOK,
  title,
  description,
  cancelText = 'Cancelar',
  okText = 'Remover',
  isLoading,
}: Props) {
  const cancelRef = useRef(null);

  const isMobile = useIsMobile();

  const modalSize: ModalSize = isMobile ? 'full' : 'md';

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
      isCentered
      size={modalSize}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            {title}
          </AlertDialogHeader>

          <AlertDialogBody>{description}</AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              {cancelText}
            </Button>
            <Button
              colorScheme="red"
              onClick={onOK}
              ml={3}
              isLoading={isLoading}
            >
              {okText}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
}
