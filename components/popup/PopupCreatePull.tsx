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

export default function PopupCreatePull({
  token,
  mutate,
}: {
  token: string;
  mutate: KeyedMutator<any>;
}) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [input, setInput] = useState<{
    url: string;
    label: string;
  }>({
    url: "",
    label: "",
  });

  async function handleCreatePull() {
    try {
      await fetcher({
        url: "/dashboard/polling",
        method: "POST",
        data: input,
        token,
      });

      Toast.success("Buat url berhasil");
      mutate();
      onClose();
      setInput({
        url: "",
        label: "",
      });
    } catch (error) {
      Toast.error("Buat url gagal");
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
        Tambah URL
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
              <ModalHeader />

              <ModalBody className="gap-8">
                <Input
                  isRequired
                  type="text"
                  inputMode="numeric"
                  variant="flat"
                  color="default"
                  label="URL"
                  labelPlacement="outside"
                  placeholder="http://127.0.0.1/api/..."
                  name="url"
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
                  label="Label"
                  labelPlacement="outside"
                  placeholder="Pilih label URL"
                  onChange={(e) => {
                    setInput({
                      ...input,
                      label: e.target.value,
                    });
                  }}
                >
                  {["produk", "kategori", "pengguna"].map((item) => (
                    <SelectItem key={item}>{item}</SelectItem>
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
                  onClick={handleCreatePull}
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
