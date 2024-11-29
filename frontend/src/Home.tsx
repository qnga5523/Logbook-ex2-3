import React, { useEffect, useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  Text,
} from "react-native";
import TaskDetail from "./Detail";

interface Task {
  _id?: string;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: Date;
}

const Home: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const apiURL = "http://192.168.1.5:5000/api/tasks";

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetch(apiURL);
      if (!response.ok) {
        throw new Error(
          `Failed to fetch tasks. HTTP status: ${response.status}`
        );
      }
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      Alert.alert("Error", "Could not retrieve tasks. Please try again later.");
    }
  };

  const addTask = async () => {
    if (!title.trim()) {
      setErrorMessage("Task title cannot be empty");
      return;
    }
    const newTask = { title, description, completed: false };
    try {
      const response = await fetch(apiURL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTask),
      });
      if (!response.ok) {
        throw new Error(`Failed to add task. HTTP status: ${response.status}`);
      }
      const data = await response.json();
      setTasks([...tasks, data]);
      setTitle("");
      setDescription("");
      setErrorMessage(null);
    } catch (error) {
      console.error("Error adding task:", error);
      Alert.alert("Error", "Could not add the task. Please try again later.");
    }
  };

  const completeTask = async (id: string) => {
    const task = tasks.find((t) => t._id === id);
    if (!task) {
      Alert.alert("Error", "Task not found. Please refresh and try again.");
      return;
    }
    try {
      const response = await fetch(`${apiURL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...task, completed: !task.completed }),
      });
      if (!response.ok) {
        throw new Error(
          `Failed to update task. HTTP status: ${response.status}`
        );
      }
      const updatedTask = await response.json();
      setTasks(tasks.map((t) => (t._id === id ? updatedTask : t)));
    } catch (error) {
      console.error("Error updating task:", error);
      Alert.alert(
        "Error",
        "Could not update the task. Please try again later."
      );
    }
  };

  const editTask = async (
    id: string,
    newTitle: string,
    newDescription?: string
  ) => {
    if (!newTitle.trim()) {
      Alert.alert("Validation Error", "Task title cannot be empty.");
      return;
    }

    const task = tasks.find((t) => t._id === id);
    if (!task) {
      Alert.alert("Error", "Task not found. Please refresh and try again.");
      return;
    }

    try {
      const response = await fetch(`${apiURL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...task,
          title: newTitle,
          description: newDescription,
        }),
      });
      if (!response.ok) {
        throw new Error(`Failed to edit task. HTTP status: ${response.status}`);
      }
      const updatedTask = await response.json();
      setTasks(tasks.map((t) => (t._id === id ? updatedTask : t)));
    } catch (error) {
      console.error("Error editing task:", error);
      Alert.alert("Error", "Could not edit the task. Please try again later.");
    }
  };

  const deleteTask = async (id: string) => {
    Alert.alert(
      "Delete Task",
      "Do you really want to delete this task?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Confirm Delete",
          onPress: async () => {
            try {
              const response = await fetch(`${apiURL}/${id}`, {
                method: "DELETE",
              });
              if (!response.ok) {
                throw new Error(`${response.status}`);
              }
              setTasks(tasks.filter((t) => t._id !== id));
            } catch (error) {
              console.error(error);
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={styles.container}>
      <TextInput
        value={title}
        onChangeText={setTitle}
        style={styles.input}
        placeholder="Title"
      />
      <TextInput
        value={description}
        onChangeText={setDescription}
        style={styles.input}
        placeholder="Description"
      />
      {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}
      <TouchableOpacity style={styles.addButton} onPress={addTask}>
        <Text style={styles.buttonText}>Create Task</Text>
      </TouchableOpacity>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.taskContainer}>
          {tasks.map((task) => (
            <TaskDetail
              key={task._id}
              task={task}
              onComplete={() => completeTask(task._id!)}
              onDelete={() => deleteTask(task._id!)}
              onEdit={(newTitle, newDescription) =>
                editTask(task._id!, newTitle, newDescription)
              }
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#e3f2fd", // Light gray background
  },
  input: {
    borderWidth: 1,
    borderColor: "#212121",
    padding: 10,
    marginVertical: 8,
    borderRadius: 5,
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
  scrollContainer: {
    paddingBottom: 10,
  },
  taskContainer: {
    padding: 10,
  },
  addButton: {
    backgroundColor: "#00C853",
    paddingVertical: 8,
    borderRadius: 5,
    alignItems: "center",
    width: 100,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default Home;
