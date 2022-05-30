import React from "react";
import { Text, View, StyleSheet } from "react-native";

import { Task } from "./TasksList";

type TaskItemProps = {
  task: Task;
};

export function TasksItem({ task }: TaskItemProps) {
  return (
    <>
      <View style={{ paddingVertical: 4, paddingHorizontal: 2 }}>
        <Text style={task.done ? styles.taskTextDone : styles.taskText}>
          {task.title}
        </Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  taskText: {
    color: "#666",
    fontFamily: "Inter-Medium",
  },
  taskTextDone: {
    color: "#1DB863",
    textDecorationLine: "line-through",
    fontFamily: "Inter-Medium",
  },
});
