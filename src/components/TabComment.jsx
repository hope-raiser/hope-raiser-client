import { useState } from "react";
import Router, { useRouter } from "next/router";
import { createNewComment } from "@/modules/fetch/comments";
import { Form } from "antd";
import FormatCurrency from "./FormatCurrency";
import { Avatar } from "@chakra-ui/react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

export default function TabComment({ campaign, fetchCampaign, accessToken }) {
  const [comment, setComment] = useState("");
  const router = useRouter();
  const arrayComment = campaign.comment.map((comment) => comment);
  const reverseArray = arrayComment.reverse();

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

    if (accessToken) {
      const payload = {
        content: comment,
        campaignId: campaign.id
      };

      if (payload.content) {
        await createNewComment(payload);
      }
      setComment("");
    } else {
      router.push("/login");
    }

    fetchCampaign();
  };

  return (
    <>
      <h1 className="font-bold text-Dark text-3xl md:text-4xl mb-2 text-center pt-4">Comments</h1>
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
            {reverseArray.map((comment,idx) => {
              const commentDate = dayjs(comment.createdAt).fromNow();
              return (
                <div key={idx}>
                   <div className="flex gap-2">
                    <Avatar size='md' src={comment.user.avatar} mb={4} />
                    <div>
                      <h4 className="font-semibold text-lg ">{comment.user.name}</h4>
                      <p className="font-thin text-sm">
                        {commentDate}
                      </p>
                    </div>
                  </div>
                  <p className="pb-1 mb-6 border-b border-slate-100">{comment.content}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
