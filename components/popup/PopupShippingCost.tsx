import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { Check } from "@phosphor-icons/react";

export default function PopupShippingCost() {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  return (
    <>
      <Button
        variant="flat"
        size="sm"
        onPress={onOpen}
        className="bg-emerald-600 font-medium text-white"
      >
        Atur Biaya Pengiriman
      </Button>

      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="center"
        size="sm"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="font-semibold text-default-900">
                Atur Biaya Pengiriman
              </ModalHeader>

              <ModalBody>
                <Input
                  type="text"
                  inputMode="numeric"
                  variant="flat"
                  color="default"
                  labelPlacement="outside"
                  placeholder="Cth: 50000"
                  startContent={
                    <span className="text-sm font-medium text-foreground-600">
                      Rp
                    </span>
                  }
                  classNames={{
                    input: "text-sm placeholder:text-sm",
                  }}
                />
              </ModalBody>

              <ModalFooter>
                <Button
                  color="danger"
                  variant="light"
                  onPress={onClose}
                  className="font-medium"
                >
                  Batal
                </Button>

                <Button
                  variant="solid"
                  startContent={<Check weight="bold" size={18} />}
                  className="bg-emerald-600 font-medium text-white"
                >
                  Ya, Atur Ongkir
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
