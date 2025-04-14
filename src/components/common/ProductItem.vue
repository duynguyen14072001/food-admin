<script lang="ts" setup>
import { DeleteOutlined } from '@ant-design/icons-vue'

defineProps(['item', 'hasDelete'])
const emits = defineEmits(['onDelete'])
</script>

<template>
    <div class="container">
        <img class="image" :src="item.image_url" alt="" />
        <div class="info">
            <div class="text">
                <div class="name">{{ item.name }}</div>
                <div class="price">{{ item.price }}</div>
            </div>
            <DeleteOutlined
                v-if="hasDelete"
                style="font-size: 16px; color: #26b7bc"
                @click="emits('onDelete')"
            />
        </div>
    </div>
</template>

<style lang="scss" scoped>
.container {
    width: 180px;
    box-shadow: var(--vt-box-shadow);
    &:hover {
        box-shadow: var(--vt-box-shadow-active);
    }
    .image {
        height: 200px;
        width: 100%;
    }
    .info {
        width: 100%;
        display: flex;
        justify-content: space-between;
        padding: 10px;
        .text {
            .name {
                font-weight: bold;
                font-size: 12px;
            }

            .price {
                font-size: 10px;
            }
        }
        .anticon-delete {
            cursor: pointer;
        }
    }
}
</style>
