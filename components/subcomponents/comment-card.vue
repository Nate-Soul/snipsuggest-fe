<script setup lang="ts">
import { defineProps } from "vue";
import { debounce } from "lodash-es";
import { useToast } from "vue-toastification";
import { useComments } from "~/composables/useComments";
import { formatTime } from '~/utils/helpers';
import { useFormValidation } from "~/composables/useFormValidation";

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
const { validateForm, validateText } = useFormValidation();

const toast = useToast();
const commentStatus = ref<"idle" | "sending" | "sent">("idle");
const commentMsg = ref<string>("");
const isVisibleReply = ref<boolean>(false);

const commentBtn = ref<HTMLButtonElement | null>(null);
const commentInput = ref<HTMLInputElement | null>(null);

const addMovieComment = debounce(async (movieId: number, content: string, parentId?: number) => {
    const isValid = validateForm([
        { 
        name: 'comment_msg', 
        value: commentMsg.value, 
        validator: validateText 
        }
    ]);
    
    if (isValid) {
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
    } else {
        toast.error("Please enter a valid comment.");
        commentStatus.value = "idle";
        return;
    }
}, 300);

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

const handleReplyToggle = () => {
    isVisibleReply.value = !isVisibleReply.value;
    if (commentInput.value && isVisibleReply.value) {
        commentInput.value.focus();
    }
};

const handleEnterKey = async (event: KeyboardEvent) => {
    if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault(); // Prevent form submission or newline
        if (commentStatus.value === "idle" && commentMsg.value.trim()) {
            await addMovieComment(props.movie_id, commentMsg.value, props.comment.id);
        }
    }
};

onMounted(() => {
    if (commentInput.value) {
        commentInput.value.addEventListener("keydown", handleEnterKey);
    }
});

onUnmounted(() => {
    if (commentInput.value) {
        commentInput.value.removeEventListener("keydown", handleEnterKey);
    }
});
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
            <time :datetime="comment.timestamp" class="text-xs">{{ formatTime(comment.timestamp) }}</time>
            </div>
            <p class="text-xs">{{ comment.content }}</p>
            <div class="flex items-center justify-between gap-x-4">
            <div class="flex items-center gap-x-5">
                <button><Icon name="tabler:thumb-up" /></button>
                <button><Icon name="tabler:thumb-down" /></button>
                <button @click="handleReplyToggle"><Icon name="tabler:message-reply" /></button>
                <button @click="handleRemoveComment(comment.id)" :disabled="commentStatus === 'sending'"><Icon name="tabler:trash" /></button>
            </div>
            <button><Icon name="tabler:flag-2" /></button>
            </div>
            <div class="flex items-center gap-x-2" v-if="isVisibleReply">
                <input 
                    ref="commentInput"
                    v-model="commentMsg" 
                    type="text" 
                    :name="`comment_reply_box_${comment.id}`" 
                    :id="`commentReplyBox${comment.id}`" 
                    class="p-2 rounded-lg w-full border border-white/10 text-xs" 
                    placeholder="Add a reply"
                >
                <button
                    ref="commentBtn"
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