"use server";

import { sendBroadcastEmailImpl } from "@wedding/actions";
import { weddingConfig } from "../../wedding.config";

const broadcastConfig = {
  coupleName: `${weddingConfig.couple.person1.firstName} & ${weddingConfig.couple.person2.firstName}`,
  person1Initial: weddingConfig.couple.person1.firstName[0],
  person2Initial: weddingConfig.couple.person2.firstName[0],
};

export async function sendBroadcastEmail(formData: FormData) {
  return sendBroadcastEmailImpl(formData, broadcastConfig);
}
