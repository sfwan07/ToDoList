import { GroupViewModel, TaskViewModel } from "../model";
import {
  GROUP_ALL,
  GROUP_GET,
  GROUP_ADD,
  GROUP_REMOVE,
  GROUP_GET_BY_USER,
  GET_TASKS_BY_USER,
  GROUP_EDIT,
} from "./actionType";
import { TaskStatus } from "./model";

const initState: {
  all: GroupViewModel[];
  selectGroup?: GroupViewModel;
  MyTasks?: TaskViewModel[];
  MyGroups?: GroupViewModel[];
} = {
  all: [
    {
      id: 1,
      name: "Group1",
      users: [1, 2],
      tasks: [
        {
          id: 1,
          createAt: new Date(2020, 10, 5),
          duration: 5,
          status: TaskStatus.open,
          task: "Task 1",
        },
        {
          id: 2,
          createAt: new Date(2019, 8, 23),
          duration: 15,
          status: TaskStatus.progress,
          task: "Task 2",
        },
        {
          id: 3,
          createAt: new Date(2022, 5, 15),
          duration: 4,
          status: TaskStatus.done,
          task: "Task 3",
        },
        {
          id: 4,
          createAt: new Date(2022, 5, 4),
          duration: 1,
          status: TaskStatus.review,
          task: "Task 4",
        },
      ],
    },
    {
      id: 2,
      name: "Group2",
      users: [1, 2],
      tasks: [
        {
          id: 7,
          createAt: new Date(2022, 5, 15),
          duration: 4,
          status: TaskStatus.done,
          task: "Task 3",
        },
        {
          id: 8,
          createAt: new Date(2022, 5, 4),
          duration: 1,
          status: TaskStatus.review,
          task: "Task 4",
        },
      ],
    },
    {
      id: 3,
      name: "Group3",
      users: [2],
      tasks: [
        {
          id: 10,
          createAt: new Date(2019, 8, 23),
          duration: 15,
          status: TaskStatus.progress,
          task: "Task 2",
        },
        {
          id: 11,
          createAt: new Date(2022, 5, 15),
          duration: 4,
          status: TaskStatus.done,
          task: "Task 3",
        },
        {
          id: 12,
          createAt: new Date(2022, 5, 4),
          duration: 1,
          status: TaskStatus.review,
          task: "Task 4",
        },
      ],
    },
  ],
  MyTasks: undefined,
  selectGroup: undefined,
};

const reducer = (state = initState, action: any) => {
  switch (action.type) {
    case GROUP_GET:
      state.selectGroup = state.all.find(i => i.id == action.payload);
      return { ...state };

    case GROUP_ADD:
      var group = state.all;
      if (group.find(i => i.name == action.payload.userName)) {
        action.callBack(null, "Error");
      } else {
        group.push({
          ...action.payload,
          id: new Date(Date.now()).getMilliseconds(),
          status: false,
        });
        state.all = group;
        action.callBack("Done");
      }
      return { ...state };

    case GROUP_EDIT:
      var group = state.all;
      var index = group.findIndex(i => i.id == action.payload.id);
      if (
        group.find(
          i => i.id != action.payload.id && i.name == action.payload.name,
        )
      ) {
        action.callBack(null, "Error");
      } else {
        if (index >= 0) {
          group[index] = { ...action.payload };
          state.all = group;
          action.callBack("Done");
        } else action.callBack(null, "Error");
      }
      return { ...state };

    case GROUP_REMOVE:
      var group = state.all;
      var index = group.findIndex(i => i.id == action.payload);
      if (index >= 0) {
        delete group[index];
        state.all = group;
        action.callBack("Done");
      } else {
        action.callBack(undefined, "Error");
      }
      return { ...state };

    case GROUP_GET_BY_USER:
      state.MyGroups = state.all.filter(i => i.users.includes(action.payload));
      return { ...state };

    case GET_TASKS_BY_USER:
      let tasks: TaskViewModel[] = [];
      state.all.forEach(task => {
        if (task.users.includes(action.payload)) tasks = [...task.tasks];
      });
      state.MyTasks = tasks;
      action.callBack("Done");
      return { ...state };

    default:
      return state;
  }
};

export default reducer;
