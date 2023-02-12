import Assignment from "/js/components/Assignment.js";
import AssignmentTags from "/js/components/AssignmentTags.js";
import Panel from "./Panel.js";

export default {
    components: {
        Assignment,
        AssignmentTags,
        Panel
    },
    template: `
        <panel v-show="!closed && assignments.length" class="w-60">
        <div class="flex justify-between items-start">
            <h2 class="font-bold mb-2">{{title}} <span>({{assignments.length}})</span></h2>

            <button @click="closed = true" v-show="toggle">&times;</button>

        </div>
            <assignment-tags :tags="assignments.map(a => a.tag)" v-model:selectedTag="selectedTag"/>

            <ul class="border border-gray-600 divide-y divide-gray-600 mt-5">
                <assignment v-for="assignment in filteredAssignments" :key="assignment.id" :assignment="assignment">
                
                </assignment>
                <slot></slot>
            </ul> 
        </panel>
    `,

    props: {
        assignments: Array,
        title: String,
        toggle: {
            type: Boolean,
            default: false
        }
    },

    data() {
        return {
            selectedTag: 'all',
            closed: false
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