import {
  Button,
  Checkbox,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { Check } from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function PopupPaymentProot({
  transaksi_id,
  token,
}: {
  transaksi_id: string;
  token: string;
}) {
  const [isSelected, setIsSelected] = useState(false);
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  return (
    <>
      <Button
        variant="flat"
        onPress={onOpen}
        className="bg-emerald-600 font-medium text-white"
        size="sm"
      >
        Lihat Bukti Pembayaran
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
                Bukti Pembayaran
              </ModalHeader>

              <ModalBody>
                <div className="grid gap-6">
                  <Link
                    href="/img/struk-pembayaran.jpg"
                    target="_blank"
                    className="flex aspect-square h-auto w-full items-center justify-center overflow-hidden rounded-xl border-[2px] border-dashed border-foreground-400"
                  >
                    <Image
                      priority
                      src="/img/struk-pembayaran.jpg"
                      alt="receipt img"
                      width={500}
                      height={500}
                      className="h-full w-full object-cover object-center"
                    />
                  </Link>

                  <div className="grid gap-6">
                    <div className="grid grid-cols-2 grid-rows-2 gap-1">
                      <div className="col-span-2">
                        <span className="mb-1 text-[12px] text-foreground-600">
                          Nama <span className="text-danger-600">*</span>
                        </span>
                        <h6 className="text-sm font-semibold text-foreground">
                          Fajar Fadillah Agustian
                        </h6>
                      </div>

                      <div>
                        <span className="mb-1 text-[12px] text-foreground-600">
                          Bank <span className="text-danger-600">*</span>
                        </span>
                        <h6 className="text-sm font-semibold text-foreground">
                          Mandiri
                        </h6>
                      </div>
                    </div>

                    <Checkbox
                      color="default"
                      isSelected={isSelected}
                      onValueChange={setIsSelected}
                      classNames={{
                        label: "text-[12px] font-medium text-foreground-600",
                      }}
                    >
                      Menyetujui Pembayaran
                    </Checkbox>
                  </div>
                </div>
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
                  isDisabled={isSelected ? false : true}
                  variant="solid"
                  startContent={<Check weight="bold" size={18} />}
                  className={`font-medium ${isSelected ? "bg-emerald-600 text-white" : "bg-foreground-200 text-foreground-600"}`}
                >
                  Ya, Verifikasi
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
