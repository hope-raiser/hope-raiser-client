import { useState } from "react";
import { createNewComment } from "@/modules/fetch/comments";
import { Form } from "antd";
import FormatCurrency from "./FormatCurrency";

export default function TabComment({ campaign, fetchCampaign }) {
  const [comment, setComment] = useState("");

  function FormatCommentDate({ commentDate }) {
    const date = new Date(commentDate);
    const formattedDate = date.toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric"
    });

    return formattedDate;
  }

  const handleCreateComment = async (e) => {
    e.preventDefault();

    const payload = {
      content: comment,
      campaignId: campaign.id
    };

    if (payload.content) {
      await createNewComment(payload);
    }

    setComment("");

    fetchCampaign();
  };

  return (
    <>
      <h1 className="font-bold text-Dark text-4xl mb-2 text-center pt-4">Comments</h1>
      <div className="flex flex-wrap">
        <div className="w-full pt-8">
          <h4 className="font-normal text-xl px-2 text-Dark">
            <span className="font-bold ">{campaign.comment.length}</span> Comments
          </h4>
          <form className="pt-8" onSubmit={handleCreateComment}>
            <input
              className="px-1 border-b mb-4 text-slate-600 border-slate-400 bg-transparent w-full focus:border-b-2 focus:border-slate-600 focus:outline-none "
              type="text"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Type here . . ."
            />
            <div className="w-full flex justify-end px-2">
              <button className="bg-Teal px-4 py-1 rounded-full text-white hover:text-slate-200 hover:bg-Teal duration-300">Send</button>
            </div>
          </form>
          <div className="px-4">
            {campaign.comment.map((comment, idx) => {
              return (
                <>
                  <div className="flex items-center gap-2">
                    <h4 className="font-semibold text-lg mb-1">{comment.user.name}</h4>
                    <p className="font-thin text-sm">
                      <FormatCommentDate key={idx} commentDate={comment.createdAt} />
                    </p>
                  </div>
                  <p className="pb-1 mb-6 border-b border-slate-100">{comment.content}</p>
                </>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
