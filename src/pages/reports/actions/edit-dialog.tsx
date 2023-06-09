import {
  Button,
  FormControl,
  FormLabel,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { CustomCurrencyInput } from "../../../components/input-currency";
import { useIsMobile } from "../../../hooks/use-is-mobile";
import { ModalSize } from "../../../types/modal-size";
import { ISpending } from "../../../types/spending";

export type SpendingBaseType = Pick<ISpending, "id" | "price">;

interface Props {
  isOpen: boolean;
  onClose: () => void;
  price: string | number;
  onEdit: (values: SpendingBaseType) => void;
  id: string;
  isLoading: boolean;
}

export function EditDialog({
  isOpen,
  isLoading,
  id,
  price,
  onEdit,
  onClose,
}: Props) {
  const initialRef = useRef<HTMLInputElement>(null);

  const [editPrice, setEditPrice] = useState<string | number>(0);

  const isMobile = useIsMobile();

  const modalSize: ModalSize = isMobile ? "full" : "md";

  const handleEdit = () => {
    onEdit({ id, price: editPrice });
  };

  useEffect(() => {
    if (isOpen) {
      setEditPrice(price);
    }
  }, [isOpen, price]);

  return (
    <Modal
      initialFocusRef={initialRef}
      isOpen={isOpen}
      onClose={onClose}
      size={modalSize}
    >
      <ModalOverlay />
      {/* TODO: as form, remove animation of modal. Investigate */}
      <ModalContent>
        <ModalHeader>Editar despesa</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl>
            <FormLabel>Preço</FormLabel>
            <CustomCurrencyInput
              value={editPrice}
              onChange={(newValue) => setEditPrice(newValue)}
              ref={initialRef}
            />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button onClick={onClose}>Cancelar</Button>
          <Button
            color="gray.800"
            bg="orange.300"
            _hover={{
              bg: "orange.400",
            }}
            type="submit"
            ml={3}
            onClick={handleEdit}
            isLoading={isLoading}
          >
            Editar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
