import auth from "@/js_part/api/tasksat/auth";
import tasks from "@/js_part/api/tasksat/tasks";
import statistics from "@/js_part/api/tasksat/statistics";

export default {
    auth: auth(),
    tasks: tasks(),
    statistics: statistics(),
}