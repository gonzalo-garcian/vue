export default{
    template: `
        <button 
            @click="$emit('update:selectedTag', tag)"
            v-for="tag in allTags"
            class="px-2 mx-2 border"
            :class="{
                'border-blue-500 text-blue-500': selectedTag === tag
            }"
        >{{tag}}</button>
    `,

    props: {
        tags: Array,
        selectedTag: String
    },

    computed:{
        allTags() {
            return ['all', ...new Set(this.tags)];
        }
    }
}