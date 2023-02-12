import Assignment from "/js/components/Assignment.js";
import AssignmentTags from "/js/components/AssignmentTags.js";

export default {
    components: {
        Assignment,
        AssignmentTags
    },
    template: `
        <section v-show="assignments.length" class="w-60">
        <div class="flex justify-between items-start">
            <h2 class="font-bold mb-2">{{title}} <span>({{assignments.length}})</span></h2>

            <button>&times;</button>

        </div>
            <assignment-tags :tags="assignments.map(a => a.tag)" v-model:selectedTag="selectedTag"/>

            <ul class="border border-gray-600 divide-y divide-gray-600 mt-5">
                <assignment v-for="assignment in filteredAssignments" :key="assignment.id" :assignment="assignment">
                
                </assignment>
            </ul>

            <slot></slot>
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
    }

}