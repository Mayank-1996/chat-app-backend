import { admin } from "../firebase";

const userNames: Record<number, string> = {
  1001: "Eshani",
  1002: "MOMO",
};

function getUserName(user_id: number) {
  if (userNames[user_id]) {
    return userNames[user_id];
  }
  return "Koi To Bhi";
}
export default function sendFCMmessage(
  token: string,
  message: Record<string, string | number>
) {
  const notification = {
    token: token,
    data: {
      title: getUserName(message.user_id as number),
      body: message.text,
    },
  };
  console.log("sent");
  admin
    .messaging()
    .send(notification)
    .then((response: any) => {
      console.log("Notification sent successfully:", response);
      return "success";
    })
    .catch((error: Error) => {
      console.log("Error sending notification:", error);
      return "failure";
    });
  console.log("Error sending notification : Cause not known");
  return "failure";
}
