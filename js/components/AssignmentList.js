import Assignment from "/js/components/Assignment.js"
export default {
    components: {
        Assignment,
    },
    template: `
        <section v-show="assignments.length">
            <h2 class="font-bold mb-2">{{title}} ({{assignments.length}})</h2>
            <button 
                @click="selectedTag = tag"
                v-for="tag in tags"
                class="px-2 mx-2 border"
                :class="{
                    'border-blue-500 text-blue-500': selectedTag === tag
                }"
            >{{tag}}</button>
            <ul class="border border-gray-600 divide-y divide-gray-600 mt-3">
                <assignment v-for="assignment in filteredAssignments" :key="assignment.id" :assignment="assignment">
                
                </assignment>
            </ul>
        </section>
    `,

    props: {
        assignments: Array,
        title: String
    },

    data() {
        return {
            selectedTag: 'all'
        }
    },

    computed: {
        filteredAssignments(){

            if(this.selectedTag === 'all'){
                return this.assignments;
            }

            return this.assignments.filter(a => a.tag === this.selectedTag);
        },
        tags() {
            return ['all', ...new Set(this.assignments.map((a) => a.tag))];
        }
    }

}