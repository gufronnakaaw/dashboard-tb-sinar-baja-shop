import { formatRupiah } from "@/utils/formatRupiah";
import { angkaTerbilang } from "@/utils/terbilang";

const TemplateInvoice = () => {
  return (
    <>
      <div className="container grid gap-4 pt-4 font-inter">
        <div className="flex items-start justify-between gap-4">
          <div className="grid gap-1">
            <h1 className="font-bold text-black">TB. SINAR BAJA</h1>
            <p className="max-w-[300px] text-[10px] font-medium text-black">
              Jl. Letjend Sutoyo No.67, Burengan, Kec. Pesantren, Kabupaten
              Kediri, Jawa Timur 64131
            </p>
            <p className="max-w-[300px] text-[10px] font-medium text-black">
              082140735711
            </p>
          </div>

          <div className="grid items-start gap-1">
            <h1 className="font-bold uppercase text-black">Invoice</h1>

            <div className="grid">
              <div className="grid w-[250px] grid-cols-[70px_6px_1fr] gap-1 text-[10px] text-black">
                <div className="font-medium">Nomor</div>
                <div className="font-medium">:</div>
                <p className="font-medium">INVOUT150824040847</p>
              </div>

              <div className="grid w-[250px] grid-cols-[70px_6px_1fr] gap-1 text-[10px] text-black">
                <div className="font-medium">ID Transaksi</div>
                <div className="font-medium">:</div>
                <p className="font-medium">TX150824040847</p>
              </div>

              <div className="grid w-[250px] grid-cols-[70px_6px_1fr] gap-1 text-[10px] text-black">
                <div className="font-medium">Pembeli</div>
                <div className="font-medium">:</div>
                <p className="font-medium">Fajar Fadillah Agustian</p>
              </div>

              <div className="grid w-[250px] grid-cols-[70px_6px_1fr] gap-1 text-[10px] text-black">
                <div className="font-medium">Tanggal</div>
                <div className="font-medium">:</div>
                <p className="font-medium">15 Agustus 2024</p>
              </div>

              <div className="grid w-[250px] grid-cols-[70px_6px_1fr] gap-1 text-[10px] text-black">
                <div className="font-medium">No. Telpon</div>
                <div className="font-medium">:</div>
                <p className="font-medium">0853423582136</p>
              </div>

              <div className="grid w-[250px] grid-cols-[70px_6px_1fr] gap-1 text-[10px] text-black">
                <div className="font-medium">Alamat</div>
                <div className="font-medium">:</div>
                <p className="font-medium">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quae
                  ut accusantium obcaecati itaque aliquid animi dolores corrupti
                  delectus officiis quidem amet.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-4">
          <table className="table-auto border border-black">
            <thead>
              <tr className="border-b border-black text-left text-[10px] font-medium text-black">
                <th className="px-2 py-1">Jumlah</th>
                <th className="px-2 py-1">Nama Produk</th>
                <th className="px-2 py-1">Harga</th>
                <th className="px-2 py-1">Subtotal</th>
              </tr>
            </thead>

            <tbody>
              <tr className="text-left text-[10px] text-black">
                <td className="w-[100px] px-2 py-1">3 btg</td>
                <td className="w-max px-2 py-1">Kayu Jati Perhutani</td>
                <td className="w-max px-2 py-1">{formatRupiah(210000)}</td>
                <td className="w-amax px-2 py-1">{formatRupiah(630000)}</td>
              </tr>
            </tbody>
          </table>

          <div className="flex items-start justify-between">
            <div className="grid grid-cols-[45px_2px_1fr] gap-1 text-[10px] text-black">
              <div className="w-24 font-bold italic">Terbilang</div>
              <div className="font-bold italic">:</div>
              <p className="max-w-[450px] font-bold capitalize italic">
                {angkaTerbilang(680000)}
              </p>
            </div>

            <div className="grid justify-self-end border border-black p-2">
              <div className="grid grid-cols-[65px_6px_1fr] gap-1 text-[10px] text-black">
                <div className="w-24 font-medium">Ongkir</div>
                <div className="font-medium">:</div>
                <p className="font-medium">{formatRupiah(50000)}</p>
              </div>

              <div className="grid grid-cols-[65px_6px_1fr] gap-1 text-[10px] text-black">
                <div className="w-24 font-medium">Subtotal</div>
                <div className="font-medium">:</div>
                <p className="font-medium">{formatRupiah(630000)}</p>
              </div>

              <div className="grid grid-cols-[65px_6px_1fr] gap-1 text-[10px] text-black">
                <div className="w-24 font-medium">Total</div>
                <div className="font-medium">:</div>
                <p className="font-medium">{formatRupiah(680000)}</p>
              </div>
            </div>
          </div>

          <div className="mr-5 mt-2 grid justify-self-end">
            <h1 className="text-[10px] font-normal text-black">
              Kediri, 15 Agustus 2024
            </h1>
            <h1 className="mt-1 text-center text-[10px] font-bold text-black">
              TB. SINAR BAJA
            </h1>
          </div>
        </div>
      </div>
    </>
  );
};

export default TemplateInvoice;
