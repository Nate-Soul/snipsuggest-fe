<script setup lang="ts">
import { defineProps } from "vue";
import { addComment } from "~/services/comments";
import { useToast } from "vue-toastification";

const props = defineProps<{
  comment: {
    id: number;
    user: {
      username: string;
    };
    timestamp: string;
    content: string;
  };
  movie_id: number;
  containerClasses?: string;
}>();

const toast = useToast();
const commentStatus = ref<"idle" | "sending" | "sent">("idle");
const commentMsg = ref<string>("");

const addMovieComment = async (movieId: number, content: string, parentId?: number) => {
    commentStatus.value = "sending";
    try {
        await addComment(movieId, content, parentId);
        commentMsg.value = "";
        toast.success("Comment added successfully!");
        commentStatus.value = "sent";
    } catch (error) {
        toast.error("Failed to add comment. Please try again.");
        console.error("Failed to add comment:", error);
    } finally {
        commentStatus.value = "idle";
    }
};
</script>

<template>
    <div :class="`comment-parent flex items-start gap-x-4` + (containerClasses ? ` ${containerClasses}` : '')">
        <div class="w-8 h-8 rounded-full overflow-hidden flex-none">
            <img
            src="/media/images/users/default.png"
            :alt="comment.user.username"
            class="w-full h-full object-cover"
            />
        </div>
        <div class="flex flex-col gap-y-2 w-full">
            <div class="flex items-center gap-x-2 text-sm">
            <h6>{{ comment.user.username }}</h6>
            <span class="text-xs">{{ new Date(comment.timestamp).toLocaleString() }}</span>
            </div>
            <!-- <div v-if="comment.rating" class="flex items-center gap-x-1 text-primary-500">
            <Icon v-for="star in 5" :key="star" :name="star <= comment.rating ? "tabler:star-filled" : "tabler:star"" />
            </div> -->
            <p class="text-xs">{{ comment.content }}</p>
            <div class="flex items-center justify-between gap-x-4">
            <div class="flex items-center gap-x-4">
                <button><Icon name="tabler:thumb-up" /></button>
                <button><Icon name="tabler:thumb-down" /></button>
                <button><Icon name="tabler:message-reply" /></button>
            </div>
            <button><Icon name="tabler:flag-2" /></button>
            </div>
            <div class="flex items-center gap-x-2">
            <input v-model="commentMsg" type="text" :name="`comment_reply_box_${comment.id}`" :id="`commentReplyBox${comment.id}`" class="p-2 rounded-lg w-full border border-white/10 text-xs" placeholder="Add a reply">
            <button
                @click="addMovieComment(movie_id, commentMsg, comment.id)"
                :disabled="commentStatus === 'sending'"
                class="btn-icon w-6 h-6 btn-primary-gradient rounded-lg"
            >
                <Icon name="tabler:send" />
            </button>
            </div>
        </div>
    </div>
</template>