import type { PlasmoMessaging } from "@plasmohq/messaging";

import { saveQuery } from "src/db/query";

const handler: PlasmoMessaging.MessageHandler = async (req, res) => {
  const queryUrl = req.sender?.tab?.url;
  console.log("Query executed with URL:", queryUrl);

  if (!queryUrl) {
    res.send({ status: "error", message: "No URL provided" });
    return;
  }

  await saveQuery(queryUrl);

  res.send({ status: "success" });
};

export default handler;
