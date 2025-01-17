import api from "@/_lib/fetcher";

export default async function DeleteRecentSearchAll(token: string) {
  const data = await api.delete({ endpoint: `userSearch/recent`, authorization: token });
  return data;
}
