import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from '@chakra-ui/react';
import { subtractDays } from '../../utils/subtract-days';
import { OnDateSelected, RangeCalendarPanel } from 'chakra-dayzed-datepicker';
import { useState } from 'react';
import { chakraCalendarConfig } from '../../constants/chakra-calendar-condig';
import { endOfDay, format } from 'date-fns';
import { privateApi } from '../../services/api';
import { EndpointsEnum } from '../../enum/endpoints';
import { AxiosError } from 'axios';
import { useToast } from '../../hooks/use-toast';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function ExportDialog({ isOpen, onClose }: Props) {
  const [selectedDates, setSelectedDates] = useState<Date[]>(() => {
    return [subtractDays(new Date(), 7), new Date()];
  });

  const [isLoading, setIsLoading] = useState(false);

  const toast = useToast();

  const handleCloseDialog = () => {
    setIsLoading(false);
    onClose();
  };

  const handleOnDateSelected: OnDateSelected = ({ selectable, date }) => {
    let newDates = [...selectedDates];
    if (selectedDates.length) {
      if (selectedDates.length === 1) {
        let firstTime = selectedDates[0];
        if (firstTime < date) {
          newDates.push(date);
        } else {
          newDates.unshift(date);
        }
        setSelectedDates(newDates);
        return;
      }

      if (newDates.length === 2) {
        setSelectedDates([date]);
        return;
      }
    } else {
      newDates.push(date);
      setSelectedDates(newDates);
    }
  };

  const handleExport = async () => {
    setIsLoading(true);
    const [startDate, endDate] = selectedDates;
    const datesParams = {
      // TODO: create formatter utils function
      initialDate: format(endOfDay(startDate), 'yyyy-MM-dd 00:00:00'),
      finalDate: format(endOfDay(endDate), 'yyyy-MM-dd 23:59:59'),
    };

    // TODO: cancel timeout and isLoading false
    // https://axios-http.com/docs/cancellation#cancel-token-code-deprecated-code
    privateApi
      .get(EndpointsEnum.EXPORT_SPENDING, {
        params: datesParams,
        responseType: 'arraybuffer',
        transformResponse: (response: Uint8Array, headers) => {
          if (
            headers['content-type']?.toString().includes('application/json')
          ) {
            // no rows found, show toast error
            let utf8decoder = new TextDecoder();
            const json = JSON.parse(utf8decoder.decode(response)) as {
              message: string;
            };
            return json;
          }

          // exist file to download
          return response;
        },
      })
      .then((response) => {
        const blob = new Blob([response.data], { type: 'application/pdf' });

        const link = document.createElement('a');
        const blobUrl = window.URL.createObjectURL(blob);
        link.href = blobUrl;
        link.download = 'report-spending.pdf';

        document.body.appendChild(link);

        link.click();

        window.URL.revokeObjectURL(blobUrl);

        document.body.removeChild(link);
      })
      .catch((error: AxiosError<{ message: string }>) => {
        if (error.response?.data.message) {
          toast.error({ title: error.response?.data.message });
          return;
        }
        toast.error({ title: 'Erro desconhecido!' });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <Modal isCentered isOpen={isOpen} onClose={handleCloseDialog}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Exportar relatório</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <RangeCalendarPanel
            selected={selectedDates}
            dayzedHookProps={{
              showOutsideDays: false,
              onDateSelected: handleOnDateSelected,
              selected: selectedDates,
              monthsToDisplay: 1,
            }}
            configs={chakraCalendarConfig}
          />
        </ModalBody>

        <ModalFooter>
          <Button mr={3} onClick={handleCloseDialog}>
            Cancaler
          </Button>
          <Button
            isLoading={isLoading}
            onClick={handleExport}
            bg="orange.300"
            color="gray.800"
            _hover={{
              bg: 'orange.400',
            }}
          >
            Exportar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
