<script setup lang="ts">
import { defineProps } from "vue";
import { useToast } from "vue-toastification";
import { useComments } from "~/composables/useComments";
import { useTimeFormatter } from "~/composables/useTimeFormatter";

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
  refreshFn: () => Promise<void>;
}>();

const { addComment, removeComment } = useComments();
const toast = useToast();
const commentStatus = ref<"idle" | "sending" | "sent">("idle");
const commentMsg = ref<string>("");


const commentTimestamp = ref<string>(props.comment.timestamp);

const timeFormatterResult = useTimeFormatter(commentTimestamp.value);
const formattedTime = 'formattedTime' in timeFormatterResult ? timeFormatterResult.formattedTime : timeFormatterResult;

const addMovieComment = async (movieId: number, content: string, parentId?: number) => {
    commentStatus.value = "sending";
    try {
        await addComment(movieId, content, parentId);
        commentMsg.value = "";
        commentStatus.value = "sent";
        await props.refreshFn();
        toast.success("Comment added successfully!");
    } catch (error) {
        toast.error("Failed to add comment. Please try again.");
        console.error("Failed to add comment:", error);
    } finally {
        commentStatus.value = "idle";
    }
};

const handleRemoveComment = async (commentId: number) => {
    commentStatus.value = "sending";
    try {
        await removeComment(commentId);
        commentStatus.value = "sent";
        await props.refreshFn();
        toast.success("Comment removed successfully!");
    } catch (error) {
        toast.error("Failed to remove comment. Please try again.");
        console.error("Failed to remove comment:", error);
    } finally {
        commentStatus.value = "idle";
    }
};
</script>

<template>
    <div :class="`comment-parent flex items-start gap-x-4` + (containerClasses ? `${containerClasses}` : '')">
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
            <date :datetime="comment.timestamp" class="text-xs">{{ formattedTime }}</date>
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
                <button @click="handleRemoveComment(comment.id)" :disabled="commentStatus === 'sending'"><Icon name="tabler:trash" /></button>
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