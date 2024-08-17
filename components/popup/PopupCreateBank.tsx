import { banks } from "@/_dummy/app.data";
import { fetcher } from "@/utils/fetcher";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  useDisclosure,
} from "@nextui-org/react";
import { useState } from "react";
import Toast from "react-hot-toast";
import { KeyedMutator } from "swr";

export default function PopupCreateBank({
  token,
  mutate,
}: {
  token: string;
  mutate: KeyedMutator<any>;
}) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [input, setInput] = useState<{
    no_rekening: string;
    atas_nama: string;
    bank: string;
  }>({
    no_rekening: "",
    atas_nama: "",
    bank: "",
  });

  async function handleCreateBank() {
    try {
      await fetcher({
        url: "/dashboard/banks",
        method: "POST",
        data: input,
        token,
      });

      Toast.success("Buat rekening berhasil");
      mutate();
      onClose();
      setInput({
        no_rekening: "",
        atas_nama: "",
        bank: "",
      });
    } catch (error) {
      Toast.error("Buat rekening gagal");
      console.log(error);
    }
  }

  return (
    <>
      <Button
        variant="flat"
        size="sm"
        onClick={onOpen}
        className="bg-emerald-600 font-medium text-white"
      >
        Tambah Nomor Rekening
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
                Informasi
              </ModalHeader>

              <ModalBody>
                <Input
                  isRequired
                  type="text"
                  inputMode="numeric"
                  variant="flat"
                  color="default"
                  label="Nomor Rekening"
                  labelPlacement="outside"
                  placeholder="Cth: 0101010101"
                  name="no_rekening"
                  autoComplete="off"
                  onChange={(e) => {
                    setInput({
                      ...input,
                      [e.target.name]: e.target.value,
                    });
                  }}
                  classNames={{
                    input: "text-sm placeholder:text-sm",
                  }}
                />

                <Input
                  isRequired
                  type="text"
                  inputMode="numeric"
                  variant="flat"
                  color="default"
                  label="Atas Nama"
                  labelPlacement="outside"
                  placeholder="Cth: John"
                  name="atas_nama"
                  autoComplete="off"
                  onChange={(e) => {
                    setInput({
                      ...input,
                      [e.target.name]: e.target.value,
                    });
                  }}
                  classNames={{
                    input: "text-sm placeholder:text-sm",
                  }}
                />

                <Select
                  isRequired
                  label="Bank"
                  labelPlacement="outside"
                  placeholder="Cth: BCA"
                  onChange={(e) => {
                    setInput({
                      ...input,
                      bank: e.target.value,
                    });
                  }}
                >
                  {banks.map((bank) => (
                    <SelectItem key={bank}>{bank}</SelectItem>
                  ))}
                </Select>
              </ModalBody>

              <ModalFooter>
                <Button
                  color="danger"
                  variant="light"
                  onClick={onClose}
                  className="font-medium"
                >
                  Batal
                </Button>

                <Button
                  variant="solid"
                  className="bg-emerald-600 font-medium text-white"
                  isDisabled={
                    !Object.values(input).every((value) => value.trim() !== "")
                  }
                  onClick={handleCreateBank}
                >
                  Simpan
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
