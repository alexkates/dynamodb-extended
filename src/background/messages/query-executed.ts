import type { PlasmoMessaging } from "@plasmohq/messaging";

import { saveQuery } from "src/db/query";

const handler: PlasmoMessaging.MessageHandler = async (req, res) => {
  const queryUrl = req.sender.tab.url;

  await saveQuery(queryUrl);

  res.send({
    status: "success",
  });
};

export default handler;
