import FormatCurrency from "./FormatCurrency";

export default function TabDonation({ campaign }) {
  function FormatDate({ donateDate }) {
    const date = new Date(donateDate);
    const formattedDate = date.toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric"
    });

    return formattedDate;
  }

  return (
    <>
      {/* SECTION DONATIONS */}
      <h1 className="font-bold text-Dark text-3xl md:text-4xl mb-2 text-center pt-4">Donations</h1>
      <div className="flex flex-wrap">
        <div className="w-full pt-8 ">
          <h4 className="font-semibold text-2xl px-2 text-Dark">Supporters</h4>
          <div className="flex flex-col pt-8 px-2">
            <div className="overflow-auto max-h-[600px]">
              <table className="min-w-full text-center text-base font-light">
                <thead className="border-b font-medium bg-slate-100">
                  <tr>
                    <th scope="col" className="px-6 py-4">
                      #
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Name
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Donate
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {campaign.donations.map((don, idx) => {
                    return (
                      <>
                        <tr className="border-b dark:border-neutral-500 hover:bg-slate-100 duration-100" key={idx}>
                          <td className="px-6 py-4 font-medium">{idx + 1}</td>
                          <td className="px-6 py-4">{don.user.name}</td>
                          <td className="px-6 py-4">
                            <FormatCurrency amount={don.amount} />
                          </td>
                          <td className="px-6 py-4">
                            <FormatDate donateDate={don.createdAt} />
                          </td>
                        </tr>
                      </>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
