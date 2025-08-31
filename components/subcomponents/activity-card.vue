<script setup lang="ts">
import type { CommentResponse } from '~/types/comments';
import { formatTime } from '~/utils/helpers';

const props = defineProps<{
    comment: CommentResponse
}>();
</script>

<template>
    <div class="activity-card flex flex-col sm:flex-row gap-y-4 sm:gap-y-0 sm:items-center justify-between gap-x-4 p-4 rounded-lg bg-background-400 text-sm">
        <div class="flex flex-col xxs:flex-row xxs:items-center gap-y-2 xxs:gap-y-0 gap-x-0 xxs:gap-x-2">
            <div class="w-8 h-8 rounded-full overflow-hidden flex-none">
                <img
                src="/media/images/users/default.png"
                :alt="comment.user.username"
                class="w-full h-full object-cover"
                />
            </div>
            <div class="flex flex-col gap-y-1">
                <p>You replied to on {{ comment.user.username }}'s comment</p>
                <!-- <NuxtLink
                    class="text-primary-500"
                >
                    See comment
                </NuxtLink> -->
            </div>
        </div>
        <div class="flex flex-col gap-y-2">
            <p>{{ comment.content }}</p>
            <time :datetime="comment.timestamp" class="text-end">{{ formatTime(comment.timestamp) }}</time>
        </div>
    </div>
</template>