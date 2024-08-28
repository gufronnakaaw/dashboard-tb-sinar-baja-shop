import { fetcher } from "@/utils/fetcher";
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
import { useState } from "react";
import Toast from "react-hot-toast";

export default function PopupShippingCost({
  transaksi_id,
  token,
}: {
  transaksi_id: string;
  token: string;
}) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [value, setValue] = useState("");

  async function handleCost() {
    try {
      await fetcher({
        url: "/dashboard/transactions/cost",
        method: "PATCH",
        data: {
          transaksi_id,
          subtotal_ongkir: parseInt(value),
        },
        token,
      });

      Toast.success("Update ongkir berhasil");
      window.location.reload();
    } catch (error) {
      Toast.error("Update ongkir gagal");
      console.log(error);
    }
  }

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
                  value={value}
                  onChange={(e) => {
                    if (!e.target.value) {
                      setValue("");
                    } else {
                      setValue(e.target.value);
                    }
                  }}
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
                  onPress={() => {
                    onClose();
                    setValue("");
                  }}
                  className="font-medium"
                >
                  Batal
                </Button>

                <Button
                  variant="solid"
                  startContent={<Check weight="bold" size={18} />}
                  className="bg-emerald-600 font-medium text-white"
                  onClick={handleCost}
                  isDisabled={!value}
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
