import Assignment from "/js/components/Assignment.js";
import AssignmentTags from "/js/components/AssignmentTags.js";

export default {
    components: {
        Assignment,
        AssignmentTags
    },
    template: `
        <section v-show="assignments.length">
            <h2 class="font-bold mb-2">{{title}} ({{assignments.length}})</h2>

            <assignment-tags :tags="assignments.map(a => a.tag)" v-model:selectedTag="selectedTag"/>

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
    }

}