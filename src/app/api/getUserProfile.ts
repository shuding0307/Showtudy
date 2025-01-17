import api from "@/_lib/fetcher";

export default async function GetUserProfile(nickname: string, token: string) {
  const data = await api.get({ endpoint: `user/profile?nickname=${nickname}`, authorization: token });
  return data;
}
