import React, { useEffect, useRef, useState } from "react";
import {
  FlatList,
  Image,
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  FlatListProps,
  TextInput,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";

import { ItemWrapper } from "./ItemWrapper";
import { TasksItem } from "./TaskItem";

import trashIcon from "../assets/icons/trash/trash.png";
import checkIcon from "../assets/icons/check/check.png";
import editIcon from "../assets/icons/edit/edit.png";

export interface Task {
  id: number;
  title: string;
  done: boolean;
}

interface TasksListProps {
  tasks: Task[];
  toggleTaskDone: (id: number) => void;
  submitEdit: (task: Task) => void;
  removeTask: (id: number) => void;
}

export function TasksList({
  tasks,
  toggleTaskDone,
  removeTask,
  submitEdit,
}: TasksListProps) {
  const textInputRef = useRef<TextInput>(null);
  const [task, setTask] = useState<Task>();
  const [isEditing, setIsEditing] = useState<Number | null>(null);

  const handleEdit = (id: number) => {
    tasks.find((data) => {
      if (data.id === id) {
        setTask({
          id: data.id,
          title: data.title,
          done: data.done,
        });
        setIsEditing(id);
      }
    });
  };

  const handleChange = (t: Task, value: string) => {
    const data = {
      ...t,
      title: value,
    };

    setTask({
      ...data,
    });
  };

  const handleSubmitEdit = () => {
    const data: Task = {
      id: task?.id || 0,
      title: task?.title || "",
      done: task?.done || false,
    };

    submitEdit(data);
    setIsEditing(null);
  };

  useEffect(() => {
    if (textInputRef.current) {
      if (isEditing) {
        textInputRef.current.focus();
      } else {
        textInputRef.current.blur();
      }
    }
  }, [isEditing]);

  return (
    <FlatList
      data={tasks}
      keyExtractor={(item) => String(item.id)}
      contentContainerStyle={{ paddingBottom: 24 }}
      showsVerticalScrollIndicator={false}
      style={{
        marginTop: 32,
      }}
      renderItem={({ item, index }) => {
        return (
          <ItemWrapper index={index}>
            <View>
              <TouchableOpacity
                testID={`button-${index}`}
                activeOpacity={0.7}
                style={styles.taskButton}
                onPress={() =>
                  isEditing === item.id ? {} : toggleTaskDone(item.id)
                }
              >
                <View
                  testID={`marker-${index}`}
                  style={item.done ? styles.taskMarkerDone : styles.taskMarker}
                >
                  {item.done && <Icon name="check" size={12} color="#FFF" />}
                </View>

                {isEditing === item.id ? (
                  <TextInput
                    style={styles.textInput}
                    value={task?.title}
                    onChangeText={(value) => handleChange(item, value)}
                    ref={textInputRef}
                  />
                ) : (
                  <TasksItem task={item} />
                )}
              </TouchableOpacity>
            </View>

            {!item.done && (
              <View style={{ flexDirection: "row" }}>
                {isEditing === item.id ? (
                  <TouchableOpacity
                    testID={`edit-${index}`}
                    onPress={handleSubmitEdit}
                    style={{ paddingHorizontal: 24 }}
                  >
                    <Image source={checkIcon} />
                  </TouchableOpacity>
                ) : (
                  <>
                    <TouchableOpacity
                      testID={`edit-${index}`}
                      onPress={() => handleEdit(item.id)}
                    >
                      <Image style={styles.editIcon} source={editIcon} />
                    </TouchableOpacity>
                    <TouchableOpacity
                      testID={`trash-${index}`}
                      style={{ paddingHorizontal: 24 }}
                      onPress={() => removeTask(item.id)}
                    >
                      <Image source={trashIcon} />
                    </TouchableOpacity>
                  </>
                )}
              </View>
            )}
          </ItemWrapper>
        );
      }}
    />
  );
}

const styles = StyleSheet.create({
  taskButton: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 15,
    marginBottom: 4,
    borderRadius: 4,
    flexDirection: "row",
    alignItems: "center",
  },
  taskMarker: {
    height: 16,
    width: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#B2B2B2",
    marginRight: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  taskMarkerDone: {
    height: 16,
    width: 16,
    borderRadius: 4,
    backgroundColor: "#1DB863",
    marginRight: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  textInput: {
    paddingVertical: 0,
    color: "#666",
    fontFamily: "Inter-Medium",
  },
  editIcon: {
    marginTop: 2,
    width: 18,
    height: 18,
  },
});
