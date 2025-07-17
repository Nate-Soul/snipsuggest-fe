import { useApiFetch } from "~/composables/useFetchAPI";

export const addComment = async (id: number, commentMsg: string, parent_id?: number) => {
  try {
    await useApiFetch(`/api/comments/${id}`, {
      method: 'POST',
      body: {
        content: commentMsg,
        parent_id: parent_id || null,
      }
    });
  } catch (err: any) {
    console.log("Error adding comment:", err);
    throw new Error(err.message || "Failed to add comment.");
  }
};