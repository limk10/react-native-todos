import React, { useState } from "react";
import { StyleSheet, View, Alert } from "react-native";

import { Header } from "../components/Header";
import { Task, TasksList } from "../components/TasksList";
import { TodoInput } from "../components/TodoInput";

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const handleAddTask = (newTaskTitle: string) => {
    //TODO - add new task
    const data = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false,
    };

    setTasks([...tasks, data]);
  };

  const handleSubmitEdit = (t: Task) => {
    //TODO - toggle task done if exists
    const newTask: Task[] = [];

    tasks.map((task) => {
      if (task.id === t.id) {
        newTask.push({
          ...task,
          title: t.title,
        });
      } else {
        newTask.push({ ...task });
      }
    });
    console.log("newTask", newTask);
    setTasks([...newTask]);
  };

  const handleToggleTaskDone = (id: number) => {
    //TODO - toggle task done if exists
    const newTask: Task[] = [];

    tasks.map((task) => {
      newTask.push({
        ...task,
        ...(task.id === id ? { done: !task.done } : { done: task.done }),
      });
    });

    setTasks([...newTask]);
  };

  function handleRemoveTask(id: number) {
    //TODO - remove task from state
    Alert.alert(
      "Você tem certeza?",
      "Tem certeza que deseja excluir essa tarefa?",
      [
        {
          text: "Cancelar",
        },
        {
          text: "Excluir",
          onPress: () => setTasks(tasks.filter((task) => task.id !== id)),
        },
      ]
    );
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        submitEdit={handleSubmitEdit}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EBEBEB",
  },
});
