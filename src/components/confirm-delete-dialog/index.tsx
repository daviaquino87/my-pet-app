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

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onOK: () => void;
  title: string;
  description: string;
  cancelText?: string;
  okText?: string;
}

export function ConfirmDeleteDialog({
  isOpen,
  onClose,
  onOK,
  title,
  description,
  cancelText = 'Cancelar',
  okText = 'Remover',
}: Props) {
  const cancelRef = useRef(null);

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
      isCentered
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
            <Button colorScheme="red" onClick={onOK} ml={3}>
              {okText}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
}
